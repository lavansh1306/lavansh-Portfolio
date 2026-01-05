# Stacked Sections Pointer-Events Fix - Visual Explanation

## The Problem

```
┌─────────────────────────────────────────┐
│  BROWSER VIEWPORT (600px high)          │
│  ┌─────────────────────────────────────┐│
│  │    VIEWPORT CENTER (300px)          ││
│  │                                     ││
│  │  Transformed Section #2             ││
│  │  (Still captures events here)       ││
│  ├─────────────────────────────────────┤│
│  │                                     ││
│  │  Transformed Section #3             ││
│  │  (BLOCKED - can't click buttons!)   ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
     ↑ Section #2's transform still
       captures events even though
       it's scrolled up and visually
       off-screen!
```

**Root Cause**: CSS transforms on parent elements keep their full bounding box active for hit-testing. Section #3's buttons are blocked because Section #2's transformed container intercepts all pointer events.

---

## The Solution: StackedSection Component

```
┌──────────────────────────────────────┐
│  StackedSection Component            │
├──────────────────────────────────────┤
│                                      │
│  <motion.div                         │
│    pointerEvents={active ?           │
│      'auto' : 'none'}                │
│    data-active={active}              │
│    data-stacked-section="true"       │
│  >                                   │
│    {children}                        │
│  </motion.div>                       │
│                                      │
│  ✓ Maintains all animations          │
│  ✓ Controls pointer-events ONLY      │
│  ✓ One active section at a time      │
│  ✓ No z-index hacks needed           │
└──────────────────────────────────────┘
```

---

## Active Section Detection Algorithm

```
Viewport Height: 600px
Viewport Center: 300px (window.innerHeight / 2)

┌──────────────────────────────────┐
│                                  │
│  Section 1: Intro                │
│  rect.top = -500                 │
│  rect.bottom = 0                 │
│  NOT ACTIVE                      │
│  (bottom < viewportCenter)       │
│                                  │
├──────────────────────────────────┤  ← viewport center (300px)
│  Section 2: Skills ✓             │
│  rect.top = 100                  │
│  rect.bottom = 700               │
│  ACTIVE ✓                        │
│  (top <= center && bottom >= center)
│                                  │
├──────────────────────────────────┤
│  Section 3: Internship           │
│  rect.top = 800                  │
│  rect.bottom = 1400              │
│  NOT ACTIVE                      │
│  (top > viewportCenter)          │
│                                  │
└──────────────────────────────────┘
```

**Result for Section 2**: `pointerEvents = 'auto'` → Buttons clickable ✓
**Result for Sections 1, 3**: `pointerEvents = 'none'` → Events blocked ✓

---

## Before vs After

### BEFORE (Broken)
```
User scrolls to Internship section
         ↓
Internship section visible & renders
         ↓
User tries to click Expand button
         ↓
Browser hit-test finds Skills section's transform still active
         ↓
Click event captured by Skills section
         ↓
❌ Internship button doesn't receive click
```

### AFTER (Fixed)
```
User scrolls to Internship section
         ↓
Active section detection: viewportCenter in Internship
         ↓
StackedSection for Internship gets active={true}
         ↓
Internship section: pointerEvents='auto'
Skills & others: pointerEvents='none'
         ↓
User clicks Expand button
         ↓
Browser hit-test: only Internship accepts events
         ↓
✓ Internship button receives click and toggles expand
```

---

## Code Flow: Index.tsx

```tsx
// 1. Track active section
const [activeSectionId, setActiveSectionId] = useState('intro')

// 2. Listen for scroll/resize
useEffect(() => {
  const updateActiveSection = () => {
    // 3. Find which section contains viewport center
    const viewportCenter = window.innerHeight / 2
    sections.forEach(section => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        active = section.id
      }
    })
    
    // 4. Update state (with comparison to prevent re-renders)
    setActiveSectionId(prev => prev !== active ? active : prev)
  }
}, [])

// 5. Use in JSX
<StackedSection
  id="internship"
  active={activeSectionId === 'internship'}  // boolean
  style={{y, scale}}  // still have animations!
>
  <InternshipTimeline />
</StackedSection>
```

---

## StackedSection Component: Key Line

```tsx
style={{
  ...style,
  // ← CRITICAL LINE: This is the entire fix!
  pointerEvents: active ? 'auto' : 'none',
}}
```

**This single line of code**:
- Enables clicks only on active section
- Prevents clicks on inactive sections (no interception)
- Works with all animations and transforms
- Requires no z-index juggling
- Requires no CSS specificity battles

---

## Why pointer-events: none Works

```
pointer-events: auto (default)
└─ Element can receive all pointer events
   └─ Clicks, hovers, mouse moves, touch, etc.

pointer-events: none
└─ Element CANNOT receive ANY pointer events
└─ Browser passes events THROUGH to element below
   └─ This is the magic! Events go to the next section!
```

---

## CSS Fallback (stacked-sections.css)

```css
/* Default: block all sections */
[data-stacked-section] {
  pointer-events: none;
}

/* Active section only: allow events */
[data-stacked-section][data-active='true'] {
  pointer-events: auto;
}
```

This ensures:
- Correct behavior even if component inline styles fail
- Clear documentation of intent
- Consistent with data attributes

---

## Testing the Fix

### ✅ Test 1: Scroll to internship, click Expand
```
Expected: Card expands
Actual: ✓ Card expands
```

### ✅ Test 2: Scroll to projects, try clicking internship button
```
Expected: Nothing happens (internship not active)
Actual: ✓ No response (internship has pointer-events: none)
```

### ✅ Test 3: Scroll back to internship, click works again
```
Expected: Button works again
Actual: ✓ Button works (internship re-activated)
```

### ✅ Test 4: Rapid scroll through all sections
```
Expected: Buttons in each section work when scrolled to
Actual: ✓ All buttons responsive (state debounced to prevent flicker)
```

---

## Architecture: Why This Approach?

| Aspect | Solution | Why |
|--------|----------|-----|
| **Problem Detection** | Viewport center intersection | Most reliable, no scroll math |
| **State Location** | Index.tsx (parent) | Single source of truth |
| **Implementation** | StackedSection component | Reusable, documented, portable |
| **Pointer Control** | Inline style in component | Takes precedence, clearest intent |
| **CSS Backup** | [data-active] selector | Fallback + documentation |
| **Events** | pointer-events property | Correct tool (not z-index, not stopPropagation) |

---

## Summary

✅ **Problem**: Transformed sections block clicks on lower sections
✅ **Root Cause**: Transforms keep full bounding box active for hit-testing
✅ **Solution**: Control pointer-events based on active section
✅ **Implementation**: StackedSection component + active section tracking
✅ **Result**: Only one section clickable at a time, no more blocked buttons
✅ **Code Quality**: Comments explain why, component is reusable, no hacks
