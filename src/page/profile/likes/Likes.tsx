import { useOutletContext } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import {
	UserLikeedPhoto,
	UserLikeedPhotos,
} from "../../../utils/queryFunctions/unsplashData/type/UserLikedPhotos";
import { useQuery } from "@tanstack/react-query";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { getUserLikedPhotos } from "../../../utils/queryFunctions/unsplashData/getUserLikedPhotos";
import { usePhotoStore } from "../../../store/store";
import PhotoGallery from "../../../Components/PhotoGallery";

const Likes = () => {
	const perPage = 15;
	const [page, setPage] = useState<number>(1);

	const [limitExceeded, setLimitExceeded] = useState(false);
	const [gotAllLikes, setGotAllLikes] = useState(false);
	const [username, , likesCount]: string[] = useOutletContext();

	const { allLikedPhotos, setAllLikedPhotosPush, setAllLikedPhotos } =
		usePhotoStore();

	const { isLoading, isError, data, error } = useQuery<
		{ photos: UserLikeedPhotos; remainingLimit: string | null },
		ErrorUnsplash
	>(["userLikedPhotos", page, perPage, username], getUserLikedPhotos, {
		keepPreviousData: true,
		useErrorBoundary: false,
		enabled: limitExceeded ? false : gotAllLikes ? false : true, // pause it if limitExceeded
	});

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllLikedPhotos(null);
	}, []);

	/** disable fetch if all liked photos are fetched */
	useEffect(() => {
		if (Number(likesCount) == allLikedPhotos?.length) {
			setGotAllLikes(true);
		}
	}, [allLikedPhotos]);

	if (data) {
		console.log("Likes", data);
	}

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		console.log("client", error);
		return <span>Error</span>;
	}
	return (
		<PhotoGallery<UserLikeedPhoto>
			data={data}
			isError={isError}
			isLoading={isLoading}
			setLimitExceeded={setLimitExceeded}
			perPage={perPage}
			setPage={setPage}
			allPhotos={allLikedPhotos}
			setAllPhotosPush={setAllLikedPhotosPush}
			gotAllPhotos={gotAllLikes}
		/>
	);
};

export default Likes;
