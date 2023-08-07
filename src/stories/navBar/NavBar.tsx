import React, { ReactNode, useState } from "react";
import { Button } from "../button/Button";
import "./navBar.css";
import SearchBar from "./SearchBar";
import { authorise } from "../../utils/authorise";
import ProfileButton from "./ProfileButton";
// import { useNavigate } from "react-router-dom";
interface NavbarProps {
	mode: "loggedIn" | "loggedOut";
	children?: ReactNode;
}
const NavBar = ({ mode, children }: NavbarProps) => {
	// const navigate = useNavigate();
	// const handleLogMode = () =>
	// 	setLogMode((prev) => (prev == "loggedIn" ? "loggedOut" : "loggedIn"));

	const handleClickAuthorise = () => {
		const url = authorise();
		// console.log(url);
		window.location.href = url;
	};
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
				{mode == "loggedOut" ? (
					<Button
						mode="only-label"
						label="Login"
						handleClick={handleClickAuthorise}
					/>
				) : (
					<ProfileButton />
				)}
			</div>
		</div>
	);
};

export default NavBar;
