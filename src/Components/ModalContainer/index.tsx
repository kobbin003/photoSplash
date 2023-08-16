import { useEffect, useState } from "react";
import "./style.css";
import ImageDetailModal from "../../stories/imageDetailModal/ImageDetailModal";
const ModalContainer = () => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => {
		document.body.style.overflow = "scroll";
		setShowModal(false);
	};
	useEffect(() => {
		const handleShowModal = () => {
			document.body.style.overflow = "hidden";
			setShowModal(true);
		};
		window.addEventListener("showModal", handleShowModal);
		return () => window.removeEventListener("showModal", handleShowModal);
	}, []);
	return (
		<div
			style={{
				display: showModal ? "flex" : "none",
				justifyContent: "center",
			}}
		>
			/** layer-1: the black curtain */
			<div id="blackCurtain"></div>
			/** layer-2: the ImageDetailModal */
			<div id="modalContainer">
				<ImageDetailModal />
			</div>
			/** layer-3: the nav & close buttons */
			<div className="blackSpace blackSpace__left">
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
				<button>
					<img
						src="/src/stories/assets/imageModal/leftArrow.svg"
						alt="left"
					/>
				</button>
			</div>
			<div className="blackSpace blackSpace__right">
				<button>
					<img
						src="/src/stories/assets/imageModal/rightArrow.svg"
						alt="right"
					/>
				</button>
			</div>
		</div>
	);
};

export default ModalContainer;
