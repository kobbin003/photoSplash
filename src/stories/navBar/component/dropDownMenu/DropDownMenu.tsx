import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./dropDownMenu.css";
interface DropDownMenu {
	showDropDownMenu: boolean;
}
const DropDownMenu: FC<DropDownMenu> = ({ showDropDownMenu }) => {
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
					<Link to={"/me/profile"}>View Profile</Link>
				</li>
				<li>
					<Link to={"/me/stats"}>Stats</Link>
				</li>
			</ul>
			<ul>
				<li>
					<Link to={"/"}>Logout "username"</Link>
				</li>
			</ul>
		</div>
	);
};

export default DropDownMenu;
