import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";
// import App from "./App.tsx";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			{/* <App /> */}
		</QueryClientProvider>
	</React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
// 	<React.StrictMode>
// 		<ErrorBoundary FallbackComponent={ErrorFallback}>
// 			<App />
// 		</ErrorBoundary>
// 	</React.StrictMode>
// );
