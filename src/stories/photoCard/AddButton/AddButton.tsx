import { MouseEvent } from "react";
import { usePhotoStore } from "../../../store/store";
import { Button } from "../../button/Button";

type Props = {
	id: string;
	photoUrl: string;
};

const AddButton = ({ id, photoUrl }: Props) => {
	const { setShowCollectionModal } = usePhotoStore();
	const handleClickShowModal = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowCollectionModal({ show: true, img: { url: photoUrl } });
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
