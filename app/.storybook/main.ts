import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../src/components",
      files: "*.stories.@(ts|tsx)",
    },
    {
      directory: "../src/app",
      files: "*.stories.@(ts|tsx)",
    },
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-styling-webpack"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
};
export default config;
