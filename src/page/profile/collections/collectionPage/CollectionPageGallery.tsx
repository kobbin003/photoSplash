import { useQuery } from "@tanstack/react-query";
import PhotoGallery from "../../../../Components/PhotoGallery";
import { getCollectionPhotos } from "../../../../utils/queryFunctions/unsplashData/getCollectionPhotos";
import { CollectionPhoto } from "../../../../utils/queryFunctions/unsplashData/type/CollectionPhotos";
import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { useEffect, useState } from "react";
import { usePhotoStore } from "../../../../store/store";
import "./style.css";

type Props = {
	collectionId: string;
	collectionPhotoCount: number;
};

const CollectionPageGallery = ({
	collectionId,
	collectionPhotoCount,
}: Props) => {
	const perPage = 5;
	const [page, setPage] = useState(1);
	const [limitExceeded, setLimitExceeded] = useState(false);
	const [gotAllPhotos, setGotAllPhotos] = useState(false);
	// const [username, photosCount, ..._]: string[] = useOutletContext();

	const {
		allCollectionPhotos,
		setAllCollectionPhotos,
		setAllCollectionPhotosPush,
	} = usePhotoStore();

	const { data, isError, isLoading, error } = useQuery<
		{
			photos: CollectionPhoto[];
			remainingLimit: string | null;
		},
		ErrorUnsplash
	>(["collectionPhotos", page, perPage, collectionId], getCollectionPhotos, {
		keepPreviousData: true,
		useErrorBoundary: false,
		enabled: limitExceeded ? false : gotAllPhotos ? false : true, // pause it if limitExceeded
	});

	/** disable fetch if all uploaded photos are fetched */
	useEffect(() => {
		if (
			allCollectionPhotos?.length &&
			Number(collectionPhotoCount) == allCollectionPhotos?.length
		) {
			setGotAllPhotos(true);
			console.log("got all", collectionPhotoCount, allCollectionPhotos?.length);
		}
		console.log(
			"not got all",
			collectionPhotoCount,
			allCollectionPhotos?.length
		);
	}, [allCollectionPhotos, collectionPhotoCount]);

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllCollectionPhotos(null);
	}, []);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		console.log("client", error);
		return <span>Error</span>;
	}

	return (
		<PhotoGallery<CollectionPhoto>
			data={data}
			isError={isError}
			isLoading={isLoading}
			limitExceeded={limitExceeded}
			setLimitExceeded={setLimitExceeded}
			setPage={setPage}
			perPage={perPage}
			allPhotos={allCollectionPhotos}
			setAllPhotosPush={setAllCollectionPhotosPush}
			gotAllPhotos={gotAllPhotos}
		/>
	);
};

export default CollectionPageGallery;
