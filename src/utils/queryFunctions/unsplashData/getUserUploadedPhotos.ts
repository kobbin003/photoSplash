import { accessKey } from "./key/accessKey";
import { UserUploadedPhotos } from "./type/UserUploadedPhotos";

export const getUserUploadedPhotos = async ({ queryKey }: any) => {
	const [_, page, perPage, username] = queryKey;
	try {
		const url = `https://api.unsplash.com/users/${username}/photos?client_id=${accessKey}&page=${page}&per_page=${perPage}`;
		const response = await fetch(url);
		if (!response.ok) {
			const unsplashErrorData = await response.json();
			throw unsplashErrorData;
		}
		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");

		const photos: UserUploadedPhotos = await response.json();
		// console.log("uploads", photos, remainingLimit, page);
		return { photos, remainingLimit };
	} catch (error) {
		throw error;
	}
};
