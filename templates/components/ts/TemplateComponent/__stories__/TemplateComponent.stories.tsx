import type { Meta, StoryObj } from "@storybook/react";

import TemplateComponent from "../";

const meta = {
  title: "Components/TemplateComponent",
  component: TemplateComponent,
} satisfies Meta<typeof TemplateComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
  argTypes: {},
};
