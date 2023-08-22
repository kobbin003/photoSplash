import { useQuery } from "@tanstack/react-query";
// import { PhotoStats } from "../../../../utils/queryFunctions/unsplashData/type/PhotoStats";
// import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getEditorialPhotos";
// import { getPhotoStats } from "../../../../utils/queryFunctions/unsplashData/getPhotoStats";
import "./style.css";
import {
	PhotoStats,
	ErrorUnsplash,
} from "../../../../../../utils/queryFunctions/unsplashData/type/PhotoStats";
import { getPhotoStats } from "../../../../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { Button } from "../../../../../button/Button";
// import { Button } from "../../../button/Button";
const PhotoStatsOne = ({ id }: { id: string }) => {
	// console.log("current-ID-1111", id);
	const { data, error, isLoading, isError } = useQuery<
		PhotoStats,
		ErrorUnsplash
	>(["getPhotoStats", id], getPhotoStats, {
		useErrorBoundary: false,
	});

	if (isError && error) {
		console.log("client", error);
		return <span>Error</span>;
	}
	if (isLoading) return <p>Loading...</p>;
	// console.log("photoStatsOne : /statistics", data);
	return (
		<div id="row-1">
			<div>
				<p>Views</p>
				<p>{data.views.total}</p>
			</div>
			<div>
				<p>Downloads</p>
				<p>{data.downloads.total}</p>
			</div>
			<div>
				<p>Likes</p>
				<p>{data.likes.total}</p>
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
	);
};

export default PhotoStatsOne;
