import type { Meta, StoryObj } from "@storybook/react";

import { TailwindButton } from "./TailwindButton";

const meta = {
	title: "TailwindButton",
	component: TailwindButton,
	tags: ["autodocs"],
	argTypes: {
		// backgroundColor: { control: "color" },
	},
	parameters: {
		backgrounds: {
			values: [
				{ name: "blackk", value: "#000" },
				{ name: "green", value: "green" },
				{ name: "white", value: "#fff" },
			],
		},
	},
} satisfies Meta<typeof TailwindButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const onlyLabel: Story = {};
