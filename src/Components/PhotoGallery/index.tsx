import { Dispatch, useEffect, useRef, useState } from "react";
import PhotoLayoutGeneric from "../../stories/PhotoLayout/PhotoLayoutGeneric";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import arraysHaveSameContent from "../../utils/arraysHaveSameContent";
import { conditionToShowErrorMessage } from "../../utils/conditionToShowErrorMessage";
import { UserLikeedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserLikedPhotos";
import { UserUploadedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";

type PhotoGalleryProp<T> = {
	data: { photos: T[]; remainingLimit: string | null };
	isLoading: boolean;
	isError: boolean;
	setPage: Dispatch<React.SetStateAction<number>>;
	setLimitExceeded: Dispatch<React.SetStateAction<boolean>>;
	allPhotos: T[] | null;
	setAllPhotosPush: (fn: (prevData: T[]) => T[]) => void;
};

const PhotoGallery = <
	T extends EditorialPhotosType | UserLikeedPhoto | UserUploadedPhoto
>({
	data,
	isLoading,
	isError,
	setLimitExceeded,
	setPage,
	allPhotos,
	setAllPhotosPush,
}: PhotoGalleryProp<T>) => {
	const [pageIncremented, setPageIncremented] = useState(false); // to increment page one at a time

	const scrolledYRef = useRef<number>();

	useEffect(() => {
		if (
			data?.remainingLimit &&
			conditionToShowErrorMessage(data?.remainingLimit)
		) {
			setLimitExceeded(true);
		}

		if (!isLoading && !isError && data) {
			setAllPhotosPush((prev) => {
				if (!arraysHaveSameContent(prev, data.photos)) {
					// console.log("not");
					return [...prev, ...data.photos];
				} else {
					// console.log("yes");
					return [...prev];
				}
			});
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
				// console.log("NOT FOUND");
				window.scrollTo(0, 0);
			}
		}
	}, [data]);

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
			{allPhotos ? (
				/**after the first fetch i.e when "allPhotos is set
				 * set items as allPhotos, because we need it in <ModalContainer/>" */
				<PhotoLayoutGeneric<T>
					items={allPhotos}
					height="auto"
					width="100%"
				/>
			) : (
				<PhotoLayoutGeneric<T>
					items={data.photos}
					height="auto"
					width="100%"
				/>
			)}
		</>
	);
};

export default PhotoGallery;
