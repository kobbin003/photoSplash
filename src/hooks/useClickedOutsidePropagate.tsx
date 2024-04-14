import { useEffect } from "react";

const useOutsideClickPropagate = (callback: () => void) => {
	const handleClick = () => {
		/** do stopPropagation in the click event on the clicked element. */
		callback();
	};

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);
};

export default useOutsideClickPropagate;
