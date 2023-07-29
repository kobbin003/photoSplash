import React, { ReactNode, useState } from "react";
import { Button } from "../button/Button";
import "./navBar.css";
import SearchBar from "./SearchBar";
interface NavbarProps {
	mode: "loggedIn" | "loggedOut";
	children?: ReactNode;
}
const NavBar = ({ mode, children }: NavbarProps) => {
	const [logMode, setLogMode] = useState(mode);
	const handleLogMode = () =>
		setLogMode((prev) => (prev == "loggedIn" ? "loggedOut" : "loggedIn"));
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
				{logMode == "loggedIn" ? (
					<Button
						mode="only-label"
						label="Login"
						handleClick={handleLogMode}
					/>
				) : (
					<button id="profile__button">
						<img
							src="/src/stories/assets/header/defaultAvatar.svg"
							onClick={handleLogMode}
						/>
					</button>
				)}
			</div>
		</div>
	);
};

export default NavBar;
