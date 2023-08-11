import { Outlet } from "react-router-dom";
import "./App.css";
import PhotoGallery from "./Components/PhotoGallery";

function App() {
	return (
		<div className="appContainer">
			<Outlet />
			<PhotoGallery />
		</div>
	);
}

export default App;
