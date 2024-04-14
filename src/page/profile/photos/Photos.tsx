import { useEffect, useState } from "react";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { useOutletContext } from "react-router-dom";
import { usePhotoStore } from "../../../store/store";
import {
	UserUploadedPhoto,
	UserUploadedPhotos,
} from "../../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";
import { getUserUploadedPhotos } from "../../../utils/queryFunctions/unsplashData/getUserUploadedPhotos";
import PhotoGallery from "../../../Components/PhotoGallery";

const Photos = () => {
	const perPage = 15;

	const [page, setPage] = useState<number>(1);

	const [limitExceeded, setLimitExceeded] = useState(false);

	const [gotAllPhotos, setGotAllPhotos] = useState(false);

	const [username, photosCount, ..._]: string[] = useOutletContext();

	const { allUploadedPhotos, setAllUploadedPhotosPush, setAllUploadedPhotos } =
		usePhotoStore();

	const { isLoading, isError, data, error } = useQuery<
		{ photos: UserUploadedPhotos; remainingLimit: string | null },
		ErrorUnsplash
	>(["userUploadedPhotos", page, perPage, username], getUserUploadedPhotos, {
		keepPreviousData: true,
		useErrorBoundary: false,
		// enabled: limitExceeded ? false : true, // pause it if limitExceeded
		enabled: limitExceeded ? false : gotAllPhotos ? false : true, // pause it if limitExceeded
	});

	useEffect(() => {
		console.log("photos-remaining-limit", data?.remainingLimit);
	}, [data]);

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllUploadedPhotos(null);
	}, []);

	/** disable fetch if all uploaded photos are fetched */
	useEffect(() => {
		console.log("NOT-equal", photosCount, allUploadedPhotos?.length);
		if (photosCount && Number(photosCount) == allUploadedPhotos?.length) {
			console.log("equal", photosCount, allUploadedPhotos?.length);
			setGotAllPhotos(true);
		}
	}, [allUploadedPhotos]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		console.log("client", error);
		return <span>Error</span>;
	}
	return (
		<PhotoGallery<UserUploadedPhoto>
			key={"profile/photos"}
			data={data}
			isError={isError}
			isLoading={isLoading}
			limitExceeded={limitExceeded}
			setLimitExceeded={setLimitExceeded}
			setPage={setPage}
			perPage={perPage}
			allPhotos={allUploadedPhotos}
			setAllPhotosPush={setAllUploadedPhotosPush}
			gotAllPhotos={gotAllPhotos}
		/>
	);
};

export default Photos;
