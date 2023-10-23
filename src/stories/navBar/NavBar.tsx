import { ReactNode } from "react";
import { Button } from "../button/Button";
import "./navBar.css";
import { authorise } from "../../utils/authorise";
import ProfileButton from "./component/profileButton/ProfileButton";
import FilterBar from "../filterBar/FilterBar";
import { topics } from "../filterBar/topicsList";
import SearchBar from "./component/searchBar/SearchBar";
import { Link, useLocation } from "react-router-dom";
interface NavbarProps {
	mode: "loggedIn" | "loggedOut";
	children?: ReactNode;
}
const NavBar = ({ mode }: NavbarProps) => {
	const { pathname } = useLocation();
	const isAtProfileRoute = pathname.includes("profile");
	const isAtSearchRoute = pathname.includes("search");
	const handleClickAuthorise = () => {
		const url = authorise();
		window.location.href = url;
	};

	return (
		<div id="container">
			<div className="navbar__container">
				<Link
					to={mode == "loggedOut" ? "/" : "/me"}
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
			{!isAtProfileRoute && !isAtSearchRoute && <FilterBar topics={topics} />}
		</div>
	);
};

export default NavBar;
