import { createBrowserRouter } from "react-router-dom";
import LoggedOutLayout from "./Layout/LoggedOutLayout";
import { Suspense, lazy } from "react";
const LoggedInLayout = lazy(() => import("./Layout/LoggedInLayout"));
import HomeGallery from "./page/homeGallery/HomeGallery";
import ErrorBoundary from "./page/errorBoundary/ErrorBoundary";
import Profile from "./page/profile/Profile";
import Photos from "./page/profile/photos/Photos";
import Stats from "./page/profile/stats/Stats";
import Likes from "./page/profile/likes/Likes";
import Collections from "./page/profile/collections/Collections";
import CollectionPage from "./page/profile/collections/collectionPage/CollectionPage";
import LogIn from "./page/logIn";
import Search from "./page/search/Search";
import PhotosSearch from "./page/search/photos/PhotosSearch";
import CollectionsSearch from "./page/search/collections/CollectionsSearch";
import UsersSearch from "./page/search/users/UsersSearch";
// import HomeGalleryInfinite from "./page/homeGallery/HomeGalleryInfinite";

const children = [
	{
		index: true,
		element: <HomeGallery />,
	},
	{
		path: "search/:searchQuery",
		element: <Search />,
		children: [
			{ path: "photos", element: <PhotosSearch /> },
			{ path: "collections", element: <CollectionsSearch /> },
			{ path: "users", element: <UsersSearch /> },
		],
	},
	{
		path: "profile/:userName",
		element: <Profile />,
		children: [
			{
				index: true,
				element: <Photos />,
			},
			{
				path: "likes",
				element: <Likes />,
			},
			{
				path: "collections",
				element: <Collections />,
			},

			{
				path: "stats",
				element: <Stats />,
			},
		],
	},
	{
		path: "profile/collections/:collectionId",
		element: <CollectionPage />,
	},
];

export const router = createBrowserRouter([
	{
		path: "*",
		element: <p>404: NOT FOUND</p>,
	},

	{
		path: "/",
		element: <LoggedOutLayout />,
		errorElement: <ErrorBoundary />,
		children,
	},

	{
		path: "/me",
		element: (
			<Suspense fallback={<p>Loading...</p>}>
				<LoggedInLayout />
			</Suspense>
		),
		errorElement: <ErrorBoundary />,
		children,
	},

	{ path: "/callback", element: <LogIn /> },
]);
