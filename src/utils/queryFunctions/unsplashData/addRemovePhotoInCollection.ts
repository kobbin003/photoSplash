import { accessKey } from "./key/accessKey";

export const addRemovePhotoInCollection = async ({ queryKey }: any) => {
	const [_, collectionId, photoId, method, accessToken] = queryKey;
	try {
		const params = new URLSearchParams({
			collection_id: collectionId,
			photo_id: photoId,
			client_id: accessKey,
		});
		const action = method == "POST" ? "add" : "remove";
		const url = `https://api.unsplash.com/collections/${collectionId}/${action}?${params}`;

		const options = {
			method,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};

		const response = await fetch(url, options);

		if (!response.ok) {
			const unsplashError = await response.json();
			console.log("unsplashError", unsplashError);
			throw unsplashError;
		}
		// const data = await response.json();
		if (method == "POST") {
			return { msg: "photoAdded" };
		} else {
			return { msg: "photoDeleted" };
		}
	} catch (error) {
		throw error;
	}
};
