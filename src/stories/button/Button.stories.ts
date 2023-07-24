import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
	title: "Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		// backgroundColor: { control: "color" },
		label: {
			control: "text",
			description: "label of the button",
			type: "string",
		},
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const onlyLabel: Story = {
	args: {
		mode: "only-label",
		label: "onlylabel",
		// height: 50,
		// width: 100,
	},
};

export const iconsWithLabel: Story = {
	args: {
		mode: "icons-with-label",
		label: "icons-with-label",
		imgUrl: "/src/stories/assets/heart.svg",
		// height: 100,
		// width: 100,
	},
};

export const onlyIcons: Story = {
	args: {
		mode: "only-icons",
		imgUrl: "/src/stories/assets/add.svg",
		// height: 100,
		// width: 100,
	},
};
