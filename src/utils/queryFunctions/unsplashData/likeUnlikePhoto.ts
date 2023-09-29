import { accessKey } from "./key/accessKey";

export const likeUnlikePhoto = async ({ queryKey }: any) => {
	const [_, photoId, method, accessToken] = queryKey;
	const url = `https://api.unsplash.com/photos/${photoId}/like?client_id=${accessKey}`;
	try {
		const option = {
			method,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
		const response = await fetch(url, option);
		if (!response.ok) {
			const unSplashError = await response.json();
			throw unSplashError;
		}
		return { msg: "SUCCESS" };
	} catch (error) {
		throw error;
	}
};
