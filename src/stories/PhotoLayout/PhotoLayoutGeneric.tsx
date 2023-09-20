import { useLocation } from "react-router-dom";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import { PhotoCard } from "../photoCard/PhotoCard";
import "./photoLayout.css";
import { UserLikeedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserLikedPhotos";
import { UserUploadedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";

interface PhotoLayout<T> {
	items: T[];
	height: string;
	width: string;
}
const PhotoLayoutGeneric = <
	T extends EditorialPhotosType | UserLikeedPhoto | UserUploadedPhoto
>({
	items,
	height,
	width,
}: PhotoLayout<T>) => {
	const { pathname } = useLocation();
	const isInProfileRoute = pathname.includes("profile");
	return (
		<div
			className="photoLayoutGridContainer"
			style={{
				height: `${height}`,
				width: `${width}`,
				top: isInProfileRoute ? "50px" : "110px",
			}}
		>
			{items.map((item, index) => {
				type Height = "tall" | "medium" | "normal" | "short";
				const heightArr: Height[] = ["tall", "medium", "normal", "short"];
				const randomIndex = Math.floor(Math.random() * 4);
				const randomHeight: Height = heightArr[randomIndex];
				return (
					<PhotoCard<T>
						imgUrlXSmall={`${item.urls.thumb}`}
						imgUrlSmall={`${item.urls.small}`}
						imgUrlRegular={`${item.urls.regular}`}
						height={randomHeight}
						key={item.id + index}
						photoData={item}
					/>
				);
			})}
		</div>
	);
};

export default PhotoLayoutGeneric;
