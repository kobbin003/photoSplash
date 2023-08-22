import React, { useState } from "react";
import { Urls } from "../../../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import "./style.css";
interface PhotoDisplayProps {
	photoUrls: Urls;
}
const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ photoUrls }) => {
	const [zoom, setZoom] = useState(false);
	const handleClickZoom = () => {
		setZoom((prev) => !prev);
	};
	return (
		<div
			id="photo"
			style={{
				width: `${zoom ? "100%" : "50%"}`,
				cursor: `${zoom ? "zoom-out" : "zoom-in"}`,
			}}
		>
			<img
				src={zoom ? photoUrls.regular : photoUrls.full}
				alt=""
				onClick={handleClickZoom}
			/>
			<button
				onClick={handleClickZoom}
				style={{
					cursor: `${zoom ? "zoom-out" : "zoom-in"}`,
				}}
			>
				<img
					src={
						zoom
							? "/src/stories/assets/modal/zoomIn.svg"
							: "/src/stories/assets/modal/zoomOut.svg"
					}
					alt=""
				/>
			</button>
		</div>
	);
};

export default PhotoDisplay;
