import React, { ReactNode, useState } from "react";
import { Button } from "../button/Button";
import "./navBar.css";
import { authorise } from "../../utils/authorise";
import ProfileButton from "./component/profileButton/ProfileButton";
import FilterBar from "../filterBar/FilterBar";
import { topics } from "../filterBar/topicsList";
import SearchBar from "./component/searchBar/SearchBar";
import { Link } from "react-router-dom";
interface NavbarProps {
	mode: "loggedIn" | "loggedOut";
	children?: ReactNode;
}
const NavBar = ({ mode, children }: NavbarProps) => {
	const handleClickAuthorise = () => {
		const url = authorise();
		// console.log(url);
		window.location.href = url;
	};
	return (
		<div id="container">
			<div className="navbar__container">
				<Link
					to={"/me"}
					id="logo__container"
				>
					<img
						src="/src/stories/assets/header/logo/logo_black.svg"
						height={30}
						width={30}
					/>
				</Link>
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
			<FilterBar topics={topics} />
		</div>
	);
};

export default NavBar;
