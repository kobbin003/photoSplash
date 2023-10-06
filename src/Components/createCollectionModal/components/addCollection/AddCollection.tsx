import { Dispatch, MouseEvent, SetStateAction } from "react";
import "./style.css";

type Props = {
	setShowForm: Dispatch<SetStateAction<boolean>>;
};

const AddCollection = ({ setShowForm }: Props) => {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowForm(true);
	};

	return (
		<div id="allcollection-container">
			<h2>Add to Collection</h2>
			<button
				onClick={handleClick}
				className="collection-button"
			>
				Create a new Collection
			</button>
		</div>
	);
};

export default AddCollection;
