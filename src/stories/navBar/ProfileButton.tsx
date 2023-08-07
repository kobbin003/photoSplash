import { useEffect, useState } from "react";
import "./navBar.css";

const ProfileButton = () => {
	const [showDropDownMenu, setShowDropDownMenu] = useState(false);
	const handleClickDropDownMenu = () => {
		setShowDropDownMenu((prev) => !prev);
	};
	useEffect(() => {
		const handleFindClickedElement = (e: any) => {
			const el = e.target;
			if (el.id !== "profile__image") {
				// console.log("clicked id", el.id);
				setShowDropDownMenu(false);
			}
		};
		window.addEventListener("click", handleFindClickedElement);
		return () => window.removeEventListener("click", handleFindClickedElement);
	}, []);

	return (
		<div id="profile__button-container">
			<button id="profile__button">
				<img
					id="profile__image"
					src="/src/stories/assets/header/defaultAvatar.svg"
					onClick={handleClickDropDownMenu}
				/>
			</button>
			<div
				id="dropDownMenu"
				style={{
					opacity: `${showDropDownMenu ? "100%" : "0%"}`,
					transform: `${showDropDownMenu ? "scale(1.0)" : "scale(0.4)"}`,
				}}
			>
				<ul>
					<li>
						<button>View Profile</button>
					</li>
					<li>
						<button>Stats</button>
					</li>
				</ul>
				<ul>
					<li>
						<button>Logout "username"</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProfileButton;
