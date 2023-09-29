import { accessKey } from "./key/accessKey";
import { CollectionById } from "./type/CollectionById";

export const getCollectionById = async ({ queryKey }: any) => {
	const [_, collectionId] = queryKey;
	try {
		const url = `https://api.unsplash.com/collections/${collectionId}?client_id=${accessKey}`;

		const response = await fetch(url);

		if (!response.ok) {
			const unsplashError = await response.json();
			console.log("unsplashError", unsplashError);
			throw unsplashError;
		}

		const collection: CollectionById = await response.json();

		return collection;
	} catch (error) {
		return Promise.reject(error);
		// throw error;
	}
};
