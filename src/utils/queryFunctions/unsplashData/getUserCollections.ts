import { accessKey } from "./key/accessKey";
import { UserCollections } from "./type/UserCollections";

export const getUserCollections = async ({ queryKey }: any) => {
	console.log("get user collections called");
	const [_, page, perPage, username] = queryKey;
	try {
		const url = `https://api.unsplash.com/users/${username}/collections?client_id=${accessKey}&page=${page}&per_page=${perPage}`;

		const response = await fetch(url);

		if (!response.ok) {
			const unsplashError = await response.json();
			console.log("unsplashError", unsplashError);
			throw unsplashError;
		}

		const collections: UserCollections = await response.json();

		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");

		return { collections, remainingLimit };
	} catch (error) {
		return Promise.reject(error);
		// throw error;
	}
};
