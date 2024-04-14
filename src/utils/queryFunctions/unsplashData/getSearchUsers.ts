import { accessKey } from "./key/accessKey";
import { SearchUsers } from "./type/SearchUsers";

export const getSearchUsers = async ({ queryKey }: any) => {
	const [_, query, page, perPage] = queryKey;
	try {
		const response = await fetch(
			`https://api.unsplash.com/search/users/?client_id=${accessKey}&query=${query}&page=${page}&per_page=${perPage}`
		);
		if (!response.ok) {
			const unsplashError = await response.json();
			throw unsplashError;
		}
		const remainingLimit = response.headers.get("X-Ratelimit-Remaining");
		const users: SearchUsers = await response.json();
		return { users: users.results, remainingLimit, usersCount: users.total };
	} catch (error) {
		throw error;
	}
};
