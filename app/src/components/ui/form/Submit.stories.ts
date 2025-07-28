import { fn } from "storybook/test";

import Submit from "./submit";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Submit,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: { children: { control: "text" } },
  args: { children: "Submit", loading: false, onClick: fn() },
} satisfies Meta<typeof Submit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};
