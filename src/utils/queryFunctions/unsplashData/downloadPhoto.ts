import { accessKey } from "./key/accessKey";

export const downloadPhoto = async ({ queryKey }: any) => {
	const [_, photoId, accessToken] = queryKey;

	const url = `https://api.unsplash.com/photos/${photoId}/download?client_id=${accessKey}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			const unSplashError = await response.json();
			throw unSplashError;
		}
		const data = response.json();
		return data;
	} catch (error) {}
};
