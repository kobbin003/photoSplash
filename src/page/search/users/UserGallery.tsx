import React, { Dispatch, useEffect } from "react";
import { conditionToShowErrorMessage } from "../../../utils/conditionToShowErrorMessage";
import arraysHaveSameContent from "../../../utils/arraysHaveSameContent";
// import CollectionCard from "./CollectionCard/CollectionCard";
import UserCard from "./usercard/UserCard";
import {
	SearchUser,
	SearchUsers,
} from "../../../utils/queryFunctions/unsplashData/type/SearchUsers";

type CollectionGalleryProp = {
	data: {
		users: SearchUser[];
		remainingLimit: string | null;
		usersCount?: number;
	};
	isLoading: boolean;
	isError: boolean;
	perPage: number;
	gotAllUsers?: boolean;
	setPage: Dispatch<React.SetStateAction<number>>;
	limitExceeded: boolean;
	setLimitExceeded: Dispatch<React.SetStateAction<boolean>>;
	allUsers: SearchUsers["results"] | null;
	setAllUsersPush: (fn: (prevData: SearchUser[]) => SearchUser[]) => void;
};

const UsersGallery = ({
	data,
	isLoading,
	isError,
	perPage,
	gotAllUsers,
	limitExceeded,
	setPage,
	setLimitExceeded,
	allUsers,
	setAllUsersPush,
}: CollectionGalleryProp) => {
	useEffect(() => {
		if (
			data?.remainingLimit &&
			conditionToShowErrorMessage(data?.remainingLimit)
		) {
			setLimitExceeded(true);
		}

		if (!isLoading && !isError && data) {
			setAllUsersPush((prev) => {
				//useEffect runs twice, allUsers gets pushed twice with
				// the same initially-fetched data
				// return [...prev, ...data.collections];
				if (!arraysHaveSameContent(prev, data.users)) {
					// console.log("not");
					return [...prev, ...data.users];
				} else {
					// console.log("yes");
					return [...prev];
				}
			});
		}
	}, [data]);

	/** scroll event listener */
	useEffect(() => {
		// reset pageIncremented state
		// setPageIncremented(false);

		// scroll listener
		const scrollListener = () => {
			// Get the viewport height
			const viewportHeight = window.innerHeight;

			// Get the vertical scroll position
			const scrollPosition = window.scrollY;

			// Get the total height of the document
			const totalHeight = document.documentElement.scrollHeight;

			const scrollThreshold = 200;

			if (viewportHeight + scrollPosition > totalHeight - scrollThreshold) {
				// console.log("inside scroll-out", pageIncremented, gotAllUsers);
				if (!gotAllUsers) {
					// console.log("inside scroll-in", pageIncremented, gotAllUsers);
					//* setPage only if did not got all photos,
					//* otherwise, even though fetch will be disabled, the page will rerender
					setPage((prev) => prev + perPage);
				}
			}
		};
		window.addEventListener("scroll", scrollListener);

		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, [gotAllUsers]);

	return (
		<div id="userSearch_container">
			<>
				{limitExceeded && (
					<p
						style={{
							position: "fixed",
							top: `${window.innerHeight - 100}px`,
							width: "100vw",
							height: "100px",
							backgroundColor: "red",
							zIndex: "10",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						It is a demo project: The limit has exceeded
					</p>
				)}
			</>
			{allUsers
				? allUsers.map((user) => {
						return (
							// <CollectionCard
							// 	data={coll}
							// 	key={coll.id}
							// />
							<UserCard
								key={user.id}
								data={user}
							/>
							// <></>
						);
				  })
				: data.users.map((user) => {
						return (
							// <CollectionCard
							// 	data={coll}
							// 	key={coll.id}
							// />
							<UserCard
								key={user.id}
								data={user}
							/>
							// <></>
						);
				  })}
		</div>
	);
};

export default UsersGallery;
