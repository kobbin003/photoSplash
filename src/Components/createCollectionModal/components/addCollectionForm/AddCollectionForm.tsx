import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./style.css";
import { usePhotoStore } from "../../../../store/store";
import { useQuery } from "@tanstack/react-query";
import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { createCollection } from "../../../../utils/queryFunctions/unsplashData/createCollection";

type Props = {};

const AddCollectionForm = ({}: Props) => {
	const { setShowCollectionModal, accessToken } = usePhotoStore();

	const [formData, setFormData] = useState<{
		title: string;
		description: string;
		private: boolean;
	}>({
		title: "",
		description: "",
		private: false,
	});

	const [allowFetch, setAllowFetch] = useState(false);

	const { data, error, isFetching } = useQuery<{ msg: string }, ErrorUnsplash>(
		["createCollection", accessToken, formData],
		createCollection,
		{ enabled: allowFetch }
	);

	console.log("createCollection data", data, error, isFetching);

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
		// setFormData(form)
		console.log("formData!", formData);
		setAllowFetch(true);
	};

	const handleClickCancel = () => {
		setShowCollectionModal({
			show: false,
			img: { url: "", collectionIds: [], id: "" },
		});
	};

	if (data?.msg) {
		setTimeout(() => {
			setShowCollectionModal({
				show: false,
				img: { url: "", collectionIds: [], id: "" },
			});
		}, 1000);
	}

	useEffect(() => {
		setFormData({
			title: "",
			description: "",
			private: false,
		});
	}, []);

	return (
		<div id="allcollection-container">
			{data?.msg && <p id="collection-alert">Collection created!</p>}
			{isFetching && <p id="collection-alert">Loading...</p>}
			<h2>Create new collection</h2>
			<form
				onSubmit={handleSubmit}
				id="collection-form"
			>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="title"
					value={formData["title"]}
					onChange={handleOnChange}
					maxLength={60}
				/>
				<label htmlFor="description">Description(optional)</label>
				<textarea
					id="description"
					name="description"
					rows={4}
					maxLength={250}
					value={formData["description"]}
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
