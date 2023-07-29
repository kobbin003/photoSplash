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
						imgUrl="/src/stories/assets/PhotoCard/heart.svg"
					/>
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/PhotoCard/add.svg"
					/>
				</div>
				<div className="onHoverDisplay-bottom">
					<div className="userInfo">
						<a href="">
							<img
								src="/src/stories/assets/header/defaultAvatar.svg"
								height={50}
								width={50}
							/>
						</a>
						<a href="">Username</a>
					</div>
					<Button
						mode="only-icons"
						imgUrl="/src/stories/assets/PhotoCard/downloadArrow.svg"
					/>
				</div>
			</div>
		</div>
	);
};
