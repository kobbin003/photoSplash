import { useQuery } from "@tanstack/react-query";
import "./style.css";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { UserCollections } from "../../../utils/queryFunctions/unsplashData/type/UserCollections";
import { getUserCollections } from "../../../utils/queryFunctions/unsplashData/getUserCollections";
import { usePhotoStore } from "../../../store/store";
import CollectionGallery from "./CollectionGallery";

const Collections = () => {
	const perPage = 15;

	const [page, setPage] = useState<number>(1);

	const { userName } = useParams();

	const [limitExceeded, setLimitExceeded] = useState(false);
	const [gotAllCollections, setGotAllCollections] = useState(false);

	const [, , , collectionCount]: string[] = useOutletContext();

	const { setAllCollectionsPush, allCollections, setAllCollections } =
		usePhotoStore();

	const { isLoading, data, error, isError } = useQuery<
		{ collections: UserCollections; remainingLimit: string | null },
		ErrorUnsplash
	>(["usercollection", page, perPage, userName], getUserCollections, {
		keepPreviousData: true,
		useErrorBoundary: false,
		enabled: limitExceeded ? false : gotAllCollections ? false : true, // pause it if limitExceeded
	});

	useEffect(() => {
		console.log("collections-remaining-limit", data);
	}, [data]);

	/** disable fetch if all collections are fetched */
	useEffect(() => {
		if (
			collectionCount &&
			allCollections?.length &&
			Number(collectionCount) == allCollections?.length
		) {
			setGotAllCollections(true);
			// console.log("yes-allCollections", collectionCount, allCollections);
		}
		// console.log("no-allCollections", collectionCount, allCollections);
	}, [allCollections]);

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllCollections(null);
	}, []);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>Error:{error.errors}</p>;

	return (
		<CollectionGallery
			data={data}
			isError={isError}
			isLoading={isLoading}
			perPage={perPage}
			setPage={setPage}
			limitExceeded={limitExceeded}
			setLimitExceeded={setLimitExceeded}
			gotAllCollections={gotAllCollections}
			allCollections={allCollections}
			setAllCollectionsPush={setAllCollectionsPush}
		/>
	);
};

export default Collections;
