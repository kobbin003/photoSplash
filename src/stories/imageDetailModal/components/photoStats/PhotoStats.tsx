import PhotoStatsOne from "./components/photoStatsOne/PhotoStatsOne";
import PhotoStatsTwo from "./components/photoStatsTwo/PhotoStatsTwo";
import "./style.css";
const PhotoStats = ({ photoId }: { photoId: string }) => {
	return (
		<div id="photoStats">
			<PhotoStatsOne id={photoId} />
			<PhotoStatsTwo id={photoId} />
		</div>
	);
};

export default PhotoStats;
