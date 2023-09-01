import { usePhotoStore } from "../store/store";
import NavBar from "../stories/navBar/NavBar";
import { Outlet } from "react-router-dom";
import "../App.css";
const LoggedInLayout = () => {
	const photoState = usePhotoStore();
	// console.log(photoState.currentPhoto?.updated_at);
	return (
		<div className="appContainer">
			<NavBar mode="loggedIn" />
			<Outlet />
		</div>
	);
};
export default LoggedInLayout;
