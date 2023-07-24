import { Button } from "../button/Button";
import "./photoCard.css";
interface PhotoCardProps {
	imgUrl: string;
	height?: "tall" | "medium" | "normal" | "short";
}

export const PhotoCard = ({ imgUrl, height, ...props }: PhotoCardProps) => {
	return (
		<div
			className={`photoContainer photoContainer__${height}`}
			{...props}
		>
			<img src={imgUrl} />
			<div className="onHoverDisplay">
				<div className="onHoverDisplay-top">
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/heart.svg"
					/>
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/add.svg"
					/>
				</div>
				<div className="onHoverDisplay-bottom">
					<div className="userInfo">
						<a href="">
							<img src="/public/vite.svg" />
						</a>
						<a href="">Username</a>
					</div>
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/downloadArrow.svg"
					/>
				</div>
			</div>
		</div>
	);
};
