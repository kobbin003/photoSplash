import type { Meta, StoryObj } from "@storybook/react";
import NavBar from "./NavBar";
import { Button } from "../button/Button";
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

export const NavBarLoggedOut: Story = {
	args: {
		mode: "loggedOut",
		children: (
			<button id="profile__button">
				<img src="/src/stories/assets/header/defaultAvatar.svg" />
			</button>
		),
	},
};
export const NavBarLoggedIn: Story = {
	args: {
		mode: "loggedIn",
		children: (
			<Button
				mode="only-label"
				label="Login"
			/>
		),
	},
	// render:(args)=>(<>)
};
