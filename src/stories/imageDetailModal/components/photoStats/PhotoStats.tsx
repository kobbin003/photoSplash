import { useContext } from "react";
import PhotoStatsOne from "./components/photoStatsOne/PhotoStatsOne";
import PhotoStatsTwo from "./components/photoStatsTwo/PhotoStatsTwo";
import "./style.css";
import { ZoomContext } from "../../../../Components/ModalContainer";
const PhotoStats = ({ photoId }: { photoId: string }) => {
	const context = useContext(ZoomContext);
	return (
		<div
			id="photoStats"
			style={{ display: context?.zoom ? "none" : "flex" }}
		>
			<PhotoStatsOne id={photoId} />
			<PhotoStatsTwo id={photoId} />
		</div>
	);
};

export default PhotoStats;
