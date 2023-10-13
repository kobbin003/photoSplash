import { Outlet, useParams } from "react-router-dom";
import "./style.css";
import SearchNav from "./SearchNav/SearchNav";

type Props = {};

const Search = ({}: Props) => {
	const { searchQuery } = useParams();
	const loggedIn = false;
	return (
		<div>
			<SearchNav
				loggedIn={loggedIn}
				searchQuery={searchQuery || ""}
			/>
			<h1>{searchQuery}</h1>
			<Outlet />
		</div>
	);
};

export default Search;
