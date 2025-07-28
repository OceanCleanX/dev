import Page from "./page";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Page,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
