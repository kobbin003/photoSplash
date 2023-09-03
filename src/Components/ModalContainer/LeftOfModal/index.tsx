import React, {
	ForwardRefRenderFunction,
	forwardRef,
	useEffect,
	useState,
} from "react";
import { usePhotoStore } from "../../../store/store";
import "../style.css";
interface LeftOfModalProps {
	zoom: boolean;
	disableNextButton: boolean;
	setDisableNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}
const LeftOfModal: ForwardRefRenderFunction<
	HTMLImageElement,
	LeftOfModalProps
> = ({ zoom, disableNextButton, setDisableNextButton }, ref) => {
	const { allPhotos, currentPhoto, setCurrentPhoto, setShowModal } =
		usePhotoStore();

	const [disablePrevButton, setDisablePrevButton] = useState(true);

	const [infoHovered, setInfoHovered] = useState(false);

	const handleCloseModal = () => {
		document.body.style.overflow = "scroll";
		setShowModal(false);
	};

	const handleClickPrevPhoto = () => {
		// enable nextbutton if nextButton is disabled
		if (disableNextButton) {
			setDisableNextButton(false);
		}
		if (allPhotos) {
			// find the currentPhoto  :
			const currentPhotoIndex = allPhotos.findIndex(
				(photo) => photo.id == currentPhoto?.id
			);
			// find the prev photo:
			const prevPhoto = allPhotos[currentPhotoIndex - 1];

			// set the previous photo found as the currentPhoto
			if (prevPhoto) {
				setCurrentPhoto(prevPhoto);
			}
		}
	};

	const handleMouseEnter = () => {
		setInfoHovered(true);
	};

	const handleMouseLeave = () => {
		setInfoHovered(false);
	};

	//* disable prev button if the photo clicked is the first photo on 'allPhotos'
	useEffect(() => {
		if (allPhotos) {
			const currentPhotoIndex = allPhotos.findIndex(
				(photo) => photo.id == currentPhoto?.id
			);
			if (currentPhotoIndex > 1) {
				setDisablePrevButton(false);
			} else {
				setDisablePrevButton(true);
			}
		}
	}, [currentPhoto]);

	return (
		<div
			className="blackSpace blackSpace__left"
			style={{ display: zoom ? "none" : "flex" }}
		>
			<button
				id="close"
				onClick={handleCloseModal}
			>
				<img
					src="/src/assets/close.svg"
					alt="close"
					height={25}
					width={25}
				/>
			</button>
			<button
				onClick={handleClickPrevPhoto}
				disabled={disablePrevButton}
				className={disablePrevButton ? "disabledButton" : "navigateButton"}
			>
				<img
					ref={ref}
					id="nav-btn_left"
					src="/src/stories/assets/imageModal/leftArrow.svg"
					alt="left"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
				{disablePrevButton && infoHovered && (
					<div className="info info_left">
						<p>you are at the start</p>
					</div>
				)}
			</button>
		</div>
	);
};

export default forwardRef(LeftOfModal);
