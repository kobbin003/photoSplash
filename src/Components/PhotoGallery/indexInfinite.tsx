import { useInfiniteQuery } from "@tanstack/react-query";
import {
	ErrorUnsplash,
	getEditorialPhotosInfinite,
} from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { useEffect } from "react";
import { usePhotoStore } from "../../store/store";
import PhotoLayoutGeneric from "../../stories/PhotoLayout/PhotoLayoutGeneric";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";

//*  Using useInfiniteQuery  */

//! does not bring the continuity in the photolayout

const conditionToShowErrorMessage = (remainingLimit: string | null) => {
	if (remainingLimit) {
		return parseInt(remainingLimit, 10) < parseInt("2", 10);
	}
	return false;
};

const PhotoGalleryInfinite = () => {
	const { setAllPhotos, setAllPhotosPush, allPhotos } = usePhotoStore();

	const {
		data,
		error,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery<
		{ photos: EditorialPhotosType[]; remainingLimit: string | null },
		ErrorUnsplash
	>(
		["singleEditorialPhoto"],
		({ pageParam = 1 }) => getEditorialPhotosInfinite(pageParam),

		{
			keepPreviousData: true,
			useErrorBoundary: false,
			getNextPageParam: (lastPage) => lastPage.remainingLimit,
			enabled: true,
		}
		// ,		{ useErrorBoundary: true }
		//* using useErrorBoundary will propagate the error to the nearest error boundary in the component tree.
		//* WHICH in this case is "/" i.e <App/>
		//* BETTER to set error page as below on this component.
	);

	useEffect(() => {
		data?.pages.map((page) =>
			setAllPhotosPush((prev: EditorialPhotosType[]) => {
				// console.log("prev", prev);
				return [...prev, ...page.photos];
			})
		);
		// console.log("data:", data, "allPhotos:", allPhotos);
	}, [data]);

	useEffect(() => {
		//go to top on reMount
		// window.scrollTo(0, 0);
		// scroll listener
		const scrollListener = () => {
			// Get the viewport height
			const viewportHeight = window.innerHeight;

			// Get the vertical scroll position
			const scrollPosition = window.scrollY;

			// Get the total height of the document
			const totalHeight = document.documentElement.scrollHeight;

			const scrollThreshold = 50;
			if (viewportHeight + scrollPosition > totalHeight - scrollThreshold) {
				fetchNextPage();
			}
		};
		window.addEventListener("scroll", scrollListener);

		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, []);

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		console.log("client", error);
		return <span>Error</span>;
	}

	return (
		<>
			{data.pages.map((page, index) => (
				<div
					key={index}
					style={{ position: "relative", height: "100%", width: "100%" }}
				>
					<>
						{conditionToShowErrorMessage(page.remainingLimit) && (
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
					<PhotoLayoutGeneric<EditorialPhotosType>
						items={page.photos}
						height="auto"
						width="100%"
					/>
				</div>
			))}
			{/* {isFetchingNextPage && <h1> Loading...</h1>} */}
		</>
	);
};

export default PhotoGalleryInfinite;
