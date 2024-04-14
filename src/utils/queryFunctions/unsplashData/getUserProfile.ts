import { accessKey } from "./key/accessKey";
import { UsersProfile } from "./type/UsersProfile";

const getUserProfile = async ({ queryKey }: any) => {
	const [_, userProfileSlug] = queryKey;

	try {
		const url = `https://api.unsplash.com/${userProfileSlug}?client_id=${accessKey}`;
		const response = await fetch(url);
		console.log("url: ", url, response);
		if (!response.ok) {
			const unsplashError = await response.json();
			throw unsplashError;
		}
		const data: UsersProfile = await response.json();
		return data;
	} catch (error) {
		throw error;
		// return Promise.reject(error);
	}
};
export default getUserProfile;
