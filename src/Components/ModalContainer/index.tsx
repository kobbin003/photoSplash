import { useEffect, useState } from "react";
import "./style.css";
import ImageDetailModal from "../../stories/imageDetailModal/ImageDetailModal";
const ModalContainer = () => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => {
		console.log("close modal");
		document.body.style.overflow = "scroll";
		const modalEl = document.getElementById("modalContainer");

		setShowModal(false);
	};
	useEffect(() => {
		const handleShowModal = () => {
			console.log("show modal");
			document.body.style.overflow = "hidden";
			setShowModal(true);
		};
		window.addEventListener("showModal", handleShowModal);
		return () => window.removeEventListener("showModal", handleShowModal);
	}, []);
	return (
		<div
			id="modalContainer"
			style={{ display: showModal ? "flex" : "none" }}
		>
			{/* <button onClick={handleCloseModal}>XXXXXXXXXXX</button> */}
			<div className="blackSpace">&lt;</div>
			<ImageDetailModal />
			<div className="blackSpace">&gt;</div>
		</div>
	);
};

export default ModalContainer;
