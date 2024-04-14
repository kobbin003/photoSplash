import NavBar from "../stories/navBar/NavBar";
import "../App.css";
import { usePhotoStore } from "../store/store";
import { useEffect } from "react";
import ModalContainer from "../Components/ModalContainer";
import { Outlet } from "react-router-dom";

const LoggedOutLayout = () => {
	const { setAllPhotos, setCurrentPhoto, setShowModal, showModal } =
		usePhotoStore();

	// clean up stored data(PhotoStore) on app launch
	useEffect(() => {
		setAllPhotos(null);
		setCurrentPhoto(null);
		setShowModal(false);
	}, []);

	// show modal
	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [showModal]);

	return (
		<div className="appContainer">
			{showModal && <ModalContainer />}
			<NavBar mode="loggedOut" />
			<Outlet />
		</div>
	);
};
export default LoggedOutLayout;
