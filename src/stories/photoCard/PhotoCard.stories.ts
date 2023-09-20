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

export const photoCardStandAlone: Story = {
	args: {
		imgUrlRegular: "/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg",
		imgUrlSmall: "/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg",
		imgUrlXSmall: "/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg",
	},
};
export const photoCardGridItem: Story = {
	args: {
		imgUrlRegular: "/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg",
		imgUrlSmall: "/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg",
		imgUrlXSmall: "/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg",
		// height: "auto-fit",
		// width: "auto-fit",
		// height: "200px",
		// width: "250px",
	},
};
