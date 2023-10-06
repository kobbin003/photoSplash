import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";
import { usePhotoStore } from "../../../../store/store";

type Props = {};

const AddCollectionForm = ({}: Props) => {
	const { setShowCollectionModal } = usePhotoStore();
	const [formData, setFormData] = useState<{
		name: string;
		desc: string;
		private: boolean;
	}>({
		name: "",
		desc: "",
		private: false,
	});

	const handleOnChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleOnChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({ ...prev, private: e.target.checked }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(formData);
	};
	const handleClickCancel = () => {
		setShowCollectionModal({ show: false, img: { url: "" } });
	};

	return (
		<div id="allcollection-container">
			<h2>Create new collection</h2>
			<form
				onSubmit={handleSubmit}
				id="collection-form"
			>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData["name"]}
					onChange={handleOnChange}
					maxLength={60}
				/>
				<label htmlFor="desc">Description(optional)</label>
				<textarea
					id="desc"
					name="desc"
					rows={4}
					maxLength={250}
					value={formData["desc"]}
					onChange={handleOnChange}
				></textarea>
				<div id="collection-checkbox-div">
					<input
						type="checkbox"
						name="checkbox"
						id="checkbox"
						onChange={handleOnChangeCheckbox}
						checked={formData["private"]}
					/>
					<label htmlFor="checkbox">Make collection private</label>
					<img
						src="/src/assets/lock.svg"
						alt=""
					/>
				</div>
				<div id="collection-button-div">
					<button
						type="button"
						onClick={handleClickCancel}
					>
						Cancel
					</button>
					<button type="submit">Create Collection</button>
				</div>
			</form>
		</div>
	);
};

export default AddCollectionForm;
