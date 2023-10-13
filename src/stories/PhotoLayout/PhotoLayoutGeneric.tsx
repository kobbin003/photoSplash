import { useLocation } from "react-router-dom";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import { PhotoCard } from "../photoCard/PhotoCard";
import "./photoLayout.css";
import { UserLikeedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserLikedPhotos";
import { UserUploadedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";
import { ForwardedRef, forwardRef } from "react";
import { CollectionPhoto } from "../../utils/queryFunctions/unsplashData/type/CollectionPhotos";
import { SearchPhoto } from "../../utils/queryFunctions/unsplashData/type/SearchPhotos";

declare module "react" {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
	): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

interface PhotoLayout<T> {
	items: T[];
	height: string;
	width: string;
}

const PhotoLayoutGeneric = <
	T extends
		| EditorialPhotosType
		| UserLikeedPhoto
		| UserUploadedPhoto
		| CollectionPhoto
		| SearchPhoto
>(
	{ items, height, width }: PhotoLayout<T>,
	ref: ForwardedRef<HTMLDivElement>
) => {
	const { pathname } = useLocation();
	const isInProfileRoute = pathname.includes("profile");
	return (
		<div
			className="photoLayoutGridContainer"
			style={{
				height: `${height}`,
				width: `${width}`,
				// top: "10px",
				top: isInProfileRoute ? "50px" : "110px",
			}}
			ref={ref}
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
						imgUrlFull={`${item.urls.full}`}
						height={randomHeight}
						key={item.id + index}
						photoData={item}
						photoId={item.id}
					/>
				);
			})}
		</div>
	);
};
export default forwardRef(PhotoLayoutGeneric);

// const PhotoLayoutGeneric = <
// 	T extends EditorialPhotosType | UserLikeedPhoto | UserUploadedPhoto
// >({
// 	items,
// 	height,
// 	width,
// }: PhotoLayout<T>) => {
// 	const { pathname } = useLocation();
// 	const isInProfileRoute = pathname.includes("profile");
// 	return (
// 		<div
// 			className="photoLayoutGridContainer"
// 			style={{
// 				height: `${height}`,
// 				width: `${width}`,
// 				top: isInProfileRoute ? "50px" : "110px",
// 			}}
// 			// ref={ref}
// 		>
// 			{items.map((item, index) => {
// 				type Height = "tall" | "medium" | "normal" | "short";
// 				const heightArr: Height[] = ["tall", "medium", "normal", "short"];
// 				const randomIndex = Math.floor(Math.random() * 4);
// 				const randomHeight: Height = heightArr[randomIndex];
// 				return (
// 					<PhotoCard<T>
// 						imgUrlXSmall={`${item.urls.thumb}`}
// 						imgUrlSmall={`${item.urls.small}`}
// 						imgUrlRegular={`${item.urls.regular}`}
// 						height={randomHeight}
// 						key={item.id + index}
// 						photoData={item}
// 					/>
// 				);
// 			})}
// 		</div>
// 	);
// };

// export default PhotoLayoutGeneric;
// export default forwardRef(PhotoLayoutGeneric);
