import { accessKey } from "./key/accessKey";
import { CurrentUserProfile } from "./type/CurrentUserProfile";

const getCurrentUserProfile = async ({ queryKey }: any) => {
	// const userProfilePathEnd = queryKey[1];
	const [_, accessToken] = queryKey;
	console.log(queryKey, accessToken);
	// const accessToken = localStorage.getItem("tokenUnsplash");
	console.log("hii");
	try {
		const option = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};
		const url = `https://api.unsplash.com/me?client_id=${accessKey}`;
		const response = await fetch(url, option);
		// if (!response.ok) {
		// 	const unsplashError = await response.json();
		// 	return unsplashError;
		// }
		const data: CurrentUserProfile = await response.json();
		return data;
	} catch (error) {
		//!!! there is difference between these two returns
		//!!! only returning error, gives error on useQuery
		//!!! find out why????
		// return error;
		return Promise.reject(error);
	}
};
export default getCurrentUserProfile;
