import { useEffect, useState } from "react";
import PhotoGallery from "../../../Components/PhotoGallery";
import { SearchPhoto } from "../../../utils/queryFunctions/unsplashData/type/SearchPhotos";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { getSearchPhotos } from "../../../utils/queryFunctions/unsplashData/getSearchPhotos";
import { useSearchPhotosStore } from "../../../store/searchPhotoStore";
import { useOutletContext } from "react-router-dom";

type Props = {};

const PhotosSearch = ({}: Props) => {
	const perPage = 2;

	const [page, setPage] = useState<number>(1);

	const [limitExceeded, setLimitExceeded] = useState(false);

	const [gotAllPhotos, setGotAllPhotos] = useState(false);

	const [query]: string[] = useOutletContext();

	const { allSearchPhotos, setAllSearchPhotosPush, setAllSearchPhotos } =
		useSearchPhotosStore();

	const { isLoading, isError, data, error } = useQuery<
		{
			photos: SearchPhoto[];
			remainingLimit: string | null;
			photoCount: number;
		},
		ErrorUnsplash
	>(["userUploadedPhotos", query, page, perPage], getSearchPhotos, {
		keepPreviousData: true,
		useErrorBoundary: false,
		// enabled: limitExceeded ? false : true, // pause it if limitExceeded
		enabled: limitExceeded ? false : gotAllPhotos ? false : true, // pause it if limitExceeded
	});

	useEffect(() => {
		console.log("photos-remaining-limit", data?.remainingLimit, data);
	}, [data]);

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllSearchPhotos(null);
	}, []);

	/** disable fetch if all uploaded photos are fetched */
	useEffect(() => {
		console.log("NOT-equal", data?.photoCount, allSearchPhotos?.length);
		if (data?.photoCount && data?.photoCount == allSearchPhotos?.length) {
			console.log("equal", data?.photoCount, allSearchPhotos?.length);
			setGotAllPhotos(true);
		}
	}, [allSearchPhotos]);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		console.log("client", error.errors);
		return <span style={{ top: "120px" }}>Error</span>;
	}
	return (
		<PhotoGallery<SearchPhoto>
			key={"search/photo"}
			data={data}
			isError={isError}
			isLoading={isLoading}
			limitExceeded={limitExceeded}
			setLimitExceeded={setLimitExceeded}
			setPage={setPage}
			perPage={perPage}
			allPhotos={allSearchPhotos}
			setAllPhotosPush={setAllSearchPhotosPush}
			gotAllPhotos={gotAllPhotos}
		/>
	);
};

export default PhotosSearch;
