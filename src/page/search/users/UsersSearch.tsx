import { useEffect, useState } from "react";
import "./style.css";
import { useOutletContext } from "react-router-dom";
import { useSearchUsersStore } from "../../../store/searchUserStore";
import { useQuery } from "@tanstack/react-query";
import { SearchUser } from "../../../utils/queryFunctions/unsplashData/type/SearchUsers";
import { ErrorUnsplash } from "../../../utils/queryFunctions/unsplashData/getPhotoStats";
import { getSearchUsers } from "../../../utils/queryFunctions/unsplashData/getSearchUsers";
import UsersGallery from "./UserGallery";

type Props = {};

const UsersSearch = ({}: Props) => {
	const perPage = 8;

	const [page, setPage] = useState<number>(1);

	const [limitExceeded, setLimitExceeded] = useState(false);

	const [gotAllUsers, setGotAllUsers] = useState(false);

	const [query]: string[] = useOutletContext();

	const { allSearchUsers, setAllSearchUsers, setAllSearchUsersPush } =
		useSearchUsersStore();

	const { isLoading, data, error, isError } = useQuery<
		{
			users: SearchUser[];
			remainingLimit: string | null;
			usersCount: number;
		},
		ErrorUnsplash
	>(["searchedUsers", query, page, perPage], getSearchUsers, {
		keepPreviousData: true,
		useErrorBoundary: false,
		enabled: limitExceeded ? false : gotAllUsers ? false : true, // pause it if limitExceeded
	});

	useEffect(() => {
		console.log("collections-remaining-limit", data);
	}, [data]);

	/** disable fetch if all collections are fetched */
	useEffect(() => {
		if (data?.usersCount && data?.usersCount == allSearchUsers?.length) {
			setGotAllUsers(true);
			// console.log("yes-allUsers", collectionCount, allUsers);
		}
		// console.log("no-allUsers", collectionCount, allUsers);
	}, [allSearchUsers]);

	/** start with a clean slate or else there will be duplication of data */
	useEffect(() => {
		setAllSearchUsers(null);
	}, []);
	console.log(data, allSearchUsers);
	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>Error:{error.errors}</p>;

	return (
		<UsersGallery
			data={data}
			isError={isError}
			isLoading={isLoading}
			perPage={perPage}
			setPage={setPage}
			limitExceeded={limitExceeded}
			setLimitExceeded={setLimitExceeded}
			gotAllUsers={gotAllUsers}
			allUsers={allSearchUsers}
			setAllUsersPush={setAllSearchUsersPush}
		/>
	);
};

export default UsersSearch;
