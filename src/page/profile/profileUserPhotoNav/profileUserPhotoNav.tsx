import { Link, useLocation, useParams } from "react-router-dom";
import "./style.css";
import { MouseEvent, useEffect, useState } from "react";
const ProfileUserPhotoNav = () => {
	const { userId } = useParams();

	const { state } = useLocation();

	const [currentAnchor, setCurrentAnchor] = useState(state.show);

	const handleSetBorderBottom = (e: MouseEvent<HTMLAnchorElement>) => {
		const clickedEl = e.currentTarget as HTMLElement;
		setCurrentAnchor(clickedEl.innerText);
	};

	useEffect(() => {
		setCurrentAnchor(state.show);
	}, [state.show]);

	return (
		<div id="ProfileUserPhotoNav">
			<Link
				to={userId ? `/${userId}/profile` : "/me/profile"}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Photos" ? "current" : "transparentBorderbottom"
				}
				// style={{ borderBottom: "3px solid black" }}
			>
				<img
					src="/src/assets/photo3.svg"
					alt=""
				/>
				<span>Photos</span>
			</Link>
			<Link
				to={userId ? `/${userId}/profile/likes` : "/me/profile/likes"}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Likes" ? "current" : "transparentBorderbottom"
				}
			>
				<img
					src="/src/assets/like.svg"
					alt=""
				/>
				<span>Likes</span>
			</Link>
			<Link
				to={
					userId ? `/${userId}/profile/collections` : "/me/profile/collections"
				}
				onClick={handleSetBorderBottom}
				className={
					currentAnchor == "Collections" ? "current" : "transparentBorderbottom"
				}
			>
				<img
					src="/src/assets/photocollection3.svg"
					alt=""
				/>
				<span>Collections</span>
			</Link>
			{!userId && (
				<Link
					to={"/me/profile/stats"}
					onClick={handleSetBorderBottom}
					className={
						currentAnchor == "Stats" ? "current" : "transparentBorderbottom"
					}
				>
					<img
						src="/src/assets/photocollection3.svg"
						alt=""
					/>
					<span>Stats</span>
				</Link>
			)}
		</div>
	);
};

export default ProfileUserPhotoNav;
