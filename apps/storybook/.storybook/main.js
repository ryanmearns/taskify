/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y", "@storybook/addon-interactions", "@storybook/addon-links", "@storybook/addon-onboarding", "@storybook/addon-storysource"],
  framework: {
    name: '@storybook/nextjs',
    options: {
    },
  },
  core: {
    disableWhatsNewNotifications: true
  },
};
export default config;
