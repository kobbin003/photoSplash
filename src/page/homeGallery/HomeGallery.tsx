import PhotoGallery from "../../Components/PhotoGallery";
import { usePhotoStore } from "../../store/store";
import ModalContainer from "../../Components/ModalContainer";
import { useEffect } from "react";
// import PhotoGalleryInfinite from "../../Components/PhotoGallery/indexInfinite";

const HomeGallery = () => {
	const { showModal } = usePhotoStore();
	useEffect(() => {
		if (showModal) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "scroll";
		}
	}, [showModal]);
	return (
		<>
			{showModal && <ModalContainer />}
			{/* <PhotoGalleryInfinite /> */}
			<PhotoGallery />
		</>
	);
};

export default HomeGallery;
