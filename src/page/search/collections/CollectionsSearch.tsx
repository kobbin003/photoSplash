import { useEffect, useState } from "react";
import "./style.css";
import { useOutletContext } from "react-router-dom";
import { useSearchCollectionsStore } from "../../../store/searchCollectionStore";
import { useQuery } from "@tanstack/react-query";
import { getSearchCollections } from "../../../utils/queryFunctions/unsplashData/getSearchCollections";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { SearchCollection } from "../../../utils/queryFunctions/unsplashData/type/SearchCollections";
import CollectionGallery from "../../profile/collections/CollectionGallery";

type Props = {};

const CollectionsSearch = ({}: Props) => {
	const perPage = 6;

	const [page, setPage] = useState<number>(1);

	const [limitExceeded, setLimitExceeded] = useState(false);
	const [gotAllCollections, setGotAllCollections] = useState(false);

	const [query]: string[] = useOutletContext();

	const {
		allSearchCollections,
		setAllSearchCollections,
		setAllSearchCollectionsPush,
	} = useSearchCollectionsStore();

	const { isLoading, data, error, isError } = useQuery<
		{
			collections: SearchCollection[];
			remainingLimit: string | null;
			collectionsCount: number;
		},
		ErrorUnsplash
	>(["search-collections", query, page, perPage], getSearchCollections, {
		keepPreviousData: true,
		useErrorBoundary: false,
		enabled: limitExceeded ? false : gotAllCollections ? false : true, // pause it if limitExceeded
	});

	useEffect(() => {
		console.log("search-collections-remaining-limit", data?.remainingLimit);
	}, [data]);

	/** disable fetch if all collections are fetched */
	useEffect(() => {
		if (
			data?.collectionsCount &&
			data?.collectionsCount == allSearchCollections?.length
		) {
			setGotAllCollections(true);
			// console.log("yes-allCollections", collectionCount, allCollections);
		}
		// console.log("no-allCollections", collectionCount, allCollections);
	}, [allSearchCollections]);

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllSearchCollections(null);
	}, []);

	if (isLoading) return <p>Loading...</p>;

	if (isError) {
		console.log("client", error);
		return <span style={{ top: "120px" }}>Error</span>;
	}
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
			allCollections={allSearchCollections}
			setAllCollectionsPush={setAllSearchCollectionsPush}
		/>
	);
};

export default CollectionsSearch;
