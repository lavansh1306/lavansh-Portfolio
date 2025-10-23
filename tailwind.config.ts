import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'cyber': ['Orbitron', 'monospace'],
				'matrix': ['JetBrains Mono', 'monospace'],
			},
			colors: {
				// Core System
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// Semantic Colors
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				
				// Futuristic Palette
				void: {
					DEFAULT: 'hsl(var(--void))',
					light: 'hsl(var(--void-light))',
					medium: 'hsl(var(--void-medium))',
					dark: 'hsl(var(--void-dark))',
				},
				neon: {
					cyan: 'hsl(var(--neon-cyan))',
					purple: 'hsl(var(--neon-purple))',
					green: 'hsl(var(--neon-green))',
					red: 'hsl(var(--neon-red))',
					gold: 'hsl(var(--neon-gold))',
				},
				holo: {
					blue: 'hsl(var(--holo-blue))',
					pink: 'hsl(var(--holo-pink))',
					white: 'hsl(var(--holo-white))',
				},
			},
			backgroundImage: {
				'gradient-neon': 'var(--gradient-neon)',
				'gradient-void': 'var(--gradient-void)',
				'gradient-hologram': 'var(--gradient-hologram)',
				'gradient-energy': 'var(--gradient-energy)',
			},
			boxShadow: {
				'glow-cyan': 'var(--glow-cyan)',
				'glow-purple': 'var(--glow-purple)',
				'glow-green': 'var(--glow-green)',
				'glow-intense': 'var(--glow-intense)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				// Existing animations
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				
				// Cinematic animations
				'glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' }
				},
				'neon-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 5px hsl(var(--neon-cyan)), 0 0 10px hsl(var(--neon-cyan)), 0 0 15px hsl(var(--neon-cyan))' 
					},
					'50%': { 
						textShadow: '0 0 2px hsl(var(--neon-cyan)), 0 0 5px hsl(var(--neon-cyan)), 0 0 8px hsl(var(--neon-cyan))' 
					}
				},
				'typing': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100vh)' },
					'100%': { transform: 'translateY(100vh)' }
				},
				'hologram': {
					'0%, 100%': { opacity: '0.8' },
					'50%': { opacity: '1' }
				},
				'scan-line': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100vw)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 0.3s linear infinite',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'typing': 'typing 2s steps(40, end)',
				'blink': 'blink 1s step-end infinite',
				'float': 'float 3s ease-in-out infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'hologram': 'hologram 2s ease-in-out infinite',
				'scan-line': 'scan-line 2s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
