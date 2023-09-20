import { Link, useLocation } from "react-router-dom";
import { usePhotoStore } from "../../store/store";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import { Button } from "../button/Button";
import "./photoCard.css";
import { MouseEvent } from "react";
import { UserUploadedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";
import { UserLikeedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserLikedPhotos";

interface PhotoCardProps<T> {
	imgUrlXSmall: string;
	imgUrlSmall: string;
	imgUrlRegular: string;
	height?: "tall" | "medium" | "normal" | "short";
	photoData: T;
}

export const PhotoCard = <
	T extends EditorialPhotosType | UserLikeedPhoto | UserUploadedPhoto
>({
	imgUrlXSmall,
	imgUrlSmall,
	imgUrlRegular,
	height,
	photoData,
	...props
}: PhotoCardProps<T>) => {
	const { setCurrentPhoto, setShowModal } = usePhotoStore();

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
