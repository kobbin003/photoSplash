import { Meta, StoryObj } from "@storybook/react";
import ImageDetailModal from "./ImageDetailModal";
const meta = {
	title: "ImageDetailModal",
	component: ImageDetailModal,
	argTypes: {
		topics: {
			name: "kob",
		},
	},
} satisfies Meta<typeof ImageDetailModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ImageDetailModalView: Story = {
	args: {},
};
