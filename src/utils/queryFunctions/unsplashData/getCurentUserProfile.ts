import { CurrentUserProfile } from "./type/CurrentUserProfile";

const getCurrentUserProfile = async ({ queryKey }: any) => {
	const [_, accessToken] = queryKey;
	try {
		const option = {
			headers: { Authorization: `Bearer ${accessToken}` },
		};
		const url = `https://api.unsplash.com/me`;
		const response = await fetch(url, option);
		if (!response.ok) {
			const unsplashError = await response.json();
			console.log("unsplashError", unsplashError);
			throw unsplashError;
		}
		const data: CurrentUserProfile = await response.json();
		return data;
	} catch (error) {
		console.log("err....", error);
		/** errors that are thrown in an async function are automatically converted into rejected Promises */
		// throw error;

		//OR

		/** throw error & Promise.reject(error) does the same function */
		return Promise.reject(error);

		/** do not return error because, the error will be propagated as resolved promise */
		// return error
	}
};
export default getCurrentUserProfile;
