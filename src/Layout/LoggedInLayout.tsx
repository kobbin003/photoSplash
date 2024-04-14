import { usePhotoStore } from "../store/store";
import NavBar from "../stories/navBar/NavBar";
import { Outlet } from "react-router-dom";
import "../App.css";
import { useEffect } from "react";
import { CurrentUserProfile } from "../utils/queryFunctions/unsplashData/type/CurrentUserProfile";
import { useQuery } from "@tanstack/react-query";
import { ErrorUnsplash } from "../utils/queryFunctions/unsplashData/getEditorialPhotos";
import getCurrentUserProfile from "../utils/queryFunctions/unsplashData/getCurentUserProfile";
import ModalContainer from "../Components/ModalContainer";

const LoggedInLayout = () => {
	const {
		setCurrentPhoto,
		showModal,
		setShowModal,
		accessToken,
		setCurrentUserProfile,
		setAllPhotos,
	} = usePhotoStore();

	// fetch current user profile
	const { data, error } = useQuery<CurrentUserProfile, ErrorUnsplash>(
		["currentUserProfile", accessToken],
		getCurrentUserProfile,
		{ enabled: false }
		// { enabled: accessToken ? true : false }
	);

	// clean up stored data(PhotoStore) on login
	useEffect(() => {
		setCurrentPhoto(null);
		setShowModal(false);
		setAllPhotos(null); // prevents doubling of state
	}, []);

	// set current user profile
	useEffect(() => {
		if (data) {
			setCurrentUserProfile(data);
		}
	}, [data, error]);

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
			<NavBar mode="loggedIn" />
			<Outlet />
		</div>
	);
};
export default LoggedInLayout;
