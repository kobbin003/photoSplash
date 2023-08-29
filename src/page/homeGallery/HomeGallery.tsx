import { Suspense, lazy } from "react";
import PhotoGallery from "../../Components/PhotoGallery";
// import PhotoGalleryInfinite from "../../Components/PhotoGallery/indexInfinite";
const ModalContainer = lazy(() => import("../../Components/ModalContainer"));

const HomeGallery = () => {
	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<ModalContainer />
			</Suspense>
			{/* <PhotoGalleryInfinite /> */}
			<PhotoGallery />
		</>
	);
};

export default HomeGallery;
