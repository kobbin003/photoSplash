import PhotoGallery from "../../Components/PhotoGallery";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import {
	ErrorUnsplash,
	getEditorialPhotos,
} from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { usePhotoStore } from "../../store/store";
import CollectionModal from "../../Components/createCollectionModal/CollectionModal";

const HomeGallery = () => {
	const perPage = 20;
	const [page, setPage] = useState<number>(1);

	// const [limitExceeded, setLimitExceeded] = useState(false);
	const [limitExceeded, setLimitExceeded] = useState(false);

	const { allPhotos, setAllPhotosPush, showCollectionModal } = usePhotoStore();

	const { isLoading, isError, data, error } = useQuery<
		{ photos: EditorialPhotosType[]; remainingLimit: string | null },
		ErrorUnsplash
	>(
		["singlePhoto", page, perPage],
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
			{showCollectionModal.show && <CollectionModal />}
			<PhotoGallery<EditorialPhotosType>
				key={"homegallery"}
				data={data}
				isError={isError}
				isLoading={isLoading}
				limitExceeded={limitExceeded}
				setLimitExceeded={setLimitExceeded}
				// page={page}
				perPage={perPage}
				setPage={setPage}
				allPhotos={allPhotos}
				setAllPhotosPush={setAllPhotosPush}
			/>
		</>
	);
};

export default HomeGallery;
