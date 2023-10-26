import { Link, useLocation, useParams } from "react-router-dom";
import "./style.css";
import CollectionPageGallery from "./CollectionPageGallery";
import { useQuery } from "@tanstack/react-query";
import { CollectionById } from "../../../../utils/queryFunctions/unsplashData/type/CollectionById";
import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import { getCollectionById } from "../../../../utils/queryFunctions/unsplashData/getCollectionById";

type Props = {};

const CollectionPage = ({}: Props) => {
	const { collectionId } = useParams();

	const { pathname } = useLocation();

	console.log("collection-params", collectionId);
	const { data } = useQuery<CollectionById, ErrorUnsplash>(
		["collectionDetail", collectionId],
		getCollectionById,
		{
			keepPreviousData: true,
			useErrorBoundary: false,
			// enabled: limitExceeded ? false : gotAllCollections ? false : true, // pause it if limitExceeded
		}
	);
	// console.log("toal photo count", data?.total_photos);
	const profileLink = pathname.includes("me")
		? `/me/profile/${data?.user.username}`
		: `/profile/${data?.user.username}`;
	return (
		<div id="collectionPage-container">
			<div id="collectionPage-header">
				<h1>{data?.title}</h1>
				<div id="collectionPage-userprofile">
					<Link to={profileLink}>
						<img
							src={data?.user.profile_image.medium}
							alt=""
						/>
						<p>{data?.user.name}</p>
					</Link>
				</div>
				<p>{data?.total_photos || 0} photos</p>
			</div>
			{collectionId && (
				<CollectionPageGallery
					collectionId={collectionId}
					collectionPhotoCount={data?.total_photos || 0}
				/>
			)}
		</div>
	);
};

export default CollectionPage;
