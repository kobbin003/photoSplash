import { accessKey } from "./key/accessKey";
import { CurrentUserProfile } from "./type/CurrentUserProfile";
import { UsersProfile } from "./type/UsersProfile";

const getUserProfile = async ({ queryKey }: any) => {
	const [_, userProfilePathEnd, accessToken] = queryKey;

	try {
		const option = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};
		const url = `https://api.unsplash.com/${userProfilePathEnd}?client_id=${accessKey}`;
		const response = await fetch(url, option);
		// if (!response.ok) {
		// 	const unsplashError = await response.json();
		// 	return unsplashError;
		// }
		const data: UsersProfile = await response.json();
		return data;
	} catch (error) {
		//!!! there is difference between these two returns
		//!!! only returning error, gives error on useQuery
		//!!! find out why????
		// return error;
		return Promise.reject(error);
	}
};
export default getUserProfile;
