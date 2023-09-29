import { accessKey } from "./key/accessKey";
import { CollectionPhotos } from "./type/CollectionPhotos";

export const getCollectionPhotos = async ({ queryKey }: any) => {
	const [_, page, perPage, collectionId] = queryKey;

	try {
		const url = `https://api.unsplash.com/collections/${collectionId}/photos?client_id=${accessKey}&page=${page}&per_page=${perPage}`;

		const response = await fetch(url);

		if (!response.ok) {
			const unsplashError = await response.json();
			console.log("unsplashError", unsplashError);
			throw unsplashError;
		}

		const photos: CollectionPhotos = await response.json();

		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");

		return { photos, remainingLimit };
	} catch (error) {
		return Promise.reject(error);
		// throw error;
	}
};
