import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface StackedSectionProps {
  id: string
  active: boolean
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  dataStackedSection?: boolean
}

/**
 * StackedSection: A wrapper for full-screen sections in a stacked layout.
 *
 * WHY pointer-events control is necessary:
 * - Multiple sections are mounted simultaneously with CSS transforms.
 * - Transformed elements still capture pointer events for their full hit area.
 * - This blocks clicks on lower sections even when upper sections are visually transparent.
 *
 * SOLUTION:
 * - Only the ACTIVE section has pointer-events: auto (can receive clicks).
 * - All INACTIVE sections have pointer-events: none (ignore all pointer events).
 * - This is enforced at the section wrapper level, not on child elements.
 * - Ensures only one section can be interactive at any time.
 */
export const StackedSection = React.forwardRef<HTMLDivElement, StackedSectionProps>(
  ({ id, active, children, className = '', style = {}, dataStackedSection = true }, ref) => {
    return (
      <motion.div
        ref={ref}
        id={id}
        data-stacked-section={dataStackedSection}
        data-active={active ? 'true' : 'false'}
        className={`relative ${className}`}
        style={{
          ...style,
          /* CRITICAL: Control pointer-events ONLY based on active state.
             Active section receives all pointer events.
             Inactive sections ignore all pointer events (cannot be clicked or hovered). */
          pointerEvents: active ? 'auto' : 'none',
        }}
      >
        {children}
      </motion.div>
    )
  }
)

StackedSection.displayName = 'StackedSection'
