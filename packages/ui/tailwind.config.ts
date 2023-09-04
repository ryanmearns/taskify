const sharedConfig = require("@playbook/tailwind-config");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./**/*.{js,ts,jsx,tsx,mdx}"],
  ...sharedConfig,
};
export default config;
