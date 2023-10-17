import { Link, useLocation } from "react-router-dom";
import { SearchUser } from "../../../../utils/queryFunctions/unsplashData/type/SearchUsers";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { UserUploadedPhotos } from "../../../../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";
import { ErrorUnsplash } from "../../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { getUserUploadedPhotos } from "../../../../utils/queryFunctions/unsplashData/getUserUploadedPhotos";

interface Props {
	data: SearchUser;
}

const UserCard = ({ data }: Props) => {
	const { pathname } = useLocation();
	const page = 1;
	const perpage = 3;
	const link = pathname.includes("me")
		? `/me/profile/${data.username}`
		: `/profile/${data.username}`;

	const { data: uploadedPhotos, isFetching } = useQuery<
		{ photos: UserUploadedPhotos; remainingLimit: string | null },
		ErrorUnsplash
	>(["usercard-photos", page, perpage, data.username], getUserUploadedPhotos);

	console.log("usercard", uploadedPhotos);

	return (
		<Link
			to={link}
			id="usercard-container"
		>
			<div id="usercard-head">
				<div>
					<img
						src={data.profile_image.large}
						alt="profilepic"
					/>
				</div>
				<div>
					<b>
						{data.first_name} {data.last_name}
					</b>
					<p>{data.username}</p>
				</div>
			</div>
			<div id="usercard-pics">
				{isFetching && <div>Loading...</div>}
				{uploadedPhotos && (
					<>
						{uploadedPhotos.photos.map((photo) => (
							<div>
								<img
									src={photo.urls.small}
									// height={30}
									// width={30}
								/>
							</div>
						))}
					</>
				)}
			</div>
			<div id="usercard-button">
				<button>view profile</button>
			</div>
		</Link>
	);
};

export default UserCard;
