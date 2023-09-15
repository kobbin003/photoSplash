import PhotoGallery from "../../Components/PhotoGallery";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import {
	ErrorUnsplash,
	getEditorialPhotos,
} from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";

export type GalleryPhotoType = {
	photos: EditorialPhotosType[];
	remainingLimit: string | null;
};
const HomeGallery = () => {
	const [page, setPage] = useState<number>(1);

	const [limitExceeded, setLimitExceeded] = useState(false);

	const { isLoading, isError, data, error } = useQuery<
		{ photos: EditorialPhotosType[]; remainingLimit: string | null },
		ErrorUnsplash
	>(
		["singlePhoto", page],
		getEditorialPhotos,
		{
			keepPreviousData: true,
			useErrorBoundary: false,
			enabled: limitExceeded ? false : true, // pause it if limitExceeded
		}
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
		return <span>Error</span>;
	}
	return (
		<>
			<PhotoGallery<GalleryPhotoType>
				data={data}
				isError={isError}
				isLoading={isLoading}
				setLimitExceeded={setLimitExceeded}
				setPage={setPage}
			/>
		</>
	);
};

export default HomeGallery;
