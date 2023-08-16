import {
	EditorialPhotosType,
	Urls,
} from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { PhotoCard } from "../photoCard/PhotoCard";
import "./photoLayout.css";

interface PhotoLayout {
	items: EditorialPhotosType[];
	height: string;
	width: string;
}
const PhotoLayout = ({ items, height, width }: PhotoLayout) => {
	return (
		<div
			className="photoLayoutGridContainer"
			style={{
				height: `${height}`,
				width: `${width}`,
			}}
		>
			{items.map((item, index) => {
				type Height = "tall" | "medium" | "normal" | "short";
				const heightArr: Height[] = ["tall", "medium", "normal", "short"];
				const randomIndex = Math.floor(Math.random() * 4);
				const randomHeight: Height = heightArr[randomIndex];
				return (
					<PhotoCard
						imgUrl={`${item.urls.regular}`}
						height={randomHeight}
						key={item.id + index}
						photoData={item}
					/>
				);
			})}
		</div>
	);
};

export default PhotoLayout;
