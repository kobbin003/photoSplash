import React, { useContext } from "react";
import { Urls } from "../../../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import "./style.css";
import { ZoomContext } from "../../../../Components/ModalContainer";
interface PhotoDisplayProps {
	photoUrls: Urls;
}
const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ photoUrls }) => {
	const context = useContext(ZoomContext);
	const handleClickZoom = () => {
		context?.setZoom((prev) => !prev);
	};
	return (
		<div
			id="photo"
			style={{
				cursor: `${context?.zoom ? "zoom-out" : "zoom-in"}`,
				width: `${context?.zoom ? "100vw" : "50%"}`,
				height: `${context?.zoom ? "fit-content" : "100vh"}`,
				paddingTop: `${context?.zoom ? "0" : "80px"}`,
				marginBottom: `${context?.zoom ? "0" : "1em"}`,
			}}
		>
			<img
				src={context?.zoom ? photoUrls.full : photoUrls.regular}
				alt=""
				onClick={handleClickZoom}
			/>
			<button
				onClick={handleClickZoom}
				style={{
					cursor: context?.zoom ? "zoom-out" : "zoom-in",
					top: context?.zoom ? "4.5%" : "15%",
					right: context?.zoom ? "4%" : "5%",
					position: context?.zoom ? "fixed" : "absolute",
				}}
			>
				<img
					src={
						context?.zoom
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
