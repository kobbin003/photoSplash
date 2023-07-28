import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "./NavBar";

const meta = {
	title: "NavBar",
	component: NavBar,
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
} satisfies Meta<typeof NavBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NavBarLoggedIn: Story = {
	args: { mode: "loggedIn" },
};
