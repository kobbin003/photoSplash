import type { Meta, StoryObj } from "@storybook/react";

import { PhotoCard } from "./PhotoCard";

const meta = {
	title: "PhotoCard",
	component: PhotoCard,
	tags: ["autodocs"],
	argTypes: {
		// backgroundColor: { control: "color" },
	},
	parameters: {
		backgrounds: {
			values: [{ name: "white", value: "#fff" }],
		},
	},
} satisfies Meta<typeof PhotoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const photoCard: Story = {
	args: {
		imgUrl: "/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg",
		height: 400,
		width: 250,
	},
};
