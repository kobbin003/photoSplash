import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NavBarLoggedOut } from "./stories/navBar/NavBar.stories";
import NavBar from "./stories/navBar/NavBar";
import LogIn from "./page/logIn";
import ErrorBoundary from "./page/errorBoundary/ErrorBoundary";

export const router = createBrowserRouter([
	{
		path: "*",
		element: <p>404: NOT FOUND</p>,
	},
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorBoundary />,
		// errorElement: <p>ERROR APP:</p>,
		children: [
			{
				index: true,
				element: <NavBar mode="loggedOut" />,
			},
			{
				path: "me",
				element: <NavBar mode="loggedIn" />,
			},
		],
	},
	{ path: "/callback", element: <LogIn /> },
]);
