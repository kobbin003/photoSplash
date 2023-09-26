import { useQuery } from "@tanstack/react-query";
import "./style.css";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { UserCollections } from "../../../utils/queryFunctions/unsplashData/type/UserCollections";
import { getUserCollections } from "../../../utils/queryFunctions/unsplashData/getUserCollections";
import CollectionCard from "./CollectionCard/CollectionCard";
import { conditionToShowErrorMessage } from "../../../utils/conditionToShowErrorMessage";
import { usePhotoStore } from "../../../store/store";
import arraysHaveSameContent from "../../../utils/arraysHaveSameContent";
const Collections = () => {
	const perPage = 15;
	const [page, setPage] = useState<number>(1);
	const { userName } = useParams();
	const [pageIncremented, setPageIncremented] = useState(false); // to increment page one at a time
	const [limitExceeded, setLimitExceeded] = useState(false);
	const [gotAllCollections, setGotAllCollections] = useState(false);

	const { setAllCollectionsPush, allCollections, setAllCollections } =
		usePhotoStore();

	const [, , , collectionCount]: string[] = useOutletContext();

	const { isLoading, data, error, isError } = useQuery<
		{ collections: UserCollections; remainingLimit: string | null },
		ErrorUnsplash
	>(["usercollection", page, perPage, userName], getUserCollections, {
		keepPreviousData: true,
		useErrorBoundary: false,
		enabled: limitExceeded ? false : gotAllCollections ? false : true, // pause it if limitExceeded
	});

	useEffect(() => {
		if (
			data &&
			allCollections &&
			arraysHaveSameContent(data?.collections, allCollections)
		) {
			console.log("same");
		}
		if (
			data?.remainingLimit &&
			conditionToShowErrorMessage(data?.remainingLimit)
		) {
			setLimitExceeded(true);
		}

		if (!isLoading && !isError && data) {
			setAllCollectionsPush((prev) => {
				/** useEffect runs twice, allCollections gets pushed twice with
				 * the same initially-fetched data */
				// return [...prev, ...data.collections];
				if (!arraysHaveSameContent(prev, data.collections)) {
					// console.log("not");
					return [...prev, ...data.collections];
				} else {
					// console.log("yes");
					return [...prev];
				}
			});
		}
		console.log("allCollections", allCollections);
		console.log("data-coll", data?.collections);
	}, [data]);

	/** disable fetch if all collections are fetched */
	useEffect(() => {
		if (Number(collectionCount) == allCollections?.length) {
			setGotAllCollections(true);
		}
	}, [allCollections]);

	useEffect(() => {
		// reset pageIncremented state
		setPageIncremented(false);

		// scroll listener
		const scrollListener = () => {
			// Get the viewport height
			const viewportHeight = window.innerHeight;

			// Get the vertical scroll position
			const scrollPosition = window.scrollY;

			// Get the total height of the document
			const totalHeight = document.documentElement.scrollHeight;

			const scrollThreshold = 200;

			if (viewportHeight + scrollPosition > totalHeight - scrollThreshold) {
				if (!pageIncremented) {
					// console.log("do");
					setPage((prev) => prev + perPage);
					setPageIncremented(true);
				}
			}
		};
		window.addEventListener("scroll", scrollListener);

		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, []);

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllCollections(null);
	}, []);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>Error:{error.errors}</p>;

	return (
		<div id="collectionsContainer">
			{allCollections
				? allCollections.map((coll) => (
						<CollectionCard
							data={coll}
							key={coll.id}
						/>
				  ))
				: data.collections.map((coll) => (
						<CollectionCard
							data={coll}
							key={coll.id}
						/>
				  ))}
			{/* {data &&
				data.collections.map((coll) => (
					<CollectionCard
						data={coll}
						key={coll.id}
					/>
				))} */}
		</div>
	);
};

export default Collections;
