import { useEffect, useState } from "react";
import { UserCollection } from "../../../../utils/queryFunctions/unsplashData/type/UserCollections";
import "./style.css";
import { usePhotoStore } from "../../../../store/store";
import { useQuery } from "@tanstack/react-query";
import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { addRemovePhotoInCollection } from "../../../../utils/queryFunctions/unsplashData/addRemovePhotoInCollection";
// import { useQuery } from "@tanstack/react-query";
// import { getCollectionPhotos } from "../../../../utils/queryFunctions/unsplashData/getCollectionPhotos";
// import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getPhotoStats";
// import { CollectionPhotos } from "../../../../utils/queryFunctions/unsplashData/type/CollectionPhotos";
type Props = { photoUrl: string; coll: UserCollection };

const CollectionList = ({ photoUrl, coll }: Props) => {
	const [added, setAdded] = useState(false);
	const [hover, setHover] = useState(false);
	const [method, setMethod] = useState("");
	const {
		showCollectionModal: {
			img: { collectionIds, id },
		},
		accessToken,
	} = usePhotoStore();

	/**set added to true if this collection's id is in the photos collectionIds list */
	if (collectionIds.length > 0) {
		collectionIds.map((collId) => {
			console.log("no", collId, coll.id);
			if (collId == coll.id) {
				console.log("yes", collId, coll.id);
				setAdded(true);
			}
		});
	}

	const { data } = useQuery<{ msg: string | "PhotoAdded" }, ErrorUnsplash>(
		["addRemovePhotoInCollection", coll.id, id, method, accessToken],
		addRemovePhotoInCollection,
		{
			enabled: method == "POST" || method == "DELETE",
		}
	);

	const handleClick = () => {
		console.log("add-remove collectionphoto");
		// if added, delete
		if (added) {
			setMethod("DELETE");
		} else {
			setMethod("POST");
		}
		// else, add
		setAdded((prev) => !prev);
	};

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		setHover(false);
	};

	if (data) {
		console.log("data-add-collection", data);
	}
	useEffect(() => {
		setMethod("");
	}, [hover]);
	return (
		<div
			id="collection-list__item"
			style={{
				backgroundImage: `url(${photoUrl})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
			className={added ? "addedOnCollection" : "notAddedOnCollection"}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div>
				<div>{coll.total_photos} photos</div>
				<div>
					<b>{coll.title}</b>
				</div>
			</div>
			<div>
				<button onClick={handleClick}>
					{added ? (
						<img
							src="/src/assets/minus.svg"
							alt=""
						/>
					) : (
						<img
							src="/src/assets/plus.svg"
							alt=""
						/>
					)}
					{added && !hover && <img src="/src/assets/tick.svg" />}
				</button>
			</div>
		</div>
	);
};

export default CollectionList;
