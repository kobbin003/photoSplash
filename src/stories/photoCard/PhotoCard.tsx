import { Link, useLocation } from "react-router-dom";
import { usePhotoStore } from "../../store/store";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import "./photoCard.css";
import { MouseEvent } from "react";
import { UserUploadedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";
import { UserLikeedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserLikedPhotos";
import { CollectionPhoto } from "../../utils/queryFunctions/unsplashData/type/CollectionPhotos";
import HeartButton from "./HeartButton/HeartButton";
import AddButton from "./AddButton/AddButton";
import DownloadButton from "./downloadButton/DownloadButton";
import { SearchPhoto } from "../../utils/queryFunctions/unsplashData/type/SearchPhotos";

interface PhotoCardProps<T> {
	imgUrlXSmall: string;
	imgUrlSmall: string;
	imgUrlRegular: string;
	imgUrlFull?: string;
	height?: "tall" | "medium" | "normal" | "short";
	photoData: T;
	photoId: string;
}

export const PhotoCard = <
	T extends
		| EditorialPhotosType
		| UserLikeedPhoto
		| UserUploadedPhoto
		| CollectionPhoto
		| SearchPhoto
>({
	imgUrlXSmall,
	imgUrlSmall,
	imgUrlRegular,
	imgUrlFull,
	height,
	photoData,
	photoId,
	...props
}: PhotoCardProps<T>) => {
	const { setCurrentPhoto, setShowModal } = usePhotoStore();
	console.log(photoData);
	const { pathname } = useLocation();

	const profileLink = pathname.includes("me")
		? `/me/profile/${photoData.user.username}`
		: `/profile/${photoData.user.username}`;

	const handleOnClick = () => {
		console.log("modal show");
		setShowModal(true);
		setCurrentPhoto(photoData);
	};

	const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
	};

	return (
		<div
			className={`photoContainer photoContainer__${height}`}
			{...props}
			onClick={handleOnClick}
			style={{ cursor: "zoom-in" }}
		>
			<img
				src={imgUrlRegular}
				loading="lazy"
				srcSet={`${imgUrlSmall} 400w, ${imgUrlRegular} 1080w`}
			/>
			<div
				id="blurred_image"
				style={{
					background: `url(${imgUrlXSmall}) center/cover no-repeat`,
				}}
			></div>
			<div className="onHoverDisplay">
				<div className="onHoverDisplay-top">
					<HeartButton
						id={photoId}
						likedByUser={photoData.liked_by_user}
					/>
					<AddButton
						id={photoId}
						photoUrl={imgUrlFull ? imgUrlFull : ""}
					/>
				</div>
				<div className="onHoverDisplay-bottom">
					<div className="userInfo">
						<Link
							to={profileLink}
							onClick={handleClickLink}
						>
							<img
								src={
									photoData.user.profile_image.medium ||
									"/src/stories/assets/header/defaultAvatar.svg"
								}
							/>
						</Link>
						<Link
							to={profileLink}
							onClick={handleClickLink}
						>
							{photoData.user.name}
						</Link>
					</div>
					<DownloadButton id={photoId} />
				</div>
			</div>
		</div>
	);
};
