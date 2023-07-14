import { Button } from "../button/Button";
import "./photoCard.css";
interface PhotoCardProps {
	imgUrl: string;
	height: number;
	width: number;
}

export const PhotoCard = ({
	imgUrl,
	height,
	width,
	...props
}: PhotoCardProps) => {
	return (
		<div
			className="photoContainer"
			style={{ height: `${height}px`, width: `${width}px` }}
			{...props}
		>
			<img
				src={imgUrl}
				height={height}
				width={width}
			/>
			<div
				className="onHoverDisplay"
				style={{ height: `${height}px`, width: `${width}px` }}
			>
				<div className="onHoverDisplay-top">
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/heart.svg"
					/>
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/heart.svg"
					/>
				</div>
				<div className="onHoverDisplay-bottom">
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/heart.svg"
					/>
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/heart.svg"
					/>
				</div>
			</div>
		</div>
	);
};
