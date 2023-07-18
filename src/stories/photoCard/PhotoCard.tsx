import { Button } from "../button/Button";
import "./photoCard.css";
interface PhotoCardProps {
	imgUrl: string;
	height: string;
	width: string;
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
			style={{
				height: `${height}`,
				width: `${width}`,
			}}
			{...props}
		>
			<img
				src={imgUrl}
				height={height}
				width={width}
			/>
			<div
				className="onHoverDisplay"
				style={
					{
						// height: `${height}`,
						// width: `${width}`,
					}
				}
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
