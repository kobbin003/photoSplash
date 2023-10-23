import { useState } from "react";
import { UserCollection } from "../../../../utils/queryFunctions/unsplashData/type/UserCollections";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { getCollectionPhotos } from "../../../../utils/queryFunctions/unsplashData/getCollectionPhotos";
import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { CollectionPhotos } from "../../../../utils/queryFunctions/unsplashData/type/CollectionPhotos";
type Props = { photoUrl: string; coll: UserCollection };

const CollectionList = ({ photoUrl, coll }: Props) => {
	const [added, setAdded] = useState(false);
	const [hover, setHover] = useState(false);

	// const { data } = useQuery<
	// 	{ photos: CollectionPhotos; remainingLimit: string | null },
	// 	ErrorUnsplash
	// >(
	// 	["collectionmodal-collectionphotos", 1, "totalcount", coll.id],
	// 	getCollectionPhotos
	// );
	const handleClick = () => {
		setAdded((prev) => !prev);
	};
	const handleMouseEnter = () => {
		setHover(true);
	};
	const handleMouseLeave = () => {
		setHover(false);
	};
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
