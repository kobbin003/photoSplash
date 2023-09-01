import NavBar from "../stories/navBar/NavBar";
import HomeGallery from "../page/homeGallery/HomeGallery";
import "../App.css";
const LoggedOutLayout = () => {
	return (
		<div className="appContainer">
			<NavBar mode="loggedOut" />
			<HomeGallery />
		</div>
	);
};
export default LoggedOutLayout;
