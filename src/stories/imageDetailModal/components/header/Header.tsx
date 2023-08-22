import { FC } from "react";
import { Button } from "../../../button/Button";
import { Link } from "react-router-dom";
import "./style.css";
import { EditorialPhotosType } from "../../../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
interface HeaderProps {
	currentPhoto: EditorialPhotosType;
}
const Header: FC<HeaderProps> = ({ currentPhoto }) => {
	return (
		<div id="header">
			<div id="userInfo">
				<Link to="">
					<img
						src={currentPhoto.user.profile_image.large}
						height={50}
						width={50}
					/>
				</Link>
				<div>
					<Link to={""}>{currentPhoto.user.name}</Link>
					<Link to={""}>{currentPhoto.user.username}</Link>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
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
				<Button
					mode="only-label"
					label="Download"
					height={35}
				/>
				<Button
					height={35}
					mode="only-icons"
					imgUrl="/src/stories/assets/modal/downArrow.svg"
				/>
			</div>
		</div>
	);
};

export default Header;
