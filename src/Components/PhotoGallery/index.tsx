import { useQuery } from "@tanstack/react-query";
import {
	EditorialPhotosType,
	ErrorUnsplash,
	getEditorialPhotos,
} from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { useEffect, useRef, useState } from "react";
import { usePhotoStore } from "../../store/store";
import PhotoLayout from "../../stories/PhotoLayout/PhotoLayout";

const conditionToShowErrorMessage = (remainingLimit: string) => {
	return parseInt(remainingLimit, 10) < parseInt("2", 10);
};
const PhotoGallery = () => {
	const { setAllPhotos } = usePhotoStore();
	const [page, setPage] = useState(1);
	const [mergedData, setMergedData] = useState<EditorialPhotosType[]>([]);
	const [pageIncremented, setPageIncremented] = useState(false); // to increment page one at a time
	const [limitExceeded, setLimitExceeded] = useState(false);
	const scrolledYRef = useRef<number>();
	const { isLoading, isError, data, error } = useQuery<
		{ photos: EditorialPhotosType[]; remainingLimit: string | null },
		ErrorUnsplash
	>(
		["singlePhoto", page],
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
	useEffect(() => {
		if (
			data?.remainingLimit &&
			conditionToShowErrorMessage(data?.remainingLimit)
		) {
			setLimitExceeded(true);
		}
		console.log("rerender", page, data?.remainingLimit, window.innerHeight);
		if (!isLoading && !isError && data) {
			setMergedData((prevData) => [...prevData, ...data.photos]);

			if (scrolledYRef.current) {
				window.scrollTo(0, scrolledYRef.current);
				//! ISSUES:
				//* Sometimes the scroll remains at the top on re-render
				//* REASON:
				//* Due to asynchronous nature of fetch, the "scrollPosition" is set
				//* Before all the data's are fetched and filled the container
				//* THEREFORE, we get scrollPostion other than the one we set.
				//! try - keepPreviousData: true OR useInfiniteQuery
			} else {
				console.log("NOT FOUND");
				window.scrollTo(0, 0);
			}
		}
	}, [isLoading, isError, data]);

	useEffect(() => {
		// reset pageIncremented state
		setPageIncremented(false);
		//go to top on reMount
		window.scrollTo(0, 0);
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
				if (!pageIncremented) {
					scrolledYRef.current = scrollPosition + viewportHeight - 500;
					setPage((prev) => prev + 1);
					setPageIncremented(true);
				}
			}
		};
		window.addEventListener("scroll", scrollListener);

		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, []);
	useEffect(() => {
		setAllPhotos(mergedData);
	}, [mergedData]);
	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		console.log("client", error);
		return <span>Error</span>;
	}

	return (
		<>
			<>
				{data.remainingLimit &&
					conditionToShowErrorMessage(data.remainingLimit) && (
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
			<PhotoLayout
				items={mergedData}
				height="auto"
				width="100%"
			/>
		</>
	);
};

export default PhotoGallery;
