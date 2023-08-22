import { Link } from "react-router-dom";
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
						<Link to={""}>
							<img
								src={
									photoData.user.profile_image.medium ||
									"/src/stories/assets/header/defaultAvatar.svg"
								}
							/>
						</Link>
						<Link to="">{photoData.user.name}</Link>
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
