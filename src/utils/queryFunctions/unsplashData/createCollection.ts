import { accessKey } from "./key/accessKey";

export const createCollection = async ({ queryKey }: any) => {
	const [_, accessToken, newCollection] = queryKey;
	try {
		const params = new URLSearchParams({
			title: newCollection.title,
			description: newCollection.description,
			private: newCollection.private,
			client_id: accessKey,
		});
		// const url = `https://api.unsplash.com/collections/${newCollection.title}/${newCollection.description}/${newCollection.private}&client_id=${accessKey}`;
		const url = `https://api.unsplash.com/collections?${params}`;
		const options = {
			method: "POST",
			header: {
				Authorization: `Bearer ${accessToken}`,
			},
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
