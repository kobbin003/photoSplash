import { Dispatch, MouseEvent, SetStateAction } from "react";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { UserCollections } from "../../../../utils/queryFunctions/unsplashData/type/UserCollections";
import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { getUserCollections } from "../../../../utils/queryFunctions/unsplashData/getUserCollections";
import { usePhotoStore } from "../../../../store/store";
import CollectionList from "./CollectionList";

type Props = {
	setShowForm: Dispatch<SetStateAction<boolean>>;
	// photoUrl: string;
};

const AddCollection = ({ setShowForm }: Props) => {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowForm(true);
	};

	const {
		currentUserProfile,
		showCollectionModal: {
			img: { url },
		},
	} = usePhotoStore();

	const page = 1;

	const perPage = currentUserProfile?.total_collections;

	const userName = currentUserProfile?.username;

	const { isFetching, data } = useQuery<
		{ collections: UserCollections; remainingLimit: string | null },
		ErrorUnsplash
	>(
		["collectionModalcollections", page, perPage, userName],
		getUserCollections,
		{
			keepPreviousData: true,
			useErrorBoundary: false,
			enabled: true, // pause it if limitExceeded
		}
	);

	return (
		<div id="allcollection-container">
			<h2>Add to Collection</h2>
			<button
				onClick={handleClick}
				className="collection-button"
			>
				Create a new Collection
			</button>
			<div id="collection-list__container">
				{isFetching ? (
					<p>Loading...</p>
				) : (
					data &&
					data.collections &&
					data?.collections.map((coll) => (
						<CollectionList
							key={coll.id}
							photoUrl={url}
							coll={coll}
						/>
					))
				)}
				{/* {data &&
					data.collections &&
					data?.collections.map((coll) => (
						<CollectionList
							key={coll.id}
							photoUrl={photoUrl}
							coll={coll}
						/>
					))}

				{data &&
					data.collections &&
					data?.collections.map((coll) => (
						<CollectionList
							key={coll.id}
							photoUrl={photoUrl}
							coll={coll}
						/>
					))}
				{data &&
					data.collections &&
					data?.collections.map((coll) => (
						<CollectionList
							key={coll.id}
							photoUrl={photoUrl}
							coll={coll}
						/>
					))}
				{data &&
					data.collections &&
					data?.collections.map((coll) => (
						<CollectionList
							key={coll.id}
							photoUrl={photoUrl}
							coll={coll}
						/>
					))}
				{data &&
					data.collections &&
					data?.collections.map((coll) => (
						<CollectionList
							key={coll.id}
							photoUrl={photoUrl}
							coll={coll}
						/>
					))} */}
			</div>
		</div>
	);
};

export default AddCollection;
