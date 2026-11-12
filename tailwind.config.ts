import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        abia: { DEFAULT: "#0b6b3a", dark: "#084d2a", soft: "#e8f5ee", ink: "#0f1419", muted: "#5c6b63", line: "#d8e5dd" },
      },
    },
  },
  plugins: [],
};
export default config;
