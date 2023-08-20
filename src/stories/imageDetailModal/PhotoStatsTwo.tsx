import { useQuery } from "@tanstack/react-query";
import { ErrorUnsplash } from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { getPhoto } from "../../utils/queryFunctions/unsplashData/getPhoto";
import "./ImageDetailModal.css";
import LocationAddress from "./LocationAddress";
import { Photo } from "../../utils/queryFunctions/unsplashData/type/Photo";
import { Button } from "../button/Button";

const PhotoStatsTwo = ({ id }: { id: string }) => {
	// console.log("current-ID-222", id);

	const { data, isLoading, error, isError } = useQuery<Photo, ErrorUnsplash>(
		["getPhoto", id],
		getPhoto,
		{
			useErrorBoundary: false,
		}
	);
	if (isError && error) {
		console.log("client", error);
		return <span>Error</span>;
	}
	if (isLoading) return <p>Loading...</p>;
	// console.log("photostats-two : /photo", data);
	return (
		<>
			<div id="row-2">
				{data.location.city && (
					<div>
						<img
							src="/src/stories/assets/modal/location.svg"
							alt=""
						/>
						<LocationAddress location={data.location} />
					</div>
				)}
				<div>
					<img
						src="/src/stories/assets/modal/calendar.svg"
						alt="calender"
					/>
					<p>published on {data.created_at}</p>
				</div>
				{data.exif.name && (
					<div>
						<img
							src="/src/stories/assets/modal/camera.svg"
							alt="camera"
						/>
						<p>{data.exif.model}</p>
					</div>
				)}
				<div>
					<img
						src="/src/stories/assets/modal/shieldCheck.svg"
						alt=""
					/>
					<p>
						Free to use under the{" "}
						<a
							href="https://unsplash.com/license"
							target="_blank"
						>
							Unsplash License
						</a>
					</p>
				</div>
			</div>
			<div id="row-3">
				{data.tags.map((item, index) => (
					<Button
						mode="only-label"
						label={item.title}
						key={item.title + index}
					/>
				))}
			</div>
		</>
	);
};

export default PhotoStatsTwo;
