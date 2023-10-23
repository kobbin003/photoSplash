import { Link, useLocation, useParams } from "react-router-dom";
import "./style.css";
import { FC, MouseEvent, useEffect, useState } from "react";
import { capitalizeString } from "../../../utils/capitalizeString";
import { usePhotoStore } from "../../../store/store";

type Props = {
	photosCount: number;
	likesCount: number;
	collectionsCount: number;
	loggedIn: boolean;
};

const ProfileUserPhotoNav: FC<Props> = ({
	photosCount,
	likesCount,
	collectionsCount,
	loggedIn,
}) => {
	const { userName } = useParams();
	const { currentUserProfile } = usePhotoStore();
	const showStats = userName == currentUserProfile?.username;
	const { state, pathname } = useLocation();

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
		if (state) {
			// console.log("state", state);
			setCurrentAnchor(state.show);
		} else if (
			["Likes", "Collections", "Stats"].includes(pathSlugCapitalized)
		) {
			setCurrentAnchor(pathSlugCapitalized);
			// console.log("slug", pathSlugCapitalized);
		} else {
			// console.log("slug", "Photos");
			setCurrentAnchor("Photos");
		}
	}, [state]);

	return (
		<div id="ProfileUserPhotoNav">
			<Link
				to={!loggedIn ? `/profile/${userName}` : `/me/profile/${userName}`}
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
				<span>{photosCount || 0}</span>
			</Link>
			<Link
				to={
					!loggedIn
						? `/profile/${userName}/likes`
						: `/me/profile/${userName}/likes`
				}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Likes" ? "current" : "transparentBorderbottom"
				}
			>
				<div>
					<img
						src="/src/assets/like.svg"
						alt=""
					/>
				</div>
				<span>Likes</span>
				<span>{likesCount || 0}</span>
			</Link>
			<Link
				to={
					!loggedIn
						? `/profile/${userName}/collections`
						: `/me/profile/${userName}/collections`
				}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Collections" ? "current" : "transparentBorderbottom"
				}
			>
				<div>
					<img
						src="/src/assets/photocollection3.svg"
						alt=""
					/>
				</div>
				<span>Collections</span>
				<span>{collectionsCount || 0}</span>
			</Link>
			{showStats && (
				<Link
					to={"/me/profile/stats"}
					onClick={handleSetBorderBottom}
					className={
						currentAnchor == "Stats" ? "current" : "transparentBorderbottom"
					}
				>
					<div>
						<img
							src="/src/assets/photocollection3.svg"
							alt=""
						/>
					</div>
					<span>Stats</span>
				</Link>
			)}
		</div>
	);
};

export default ProfileUserPhotoNav;
