import { createBrowserRouter } from "react-router-dom";
import LogIn from "./page/logIn";
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
// import HomeGalleryInfinite from "./page/homeGallery/HomeGalleryInfinite";

export const router = createBrowserRouter([
	{
		path: "*",
		element: <p>404: NOT FOUND</p>,
	},

	{
		path: "/",
		element: <LoggedOutLayout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <HomeGallery />,
				// element: <HomeGalleryInfinite />,
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
				path: "/profile/collections/:collectionId",
				element: <CollectionPage />,
			},
		],
	},

	{
		path: "/me",
		element: (
			<Suspense fallback={<p>Loading...</p>}>
				<LoggedInLayout />
			</Suspense>
		),
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <HomeGallery />,
			},
			{
				path: "profile",
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
		],
	},

	{ path: "/callback", element: <LogIn /> },
]);
