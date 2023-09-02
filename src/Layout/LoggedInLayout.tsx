import { usePhotoStore } from "../store/store";
import NavBar from "../stories/navBar/NavBar";
import { Outlet } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
const LoggedInLayout = () => {
	const { setCurrentPhoto, setShowModal } = usePhotoStore();
	useEffect(() => {
		// clean up stored data(PhotoStore) on login
		setCurrentPhoto(null);
		setShowModal(false);
	}, []);
	return (
		<div className="appContainer">
			<NavBar mode="loggedIn" />
			<Outlet />
		</div>
	);
};
export default LoggedInLayout;
