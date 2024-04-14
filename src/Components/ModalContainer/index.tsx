import { createContext, useEffect, useRef, useState } from "react";
import "./style.css";
import ImageDetailModal from "../../stories/imageDetailModal/ImageDetailModal";
import { usePhotoStore } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { EditorialPhotosType } from "../../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import {
	ErrorUnsplash,
	getEditorialPhotos,
} from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import LeftOfModal from "./LeftOfModal";
import RightOfModal from "./rightOfModal/RightOfModal";
import {
	// useClickedOutsideId,
	useClickedOutsideRef,
} from "../../hooks/useClickedOutside";

type ZoomContext = {
	zoom: boolean;
	setZoom: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ZoomContext = createContext<ZoomContext | null>(null);
const ModalContainer = () => {
	const [zoom, setZoom] = useState(false);
	const { allPhotos, currentPhoto, setAllPhotosPush, setShowModal } =
		usePhotoStore();

	const [disableNextButton, setDisableNextButton] = useState(false);
	const [page, setPage] = useState<number | undefined>();
	const [lastIndex, setLastIndex] = useState<number | undefined>();
	const [limitExceeded, setLimitExceeded] = useState<boolean>(false);
	const [fetchPhoto, setFetchPhoto] = useState(false);
	const { isLoading, data, error } = useQuery<
		{ photos: EditorialPhotosType[]; remainingLimit: string | null },
		ErrorUnsplash
	>(["singlePhotomodal", page], getEditorialPhotos, {
		keepPreviousData: true,
		useErrorBoundary: false,
		enabled: limitExceeded || fetchPhoto, // pause it if limitExceeded or !fetchPhoto
	});

	const imageDetailModalRef = useRef<HTMLDivElement>(null);
	const prevButtonRef = useRef<HTMLImageElement>(null);
	const nextButtonRef = useRef<HTMLImageElement>(null);

	/** using useClickedOutsideRef */
	const reffs = [imageDetailModalRef, prevButtonRef, nextButtonRef];
	// useClickedOutsideRef(reffs, () => {
	// 	setShowModal(false);
	// });

	/** using useClickedOutsideId */
	// const ids = ["modalContent", "nav-btn_right", "nav-btn_left"];
	// useClickedOutsideId(ids, () => {
	// 	setShowModal(false);
	// });

	//* fetch only if the photo clicked is the last photo in allPhotos
	useEffect(() => {
		if (allPhotos) {
			const currentPhotoIndex = allPhotos.findIndex(
				(photo) => photo.id == currentPhoto?.id
			);
			if (currentPhotoIndex == allPhotos?.length - 1) {
				// console.log(currentPhoto?.page);
				setPage(currentPhotoIndex + 1);
				setFetchPhoto(true);
			}
		}
	}, []);

	//* disable nextButton if data is loading
	useEffect(() => {
		if (fetchPhoto && isLoading) {
			setDisableNextButton(true);
		} else {
			setDisableNextButton(false);
		}
	}, [isLoading]);

	//* update allPhotos on data fetch
	useEffect(() => {
		if (data) {
			setAllPhotosPush((prev) => [...prev, ...data.photos]);
			//* do the following if limit exceed condition is set
			if (Number(data.remainingLimit) < 5) {
				console.log(" limit has been exceeded");
				setLimitExceeded(true);
				setDisableNextButton(true);
				allPhotos && setLastIndex(allPhotos?.length - 1);
			}
		}
		// console.log("remaining limit", data?.remainingLimit);
	}, [data]);

	return (
		<div id="modalContainer">
			<div id="blackCurtain"></div>
			<div id="modalCompContainer">
				<ZoomContext.Provider value={{ zoom, setZoom }}>
					{!error ? (
						<ImageDetailModal ref={imageDetailModalRef} />
					) : (
						<p>{error.errors}</p>
					)}
				</ZoomContext.Provider>
			</div>
			<LeftOfModal
				ref={prevButtonRef}
				zoom={zoom}
				disableNextButton={disableNextButton}
				setDisableNextButton={setDisableNextButton}
			/>
			<RightOfModal
				ref={nextButtonRef}
				zoom={zoom}
				lastIndex={lastIndex}
				limitExceeded={limitExceeded}
				setPage={setPage}
				setFetchPhoto={setFetchPhoto}
				disableNextButton={disableNextButton}
				setDisableNextButton={setDisableNextButton}
			/>
		</div>
	);
};

export default ModalContainer;
