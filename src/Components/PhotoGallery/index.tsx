import { useQuery } from "@tanstack/react-query";
import {
	EditorialPhotosType,
	ErrorUnsplash,
	getEditorialPhotos,
} from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import PhotoLayoutGeneric from "../../stories/PhotoLayout/PhotoLayoutGeneric";

const PhotoGallery = () => {
	const { isLoading, isError, data, error } = useQuery<
		EditorialPhotosType[],
		ErrorUnsplash
	>(
		["singlePhoto"],
		getEditorialPhotos
		// ,		{ useErrorBoundary: true }
		//* using useErrorBoundary will propagate the error to the nearest error boundary in the component tree.
		//* WHICH in this case is "/" i.e <App/>
		//* BETTER to set error page as below on this component.
	);
	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		console.log("client", error);
		return <span>Error:{error.errors[0]}</span>;
	}
	console.log("photogllery", data);
	return (
		<PhotoLayoutGeneric<EditorialPhotosType>
			items={data}
			height="auto"
			width="100%"
		/>
	);
};

export default PhotoGallery;
