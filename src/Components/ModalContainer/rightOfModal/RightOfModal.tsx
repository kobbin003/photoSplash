import { ForwardRefRenderFunction, forwardRef, useState } from "react";
import { usePhotoStore } from "../../../store/store";

interface RightOfModalProps {
	zoom: boolean;
	disableNextButton: boolean;
	setPage: React.Dispatch<React.SetStateAction<number | undefined>>;
	limitExceeded: boolean;
	lastIndex: number | undefined;
	setFetchPhoto: React.Dispatch<React.SetStateAction<boolean>>;
	setDisableNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightOfModal: ForwardRefRenderFunction<
	HTMLImageElement,
	RightOfModalProps
> = (
	{
		zoom,
		setPage,
		limitExceeded,
		lastIndex,
		setFetchPhoto,
		disableNextButton,
		setDisableNextButton,
	},
	ref
) => {
	const { allPhotos, currentPhoto, setCurrentPhoto } = usePhotoStore();

	const [infoHovered, setInfoHovered] = useState(false);

	const handleClickNextPhoto = () => {
		if (allPhotos) {
			// find the currentPhoto
			const currentPhotoIndex = allPhotos.findIndex(
				(photo) => photo.id == currentPhoto?.id
			);

			// find the nextPhoto
			const nextPhoto = allPhotos[currentPhotoIndex + 1];

			if (nextPhoto) {
				//check if the nextPhoto is he last photo in the allPhotos
				const isTheLastPhoto = allPhotos[allPhotos.length - 1] == nextPhoto;

				// if is is the last photo, set the 'page' & 'fetchPhoto' state to trigger fetch
				if (isTheLastPhoto) {
					setPage(allPhotos.length + 1);
					setFetchPhoto(true);
				}

				// set the nextPhoto as the currentPhoto
				setCurrentPhoto(nextPhoto);

				//* if limiteExceeded and reached at last of allPhotos, disableNextButton
				// this is needed when we click prev button after reaching the last photo and then come back again to the last photo
				if (limitExceeded && lastIndex) {
					const lastIndexPhoto = allPhotos[lastIndex];
					if (lastIndexPhoto == nextPhoto) {
						setDisableNextButton(true);
					}
				}
			} else {
				console.log(currentPhoto, allPhotos);
				// throw new Error("Next Photo not found");
			}
		}
	};

	const handleMouseEnter = () => {
		setInfoHovered(true);
	};
	const handleMouseLeave = () => {
		setInfoHovered(false);
	};
	return (
		<div
			className="blackSpace blackSpace__right"
			style={{ display: zoom ? "none" : "flex" }}
		>
			<button
				onClick={handleClickNextPhoto}
				disabled={disableNextButton}
				className={disableNextButton ? "disabledButton" : "navigateButton"}
			>
				<img
					ref={ref}
					id="nav-btn_right"
					src="/src/stories/assets/imageModal/rightArrow.svg"
					alt="right"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
				{disableNextButton && infoHovered && (
					<div className="info info_right">
						<p>Demo app :</p>
						<p>limit exceeded</p>
					</div>
				)}
			</button>
		</div>
	);
};

export default forwardRef(RightOfModal);
