import { Link, useLocation } from "react-router-dom";
import "./style.css";
import { FC, MouseEvent, useEffect, useState } from "react";
import { capitalizeString } from "../../../utils/capitalizeString";

type Props = {
	loggedIn: boolean;
	searchQuery: string;
};

const SearchNav: FC<Props> = ({ loggedIn, searchQuery }) => {
	const { pathname } = useLocation();

	const pathSplitted = pathname.split("/");
	const pathSlug = pathSplitted[pathSplitted.length - 1];
	const pathSlugCapitalized = capitalizeString(pathSlug);

	const [currentAnchor, setCurrentAnchor] = useState<string>();

	const handleSetBorderBottom = (e: MouseEvent<HTMLAnchorElement>) => {
		const clickedEl = e.currentTarget as HTMLElement;
		const firstSpan = clickedEl.querySelector("span");
		firstSpan?.innerText && setCurrentAnchor(firstSpan?.innerText);
	};

	useEffect(() => {
		setCurrentAnchor(pathSlugCapitalized);
	}, []);

	return (
		<div id="SearchNav">
			<Link
				to={
					!loggedIn
						? `/search/${searchQuery}/photos`
						: `/me/search/${searchQuery}/photos`
				}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Photos" ? "current" : "transparentBorderbottom"
				}
			>
				<div>
					<img
						src="/src/assets/photo3.svg"
						alt=""
					/>
				</div>
				<span>Photos</span>
			</Link>
			<Link
				to={
					!loggedIn
						? `/search/${searchQuery}/collections`
						: `/me/search/${searchQuery}/collections`
				}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Collections" ? "current" : "transparentBorderbottom"
				}
			>
				<div>
					<img
						src="/src/assets/like.svg"
						alt=""
					/>
				</div>
				<span>Collections</span>
			</Link>
			<Link
				to={
					!loggedIn
						? `/search/${searchQuery}/users`
						: `/me/search/${searchQuery}/users`
				}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Users" ? "current" : "transparentBorderbottom"
				}
			>
				<div>
					<img
						src="/src/assets/photocollection3.svg"
						alt=""
					/>
				</div>
				<span>Users</span>
			</Link>
		</div>
	);
};

export default SearchNav;
