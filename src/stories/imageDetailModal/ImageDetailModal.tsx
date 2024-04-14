import { ForwardRefRenderFunction, forwardRef } from "react";
import "./ImageDetailModal.css";
import { usePhotoStore } from "../../store/store";
import Header from "./components/header/Header";
import PhotoDisplay from "./components/photoDisplay/PhotoDisplay";
import PhotoStats from "./components/photoStats/PhotoStats";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
interface ImageDetailModalArgs {}

const ImageDetailModal: ForwardRefRenderFunction<
	HTMLDivElement,
	ImageDetailModalArgs
> = (_, ref) => {
	const { currentPhoto } = usePhotoStore();

	if (!currentPhoto) {
		console.log("some error");
		return <div>Loading..</div>;
	}
	const photo = currentPhoto as EditorialPhotosType;

	return (
		<>
			<div id="modalContent" ref={ref}>
				<Header currentPhoto={photo} />
				<PhotoDisplay photoUrls={photo.urls} />
				<PhotoStats photoId={photo.id} />
			</div>
		</>
	);
};

export default forwardRef(ImageDetailModal);

/** ********************* Another approach *************** */
// const ImageDetailModal = forwardRef<HTMLDivElement, ImageDetailModalArgs>(
// 	(props, ref) => {
// 		const { currentPhoto } = usePhotoStore();
// 		if (!currentPhoto) {
// 			console.log("some error");
// 			return <div>Loading..</div>;
// 		}

// 		// console.log("ZOOM--context", context);
// 		return (
// 			<>
// 				<div
// 					id="modalContent"
// 					ref={ref}
// 					// style={{ maxHeight: zoom ? "100vh" : "none" }}
// 				>
// 					<Header currentPhoto={currentPhoto} />
// 					<PhotoDisplay photoUrls={currentPhoto.urls} />
// 					<PhotoStats photoId={currentPhoto.id} />
// 				</div>
// 			</>
// 		);
// 	}
// );
// export default ImageDetailModal;
