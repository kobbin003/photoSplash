import { EditorialPhotosType } from "./type/EditorialPhotos";
import { accessKey } from "./key/accessKey";

export type ErrorUnsplash = {
	errors: string[];
};
/** For useInfiniteQuery */
export const getEditorialPhotosInfinite = async (page: number) => {
	//* this way of destructuring is not suitable for queries that
	//* caches the previous datas i.e has {keepPreviousData: true,}
	// const [page, ..._] = queryKey.reverse();
	try {
		const response = await fetch(
			`https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=10`
		);
		if (!response.ok) {
			const unsplashError = await response.json();
			throw unsplashError;
		}
		// console.log("limit-1", response.headers.get("X-Ratelimit-Limit"));
		// console.log("limit-2", response.headers.get("X-Ratelimit-Remaining"));
		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");
		const photos: EditorialPhotosType[] = await response.json();
		return { photos, remainingLimit };
	} catch (error) {
		console.log("fetch-error", error);
		//* this will be consumed as data
		//* BECAUSE by default as async function's return is Promise.resolve("returned item")
		// return error;
		//* use this to be consumed as catch error:
		return Promise.reject(error);
	}
};

/** For useQuery */
export const getEditorialPhotos = async ({ queryKey }: any) => {
	//* this way of destructuring is not suitable for queries that
	//* caches the previous datas i.e has {keepPreviousData: true,}
	let page = queryKey[1];
	try {
		const response = await fetch(
			`https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=2`
		);
		if (!response.ok) {
			const unsplashError = await response.json();
			throw unsplashError;
		}
		// console.log("limit-1", response.headers.get("X-Ratelimit-Limit"));
		// console.log("limit-2", response.headers.get("X-Ratelimit-Remaining"));
		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");
		const photos: EditorialPhotosType[] = await response.json();

		return { photos, remainingLimit };
	} catch (error) {
		console.log("fetch-error", error);
		//* this will be consumed as data
		//* BECAUSE by default as async function's return is Promise.resolve("returned item")
		// return error;
		//* use this to be consumed as catch error:
		return Promise.reject(error);
	}
};
