import { FC } from "react";
import "./ImageDetailModal.css";
import { Button } from "../button/Button";
interface ImageDetailModalArgs {
	// children?: ReactNode;
}

const ImageDetailModal: FC<ImageDetailModalArgs> = ({}) => {
	return (
		<div id="modalContainer">
			<div id="header">
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
			<div id="photo">
				<img
					src="/src/stories/assets/hooman-r-eDLeSvWI4OI-unsplash.jpg"
					alt=""
				/>
			</div>
			<div id="photoStats">
				<div id="row-1">
					<div>
						<p>Views</p>
						<p>0000</p>
					</div>
					<div>
						<p>Downloads</p>
						<p>000</p>
					</div>
					<div>
						<p>Featured in</p>
						<p>XOXO</p>
					</div>
					<div>
						<Button
							mode="icons-with-label"
							label="Share"
							imgUrl="/src/stories/assets/modal/shareArrow.svg"
							height={35}
						/>
						<Button
							mode="icons-with-label"
							label="info"
							imgUrl="/src/stories/assets/modal/info.svg"
							height={35}
						/>
						<Button
							mode="only-icons"
							imgUrl="/src/stories/assets/modal/threeDots.svg"
							height={35}
						/>
					</div>
				</div>
				<div id="row-2">
					<div>
						<img
							src="/src/stories/assets/modal/calendar.svg"
							alt=""
						/>
						<p>published on</p>
					</div>
					<div>
						<img
							src="/src/stories/assets/modal/camera.svg"
							alt=""
						/>
						<p>camera used</p>
					</div>
					<div>
						<img
							src="/src/stories/assets/modal/shieldCheck.svg"
							alt=""
						/>
						<p>free to use</p>
					</div>
				</div>
				<div id="row-3">
					{[
						"tag1",
						"tagtag2",
						"tag3",
						"tag4",
						"tag1",
						"tagtagtag2",
						"tag3",
						"tag4tag",
						"tag1",
						"tag2",
						"tag3",
						"tag4tag",
						"tag1tagtag",
						"tag2",
						"tag3",
						"tag4",
						"tag1",
						"tag2",
						"tag3",
						"tag4",
					].map((item) => (
						<Button
							mode="only-label"
							label={item}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageDetailModal;
