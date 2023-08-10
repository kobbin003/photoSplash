import { Meta, StoryObj } from "@storybook/react";
import FilterBar from "./FilterBar";
import { topics } from "./topicsList";
const meta = {
	title: "FilterBar",
	component: FilterBar,
	argTypes: {
		topics: {
			name: "kob",
		},
	},
} satisfies Meta<typeof FilterBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FilterBarr: Story = {
	args: {
		topics,
	},
};
