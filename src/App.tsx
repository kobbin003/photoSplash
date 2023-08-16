import { Outlet } from "react-router-dom";
import "./App.css";
import PhotoGallery from "./Components/PhotoGallery";
import ModalContainer from "./Components/ModalContainer";

function App() {
	return (
		<div className="appContainer">
			<Outlet />
			<ModalContainer />
			<PhotoGallery />
		</div>
	);
}

export default App;
