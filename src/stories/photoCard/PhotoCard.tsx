import { Button } from "../button/Button";
import "./photoCard.css";
interface PhotoCardProps {
	imgUrl: string;
	height?: "tall" | "medium" | "normal" | "short";
}

export const PhotoCard = ({ imgUrl, height, ...props }: PhotoCardProps) => {
	const handleOnClick = () => {
		window.dispatchEvent(new Event("showModal"));
	};
	return (
		<div
			className={`photoContainer photoContainer__${height}`}
			{...props}
			onClick={handleOnClick}
			style={{ cursor: "zoom-in" }}
		>
			<img src={imgUrl} />
			<div className="onHoverDisplay">
				<div className="onHoverDisplay-top">
					<Button
						height={35}
						mode="only-icons"
						imgUrl="/src/stories/assets/PhotoCard/heart.svg"
					/>
					<Button
						height={35}
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
						height={35}
						mode="only-icons"
						imgUrl="/src/stories/assets/PhotoCard/downloadArrow.svg"
					/>
				</div>
			</div>
		</div>
	);
};
