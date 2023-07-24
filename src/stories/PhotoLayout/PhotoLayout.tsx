import { PhotoCard } from "../photoCard/PhotoCard";
import "./photoLayout.css";
interface PhotoLayout {
	items: {}[];
	height: string;
	width: string;
}
// const PhotoLayout = () => {
const PhotoLayout = ({ items, height, width }: PhotoLayout) => {
	return (
		<div
			className="photoLayoutGridContainer"
			style={{ height: `${height}`, width: `${width}` }}
			// className="grid"
		>
			{/* <li className="grid__item">
				<img
					className="grid__image"
					src="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
					alt=""
				/>
			</li>
			<li className="grid__item grid__item--big">
				<img
					className="grid__image"
					src="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
					alt=""
				/>
			</li>
			<li className="grid__item grid__item--tall">
				<img
					className="grid__image"
					src="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
					alt=""
				/>
			</li>
			<li className="grid__item grid__item--wide">
				<img
					className="grid__image"
					src="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
					alt=""
				/>
			</li> */}
			<PhotoCard
				imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
				height="short"
			/>
			<PhotoCard
				imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
				height="tall"
			/>
			<PhotoCard
				imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
				// height="200px"
				height="medium"
			/>
			<PhotoCard
				imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
				// height="200px"
				height="normal"
			/>
			<PhotoCard
				imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
				height="short"
			/>
			<PhotoCard
				imgUrl="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
				height="medium"
			/>
		</div>
	);
};

export default PhotoLayout;
