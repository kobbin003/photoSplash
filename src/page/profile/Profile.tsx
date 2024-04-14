import { Outlet, useLocation, useParams } from "react-router-dom";
import "./style.css";
import ProfileUserInfo from "./profileUserInfo/ProfileUserInfo";
import ProfileUserPhotoNav from "./profileUserPhotoNav/profileUserPhotoNav";
import { usePhotoStore } from "../../store/store";
import { useQuery } from "@tanstack/react-query";
import { UsersProfile } from "../../utils/queryFunctions/unsplashData/type/UsersProfile";
import { ErrorUnsplash } from "../../utils/queryFunctions/unsplashData/getEditorialPhotos";
import getUserProfile from "../../utils/queryFunctions/unsplashData/getUserProfile";

const Profile = () => {
	const { accessToken, currentUserProfile } = usePhotoStore();

	const { userName } = useParams();
	const { pathname } = useLocation();

	const loggedIn = pathname.split("/").includes("me");

	const userProfileSlug = `users/${
		userName ? userName : currentUserProfile?.username
	}`;
	console.log("userProfileSlug", userProfileSlug);
	const { data } = useQuery<UsersProfile, ErrorUnsplash>(
		["userProfile", userProfileSlug, accessToken],
		getUserProfile,
		{
			keepPreviousData: true,
			enabled: true,
			// enabled: accessToken ? true : false,
		}
	);
	// TODO: these two shouldn't be empty
	console.log("accessToken", accessToken);
	console.log("PRofile", data, accessToken);
	return (
		<div id="profileContainer">
			<ProfileUserInfo data={data} userName={userName} />
			<ProfileUserPhotoNav
				photosCount={data?.total_photos || 0}
				likesCount={data?.total_likes || 0}
				collectionsCount={data?.total_collections || 0}
				loggedIn={loggedIn}
			/>
			<Outlet
				context={[
					userName,
					data?.total_photos,
					data?.total_likes,
					data?.total_collections,
				]}
			/>
		</div>
	);
};

export default Profile;
