import { Outlet } from "react-router-dom";
import "./style.css";
import NavBar from "../../stories/navBar/NavBar";
import ProfileUserInfo from "./profileUserInfo/ProfileUserInfo";
import ProfileUserPhotoNav from "./profileUserPhotoNav/profileUserPhotoNav";
const Profile = () => {
	return (
		<div id="profileContainer">
			<NavBar mode="loggedIn" />
			<ProfileUserInfo />
			<ProfileUserPhotoNav />
			<Outlet />
		</div>
	);
};

export default Profile;
