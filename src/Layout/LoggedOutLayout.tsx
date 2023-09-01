import NavBar from "../stories/navBar/NavBar";
import HomeGallery from "../page/homeGallery/HomeGallery";
import "../App.css";
import { usePhotoStore } from "../store/store";
import { useEffect } from "react";
const LoggedOutLayout = () => {
	const { setAllPhotos, setCurrentPhoto, setShowModal } = usePhotoStore();
	useEffect(() => {
		// clean up stored data(PhotoStore) on app launch
		setAllPhotos(null);
		setCurrentPhoto(null);
		setShowModal(false);
	}, []);

	return (
		<div className="appContainer">
			<NavBar mode="loggedOut" />
			<HomeGallery />
		</div>
	);
};
export default LoggedOutLayout;
