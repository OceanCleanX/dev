import { fn } from "storybook/test";

import Input from "./input";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: { label: { control: "text" } },
  args: { label: "Field", className: "w-64", onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: { errorMsg: "This field is required" },
};

export const WithSubText: Story = {
  args: { subText: "Some extra information" },
};

export const WithPlaceholder: Story = {
  args: { placeholder: "Enter text here" },
};

export const WithAll: Story = {
  args: {
    errorMsg: "This field is required",
    subText: "Some extra information",
    placeholder: "Enter text here",
  },
};
