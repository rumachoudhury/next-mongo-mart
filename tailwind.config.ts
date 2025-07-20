import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '["dark"]'],
  plugins: [require("daisyui")],
};

export default config;

// daisyUI custom theme configuration
export const daisyui = {
  themes: [
    {
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: "#fbbf24",
        ".toaster-con": {
          "background-color": "white",
          color: "black",
        },
      },
      dark: {
        ...require("daisyui/src/theming/themes")["dark"],
        primary: "#fbbf24",
        ".toaster-con": {
          "background-color": "black",
          color: "white",
        },
      },
    },
  ],
};
