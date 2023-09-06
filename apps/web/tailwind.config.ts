import type { Config } from "tailwindcss";
import { twConfig } from "@playbook/tailwind-config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  ...twConfig.theme,
};
export default config;
