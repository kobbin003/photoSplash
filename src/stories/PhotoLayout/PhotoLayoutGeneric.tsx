import { Urls } from "../../utils/queryFunctions/getEditorialPhotos";
import { PhotoCard } from "../photoCard/PhotoCard";
import "./photoLayout.css";
interface Extended {
	urls: Urls;
}
interface PhotoLayout<T extends Extended> {
	items: T[];
	height: string;
	width: string;
}
const PhotoLayoutGeneric = <T extends Extended>({
	items,
	height,
	width,
}: PhotoLayout<T>) => {
	return (
		<div
			className="photoLayoutGridContainer"
			style={{ height: `${height}`, width: `${width}` }}
		>
			{items.map((item) => {
				type Height = "tall" | "medium" | "normal" | "short";
				const heightArr: Height[] = ["tall", "medium", "normal", "short"];
				const randomIndex = Math.floor(Math.random() * 4);
				const randomHeight: Height = heightArr[randomIndex];
				return (
					<PhotoCard
						imgUrl={`${item.urls.regular}`}
						height={randomHeight}
					/>
				);
			})}
		</div>
	);
};

export default PhotoLayoutGeneric;
