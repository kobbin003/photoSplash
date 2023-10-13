import { Dispatch, useEffect, useRef } from "react";
import PhotoLayoutGeneric from "../../stories/PhotoLayout/PhotoLayoutGeneric";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import arraysHaveSameContent from "../../utils/arraysHaveSameContent";
import { conditionToShowErrorMessage } from "../../utils/conditionToShowErrorMessage";
import { UserLikeedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserLikedPhotos";
import { UserUploadedPhoto } from "../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";
import { CollectionPhoto } from "../../utils/queryFunctions/unsplashData/type/CollectionPhotos";
import { SearchPhoto } from "../../utils/queryFunctions/unsplashData/type/SearchPhotos";

type PhotoGalleryProp<T> = {
	data: { photos: T[]; remainingLimit: string | null };
	isLoading: boolean;
	isError: boolean;
	perPage: number;
	// page: number;
	gotAllPhotos?: boolean;
	limitExceeded: boolean;
	setLimitExceeded: Dispatch<React.SetStateAction<boolean>>;
	setPage: Dispatch<React.SetStateAction<number>>;
	allPhotos: T[] | null;
	setAllPhotosPush: (fn: (prevData: T[]) => T[]) => void;
};

const PhotoGallery = <
	T extends
		| EditorialPhotosType
		| UserLikeedPhoto
		| UserUploadedPhoto
		| CollectionPhoto
		| SearchPhoto
>({
	data,
	isLoading,
	isError,
	limitExceeded,
	setLimitExceeded,
	// page,
	perPage,
	setPage,
	allPhotos,
	setAllPhotosPush,
	gotAllPhotos,
}: PhotoGalleryProp<T>) => {
	const photoLayoutRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			(data?.remainingLimit &&
				conditionToShowErrorMessage(data?.remainingLimit)) ||
			!data?.remainingLimit
		) {
			setLimitExceeded(true);
		}
		if (!isLoading && !isError && data) {
			setAllPhotosPush((prev) => {
				/** useEffect runs twice, allPhotos gets pushed twice with
				 * the same initially-fetched data */
				if (!arraysHaveSameContent(prev, data.photos)) {
					// console.log("not");
					return [...prev, ...data.photos];
				} else {
					// console.log("yes");
					return [...prev];
				}
			});
		}
	}, [data]);

	/** scroll event */
	useEffect(() => {
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
				// console.log("got gotAllPhotos", gotAllPhotos);
				/** setPageIncrement is not required,
				 * because, after the data is fetched the scrollheight gets longer
				 * and so the condition becomes falsy again. */
				if (!gotAllPhotos) {
					// console.log("not got gotAllPhotos", gotAllPhotos);
					setPage((prev) => prev + perPage);
				}
			}
		};
		window.addEventListener("scroll", scrollListener);

		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, [gotAllPhotos]);

	return (
		<>
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
			{/**after the first fetch i.e when "allPhotos is set",
			 * set items as allPhotos, because we need it in <ModalContainer/>" */}
			{allPhotos ? (
				<PhotoLayoutGeneric<T>
					items={allPhotos}
					height="auto"
					width="100%"
					ref={photoLayoutRef}
				/>
			) : (
				<PhotoLayoutGeneric<T>
					items={data.photos}
					height="auto"
					width="100%"
					ref={photoLayoutRef}
				/>
			)}
		</>
	);
};

export default PhotoGallery;
