import { accessKey } from "./key/accessKey";
import { UserLikeedPhotos } from "./type/UserLikedPhotos";

export const getUserLikedPhotos = async ({ queryKey }: any) => {
	const [_, page, username] = queryKey;
	try {
		const url = `https://api.unsplash.com/users/${username}/likes?client_id=${accessKey}&page=${page}&per_page=2`;
		const response = await fetch(url);
		if (!response.ok) {
			const unsplashErrorData = await response.json();
			throw unsplashErrorData;
		}
		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");

		const photos: UserLikeedPhotos = await response.json();
		// console.log("fn", photos);
		return { photos, remainingLimit };
	} catch (error) {
		throw error;
	}
};
