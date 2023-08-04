import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
	let error = useRouteError();
	console.error("errorBoundary", error);
	// Uncaught ReferenceError: path is not defined
	return <div>Hol Up! Wait a minute! something ain't right!</div>;
}

export default ErrorBoundary;
