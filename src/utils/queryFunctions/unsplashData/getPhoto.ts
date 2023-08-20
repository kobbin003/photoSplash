import { accessKey } from "./key/accessKey";

export type ErrorUnsplash = {
	errors: string[];
};
export const getPhoto = async ({ queryKey }: any) => {
	const [_, id] = queryKey;
	const url = `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			const unsplashError = await response.json();
			// return unsplashError;
			return Promise.reject(unsplashError);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("error:", error);
		return Promise.reject(error);
	}
};
