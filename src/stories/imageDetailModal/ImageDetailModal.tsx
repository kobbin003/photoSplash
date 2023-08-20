import { FC } from "react";
import "./ImageDetailModal.css";
import { Button } from "../button/Button";
import { usePhotoStore } from "../../store/store";
import PhotoStatsOne from "./PhotoStatsOne";
import PhotoStatsTwo from "./PhotoStatsTwo";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
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
					<div id="header">
						<div className="userInfo">
							<a href="">
								<img
									src={currentPhoto.user.profile_image.small}
									height={50}
									width={50}
								/>
							</a>
							<a href="">{currentPhoto.user.username}</a>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Button
								height={35}
								mode="only-icons"
								imgUrl="/src/stories/assets/PhotoCard/heart.svg"
							/>
							<Button
								height={35}
								mode="only-icons"
								imgUrl="/src/stories/assets/PhotoCard/add.svg"
							/>
							<Button
								mode="only-label"
								label="Download"
								height={35}
							/>
							<Button
								height={35}
								mode="only-icons"
								imgUrl="/src/stories/assets/modal/downArrow.svg"
							/>
						</div>
					</div>
					<div id="photo">
						<img
							src={currentPhoto.urls.regular}
							alt=""
						/>
					</div>
					<div id="photoStats">
						<PhotoStatsOne id={currentPhoto.id} />
						<PhotoStatsTwo id={currentPhoto.id} />
					</div>
				</div>
			)}
		</>
	);
};

export default ImageDetailModal;
