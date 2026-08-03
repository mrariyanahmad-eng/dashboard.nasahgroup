import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nasah: {
          red: "#E4231D",
          "red-dark": "#C11B17",
          black: "#0A0A0A",
          ink: "#111111",
          gray: "#6B7280",
          border: "#E5E7EB",
          surface: "#F8F8F8",
        },
        success: "#22C55E",
        error: "#EF4444",
      },
      borderRadius: { card: "16px", control: "10px" },
    },
  },
  plugins: [],
};
export default config;
