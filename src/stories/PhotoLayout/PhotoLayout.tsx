import React from "react";
import { PhotoCard } from "../photoCard/PhotoCard";
import "./photoLayout.css";
interface PhotoLayout {
	items: {}[];
	height: string;
	width: string;
}
const PhotoLayout = ({ items, height, width }: PhotoLayout) => {
	return (
		<div
			className="photoContainer"
			style={{ height: `${height}`, width: `${width}` }}
		>
			{items.map((item) => (
				<PhotoCard
					imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
					height="400px"
					width="250px"
				/>
			))}
			{items.map((item) => (
				<PhotoCard
					imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
					height="300px"
					width="auto"
				/>
			))}
		</div>
	);
};

export default PhotoLayout;
