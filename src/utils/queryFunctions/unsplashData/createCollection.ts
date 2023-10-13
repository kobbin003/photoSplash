import { accessKey } from "./key/accessKey";

export const createCollection = async ({ queryKey }: any) => {
	const [_, accessToken, newCollection] = queryKey;
	// const url = `https://api.unsplash.com/collections?title=${newCollection.title}&description=${newCollection.description}&private=${newCollection.private}&client_id=${accessKey}`;
	try {
		const url = `https://api.unsplash.com/collections&client_id=${accessKey}`;
		const options = {
			method: "POST",
			header: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newCollection),
		};
		const response = await fetch(url, options);
		if (!response.ok) {
			const unSplashError = await response.json();
			throw unSplashError;
		}
		return { msg: "Collection created" };
		// const data = await response.json();
	} catch (error) {
		throw error;
	}
};
