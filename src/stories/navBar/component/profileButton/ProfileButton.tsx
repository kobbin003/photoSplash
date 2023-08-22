import { useEffect, useState } from "react";
import "./profileButton.css";
import DropDownMenu from "../dropDownMenu/DropDownMenu";

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
			<DropDownMenu showDropDownMenu={showDropDownMenu} />
		</div>
	);
};

export default ProfileButton;
