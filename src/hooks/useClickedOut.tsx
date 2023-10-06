import { RefObject, useEffect } from "react";

export const useClickedOut = (ref: RefObject<HTMLElement>, cb: () => void) => {
	useEffect(() => {
		const handleClick = (e: any) => {
			if (!ref.current?.contains(e.target)) {
				cb();
			}
		};

		window.addEventListener("click", handleClick);

		return () => window.removeEventListener("click", handleClick);
	}, []);
};
