//* set {queryKey} type as "any".
export const getAuthToken = async ({ queryKey }: any) => {
	const [code, ..._] = queryKey.reverse();
	// console.log("getAuthToken", code);
	try {
		const redirect_uri = "http://localhost:5173/callback";
		const accessKey = import.meta.env.VITE_ACCESS_KEY;
		const secretKey = import.meta.env.VITE_SECRET_KEY;

		const searchparams = new URLSearchParams({
			client_id: accessKey,
			client_secret: secretKey,
			redirect_uri,
			code,
			grant_type: "authorization_code",
		});
		if (code) {
			const url = `https://unsplash.com/oauth/token?${searchparams}`;
			const response = await fetch(url);
			if (!response.ok) {
				const unsplashError = await response.json();
				throw unsplashError;
			}
			const tokenData = await response.json();
			return tokenData;
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

export type AuthToken = {
	access_token: string;
	//* access do not expire.
	refresh_token: string;
	token_type: "bearer";
	scope: string;
	created_at: number;
};
