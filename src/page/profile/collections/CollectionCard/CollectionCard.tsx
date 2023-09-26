import { FC } from "react";
import { UserCollection } from "../../../../utils/queryFunctions/unsplashData/type/UserCollections";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

interface CollectioProp {
	data: UserCollection;
}

const CollectionCard: FC<CollectioProp> = ({ data }) => {
	const { pathname } = useLocation();
	const splitPathname = pathname.split("/");
	const userProfilePathArray = splitPathname.splice(
		0,
		splitPathname.length - 1
	);
	const userProfilePath = userProfilePathArray.join("/");
	return (
		<div
			id={data.id.toString()}
			className="collection_card"
		>
			<Link to={`/profile/collections/${data.id}`}>
				<img
					src={data.cover_photo.urls.regular}
					alt="collection_cover_photo"
				/>
			</Link>
			<div>
				<Link to={`/profile/collections/${data.id}`}>
					<b>{data.title}</b>
				</Link>
				<div>
					<p>{data.total_photos} photos</p>
					&nbsp;
					<span>.</span>
					&nbsp;
					<p>
						Curated by{" "}
						<Link
							to={userProfilePath}
							state={{ show: "Photos" }}
						>
							{data.user.name}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CollectionCard;
