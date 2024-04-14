import { MouseEvent } from "react";
import { usePhotoStore } from "../../../store/store";
import { Button } from "../../button/Button";
import { useLocation } from "react-router-dom";
import { authorise } from "../../../utils/authorise";

type Props = {
	id: string;
	photoUrl: string;
	collectionIds: number[] | [];
};

const AddButton = ({ photoUrl, id, collectionIds }: Props) => {
	const { setShowCollectionModal } = usePhotoStore();
	const { pathname } = useLocation();

	const loggedIn = pathname.includes("me");
	const handleClickShowModal = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (!loggedIn) {
			const url = authorise();
			window.location.href = url;
		} else {
			setShowCollectionModal({
				show: true,
				img: { url: photoUrl, id, collectionIds },
			});
		}
	};
	return (
		<Button
			height={35}
			mode="only-icons"
			imgUrl="/src/stories/assets/PhotoCard/add.svg"
			handleClick={handleClickShowModal}
		/>
	);
};

export default AddButton;
