import { useEffect, useRef, useState } from "react";
import { usePhotoStore } from "../../store/store";
import "./style.css";
import { useClickedOut } from "../../hooks/useClickedOut";
import AddCollection from "./components/addCollection/AddCollection";
import AddCollectionForm from "./components/addCollectionForm/AddCollectionForm";
type Props = {};

const CollectionModal = ({}: Props) => {
	const { setShowCollectionModal, showCollectionModal } = usePhotoStore();
	const [showForm, setShowForm] = useState(false);
	const collectionModalContentRef = useRef(null);
	// useOutsideClickPropagate(() => {});
	useClickedOut(collectionModalContentRef, () => {
		setShowCollectionModal({ show: false, img: { url: "" } });
	});
	console.log(showCollectionModal);
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "scroll";
		};
	}, []);
	return (
		<div id="collection-modal-container">
			<button id="collection-close_btn"></button>
			<div
				id="collection-modal-content"
				ref={collectionModalContentRef}
			>
				<div>
					<img
						src={showCollectionModal.img.url}
						alt=""
					/>
				</div>
				{!showForm ? (
					<AddCollection setShowForm={setShowForm} />
				) : (
					<AddCollectionForm />
				)}
			</div>
		</div>
	);
};

export default CollectionModal;
