import type { Meta, StoryObj } from "@storybook/react";

import PhotoLayout from "./PhotoLayout";

const meta = {
	title: "PhotoLayout",
	component: PhotoLayout,
	tags: ["autodocs"],
	argTypes: {},
	parameters: {
		backgrounds: {
			values: [
				{ name: "blackk", value: "#000" },
				{ name: "white", value: "#fff" },
			],
		},
	},
} satisfies Meta<typeof PhotoLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const photoLayout: Story = {
	args: { items: [{}, {}, {}], height: "fit-content", width: "100vw" },
};
