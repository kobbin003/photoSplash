import { FC } from "react";
import { Link } from "react-router-dom";
import "./dropDownMenu.css";
import { usePhotoStore } from "../../../../store/store";
interface DropDownMenu {
	showDropDownMenu: boolean;
}
const DropDownMenu: FC<DropDownMenu> = ({ showDropDownMenu }) => {
	const { currentUserProfile } = usePhotoStore();
	return (
		<div
			id="dropDownMenu"
			style={{
				opacity: `${showDropDownMenu ? "100%" : "0%"}`,
				transform: `${showDropDownMenu ? "scale(1.0)" : "scale(0.4)"}`,
				zIndex: `${showDropDownMenu ? "1" : "0"}`,
			}}
		>
			<ul>
				<li>
					<Link
						to={`/me/profile/${currentUserProfile?.username}`}
						state={{ show: "Photos" }}
					>
						View Profile
					</Link>
				</li>
				<li>
					<Link
						to={`/me/profile/${currentUserProfile?.username}/stats`}
						state={{ show: "Stats" }}
					>
						Stats
					</Link>
				</li>
			</ul>
			<ul>
				<li>
					<Link to={"/"}>Logout {currentUserProfile?.username}</Link>
				</li>
			</ul>
		</div>
	);
};

export default DropDownMenu;
