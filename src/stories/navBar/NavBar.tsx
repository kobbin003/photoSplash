import React from "react";
import { Button } from "../button/Button";
import "./navBar.css";
import SearchBar from "./SearchBar";
interface NavbarProps {
	mode: "loggedIn" | "loggedOut";
}
const NavBar = ({ mode }: NavbarProps) => {
	return (
		<div className="navbar__container">
			<div id="logo__container">
				<img
					src="/src/stories/assets/header/logo/logo_black.svg"
					height={30}
					width={30}
				/>
			</div>
			<SearchBar />
			<div id="login__container">
				<Button
					mode="only-label"
					label="Login"
				/>
			</div>
		</div>
	);
};

export default NavBar;
