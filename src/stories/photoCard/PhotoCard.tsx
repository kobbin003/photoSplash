import { usePhotoStore } from "../../store/store";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import { Button } from "../button/Button";
import "./photoCard.css";
interface PhotoCardProps<T> {
	imgUrl: string;
	height?: "tall" | "medium" | "normal" | "short";
	photoData: T;
}

export const PhotoCard = <T extends EditorialPhotosType>({
	imgUrl,
	height,
	photoData,
	...props
}: PhotoCardProps<T>) => {
	const { setCurrentPhoto } = usePhotoStore();

	const handleOnClick = () => {
		window.dispatchEvent(new Event("showModal"));
		console.log("item clicked", photoData);
		setCurrentPhoto(photoData);
	};
	return (
		<div
			className={`photoContainer photoContainer__${height}`}
			{...props}
			onClick={handleOnClick}
			style={{ cursor: "zoom-in" }}
		>
			<img src={imgUrl} />
			<div className="onHoverDisplay">
				<div className="onHoverDisplay-top">
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
				</div>
				<div className="onHoverDisplay-bottom">
					<div className="userInfo">
						<a href="">
							<img
								src="/src/stories/assets/header/defaultAvatar.svg"
								height={50}
								width={50}
							/>
						</a>
						<a href="">Username</a>
					</div>
					<Button
						height={35}
						mode="only-icons"
						imgUrl="/src/stories/assets/PhotoCard/downloadArrow.svg"
					/>
				</div>
			</div>
		</div>
	);
};
