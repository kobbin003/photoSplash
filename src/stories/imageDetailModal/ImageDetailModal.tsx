import { FC } from "react";
import "./ImageDetailModal.css";
import { usePhotoStore } from "../../store/store";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import Header from "./components/header/Header";
import PhotoDisplay from "./components/photoDisplay/PhotoDisplay";
import PhotoStats from "./components/photoStats/PhotoStats";
interface ImageDetailModalArgs {}

const ImageDetailModal: FC<ImageDetailModalArgs> = () => {
	const currentPhoto = usePhotoStore().currentPhoto as EditorialPhotosType;
	if (!currentPhoto) {
		console.log("some error");
		return;
	}

	return (
		<>
			{currentPhoto && (
				<div id="modalContent">
					<Header currentPhoto={currentPhoto} />
					<PhotoDisplay photoUrls={currentPhoto.urls} />
					<PhotoStats photoId={currentPhoto.id} />
				</div>
			)}
		</>
	);
};

export default ImageDetailModal;
