import React, { Dispatch, useEffect } from "react";
import { UserCollections } from "../../../utils/queryFunctions/unsplashData/type/UserCollections";
import { conditionToShowErrorMessage } from "../../../utils/conditionToShowErrorMessage";
import arraysHaveSameContent from "../../../utils/arraysHaveSameContent";
import CollectionCard from "./CollectionCard/CollectionCard";
import {
	SearchCollection,
	SearchCollections,
} from "../../../utils/queryFunctions/unsplashData/type/SearchCollections";

type CollectionGalleryProp = {
	data: {
		collections: UserCollections | SearchCollection[];
		remainingLimit: string | null;
		CollectionsCount?: number;
	};
	isLoading: boolean;
	isError: boolean;
	perPage: number;
	gotAllCollections?: boolean;
	setPage: Dispatch<React.SetStateAction<number>>;
	limitExceeded: boolean;
	setLimitExceeded: Dispatch<React.SetStateAction<boolean>>;
	allCollections: UserCollections | SearchCollections["results"] | null;
	setAllCollectionsPush:
		| ((fn: (prevData: UserCollections) => UserCollections) => void)
		| ((
				fn: (
					prevData: SearchCollections["results"]
				) => SearchCollections["results"]
		  ) => void);
};

const CollectionGallery = ({
	data,
	isLoading,
	isError,
	perPage,
	gotAllCollections,
	limitExceeded,
	setPage,
	setLimitExceeded,
	allCollections,
	setAllCollectionsPush,
}: CollectionGalleryProp) => {
	useEffect(() => {
		if (
			data?.remainingLimit &&
			conditionToShowErrorMessage(data?.remainingLimit)
		) {
			setLimitExceeded(true);
		}

		if (!isLoading && !isError && data) {
			setAllCollectionsPush((prev) => {
				//useEffect runs twice, allCollections gets pushed twice with
				// the same initially-fetched data
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
	}, [data]);

	/** scroll event listener */
	useEffect(() => {
		// reset pageIncremented state
		// setPageIncremented(false);

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
				// console.log("inside scroll-out", pageIncremented, gotAllCollections);
				if (!gotAllCollections) {
					// console.log("inside scroll-in", pageIncremented, gotAllCollections);
					//* setPage only if did not got all photos,
					//* otherwise, even though fetch will be disabled, the page will rerender
					setPage((prev) => prev + perPage);
				}
			}
		};
		window.addEventListener("scroll", scrollListener);

		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, [gotAllCollections]);

	return (
		<div id="collectionsContainer">
			<>
				{limitExceeded && (
					<p
						style={{
							position: "fixed",
							top: `${window.innerHeight - 100}px`,
							width: "100vw",
							height: "100px",
							backgroundColor: "red",
							zIndex: "10",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						It is a demo project: The limit has exceeded
					</p>
				)}
			</>
			{allCollections
				? allCollections.map((coll) => {
						return (
							<CollectionCard
								data={coll}
								key={coll.id}
							/>
						);
				  })
				: data.collections.map((coll) => {
						return (
							<CollectionCard
								data={coll}
								key={coll.id}
							/>
						);
				  })}
		</div>
	);
};

export default CollectionGallery;
