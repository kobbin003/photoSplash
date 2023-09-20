import { accessKey } from "./key/accessKey";
import { UserUploadedPhotos } from "./type/UserUploadedPhotos";

export const getUserUploadedPhotos = async ({ queryKey }: any) => {
	const [_, page, username] = queryKey;
	try {
		const url = `https://api.unsplash.com/users/${username}/photos?client_id=${accessKey}&page=${page}&per_page=2`;
		const response = await fetch(url);
		if (!response.ok) {
			const unsplashErrorData = await response.json();
			throw unsplashErrorData;
		}
		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");

		const photos: UserUploadedPhotos = await response.json();
		// console.log("uploads", photos);
		return { photos, remainingLimit };
	} catch (error) {
		throw error;
	}
};
