export const authorise = () => {
	const accessKey = import.meta.env.VITE_ACCESS_KEY;
	const redirect_uri = "http://localhost:5173/callback";

	// const scope = `public read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;
	const scope = `public read_photos write_photos write_likes write_followers read_collections write_collections write_user read_user`;
	const searchparams = new URLSearchParams({
		client_id: accessKey,
		redirect_uri,
		response_type: "code",
		scope,
	});
	return `https://unsplash.com/oauth/authorize?${searchparams}`;
};
