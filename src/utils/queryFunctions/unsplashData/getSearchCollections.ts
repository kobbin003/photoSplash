import { accessKey } from "./key/accessKey";
import { SearchCollections } from "./type/SearchCollections";

export const getSearchCollections = async ({ queryKey }: any) => {
	const [_, query, page, perPage] = queryKey;
	try {
		const response = await fetch(
			`https://api.unsplash.com/search/collections/?client_id=${accessKey}&query=${query}&page=${page}&per_page=${perPage}`
		);
		if (!response.ok) {
			const unsplashError = await response.json();
			throw unsplashError;
		}
		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");
		const collections: SearchCollections = await response.json();
		return {
			collections: collections.results,
			remainingLimit,
			collectionsCount: collections.total,
		};
	} catch (error) {
		throw error;
	}
};
