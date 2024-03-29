const plugin = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  enabled: true,
  theme: {
    extend: {
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
        purple: {
          5: "#F5F3FF",
          10: "#EDE9FE",
          20: "#DDD6FE",
          30: "#C4B5FD",
          40: "#A78BFA",
          50: "#8B5CF6",
          60: "#7C3AED",
          70: "#6D28D9",
          80: "#5B21B6",
          90: "#4C1D95",
        },
        indigo: {
          5: "#EEF2FF",
          10: "#E0E7FF",
          20: "#C7D2FE",
          30: "#A5B4FC",
          40: "#818CF8",
          50: "#6366F1",
          60: "#4F46E5",
          70: "#4338CA",
          80: "#3730A3",
          90: "#312E81",
        },
        fuschia: {
          5: "#FDF4FF",
          10: "#FAE8FF",
          20: "#F5D0FE",
          30: "#F0ABFC",
          40: "#E879F9",
          50: "#D946EF",
          60: "#C026D3",
          70: "#A21CAF",
          80: "#86198F",
          90: "#701A75",
        },
        rose: {
          5: "#FFF1F2",
          10: "#FFE4E6",
          20: "#FECDD3",
          30: "#FDA4AF",
          40: "#FB7185",
          50: "#F43F5E",
          60: "#E11D48",
          70: "#BE123C",
          80: "#9F1239",
          90: "#881337",
        },
        teal: {
          5: "#F0FDFA",
          10: "#CCFBF1",
          20: "#99F6E4",
          30: "#5EEAD4",
          40: "#2DD4BF",
          50: "#14B8A6",
          60: "#0D9488",
          70: "#0F766E",
          80: "#115E59",
          90: "#134E4A",
        },
        cyan: {
          5: "#ECFEFF",
          10: "#CFFAFE",
          20: "#BAE6FD",
          30: "#67E8F9",
          40: "#22D3EE",
          50: "#06B6D4",
          60: "#0891B2",
          70: "#0E7490",
          80: "#155E75",
          90: "#164E63",
        },
        yellow: {
          5: "#FEFCE8",
          10: "#FEF9C3",
          20: "#FEF08A",
          30: "#FDE047",
          40: "#FACC15",
          50: "#EAB308",
          60: "#CA8A04",
          70: "#A16207",
          80: "#854D0E",
          90: "#713F12",
        },
        emerald: {
          5: "#ECFDF5",
          10: "#CCFBF1",
          20: "#A7F3D0",
          30: "#6EE7B7",
          40: "#34D399",
          50: "#10B981",
          60: "#059669",
          70: "#047857",
          80: "#065F46",
          90: "#064E3B",
        },
        blue: {
          5: "#EFF6FF",
          10: "#DBEAFE",
          20: "#BFDBFE",
          30: "#93C5FD",
          40: "#60A5FA",
          50: "#3B82F6",
          60: "#2563EB",
          70: "#1D4ED8",
          80: "#1E40AF",
          90: "#1E3A8A",
        },
      },
      boxShadow: {
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.01)",
        cta: "0px 0px 0px 4px rgba(124, 58, 237, 0.1)",
        dropdown: "0px 2px 16px rgba(0, 0, 0, 0.08);",
        input: "0px 0px 0px 4px #8B5CF61A",
        searchModal: "0px 2px 64px 16px rgba(17, 24, 39, 0.08)",
        toaster: "0px 2px 16px rgba(17, 24, 39, 0.08)",
      },
      outline: {
        blue: "2px solid rgba(0, 112, 244, 0.5)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        mono: ["Roboto Mono", "Menlo", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "3xl": ["1.88rem", { lineHeight: "1.33", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "2xs": "0.25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        base: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
        "3xl": "3rem",
        "4xl": "3.5rem",
        "5xl": "4rem",
        "6xl": "6rem",
        ...defaultTheme.spacing,
      },
      lineHeight: {
        xs: "1rem",
        sm: "1.25rem",
        base: "1.5rem",
        lg: "2.25rem",
        xl: "3rem",
        "2xl": "4rem",
        "3xl": "4.5rem",
        "4xl": "6rem",
        ...defaultTheme.lineHeight,
      },

      screens: {
        xs: "480px",
        sm: "769px",
        md: "1025px",
        lg: "1464px",
        ...defaultTheme.screens,
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        circle: "9999px",
        ...defaultTheme.borderRadius,
      },
      borderWidth: {
        3: "3px",
      },
      minWidth: {
        36: "9rem",
        44: "11rem",
        56: "14rem",
        60: "15rem",
        72: "18rem",
        80: "20rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        60: "60",
        90: "90",
        999: "999",
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
      },
      lineClamp: {
        "[var(--lines)]": "var(--lines)",
      },
    },
  },
  variants: {
    extend: {
      fill: ["hover", "focus"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("tailwindcss-radix")(),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        )
      })
    }),
  ],
}
