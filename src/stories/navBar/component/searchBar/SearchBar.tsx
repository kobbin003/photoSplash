import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "./searchbar.css";
const SearchBar = () => {
	const [clearButtonVisibility, setClearButtonVisibility] = useState<
		"visible" | "hidden"
	>("hidden");
	const [searchValue, setSearchValue] = useState("");
	const searchInput = useRef<HTMLInputElement>(null);
	const [containerBackgroundColor, setContainerBackgroundColor] =
		useState("#eeeeee");
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);

		// start showing reset button after inital input.
		if (clearButtonVisibility == "hidden") {
			setClearButtonVisibility("visible");
		}
		// stop showing reset button when input is empty.
		if (e.target.value == "") {
			setClearButtonVisibility("hidden");
		}
	};
	const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
		setSearchValue("");
		setClearButtonVisibility("hidden");
		// keep focus on input even after resetting
		if (searchInput.current) {
			searchInput.current.focus();
		}
	};
	// DEBOUNCING:
	useEffect(() => {
		const timeout = setTimeout(() => {
			// setSearchValue(searchValue);
		}, 500);
		return () => clearTimeout(timeout);
	}, [searchValue]);
	return (
		<div
			id="searchbar__container"
			style={{ backgroundColor: `${containerBackgroundColor}` }}
		>
			<img
				src="/src/stories/assets/header/search/search.svg"
				height={20}
				width={20}
			/>
			<input
				id="searchbar"
				type="search"
				ref={searchInput}
				placeholder="Search high resolution unsplash images"
				onChange={handleOnChange}
				onFocus={() => {
					setContainerBackgroundColor("transparent");
				}}
				onBlur={() => {
					setContainerBackgroundColor("#eeeeee");
				}}
				value={searchValue}
			/>
			<button onClick={handleReset}>
				<img
					src="/src/stories/assets/header/search/clear.svg"
					height={20}
					width={20}
					style={{ visibility: `${clearButtonVisibility}` }}
				/>
			</button>
		</div>
	);
};

export default SearchBar;
