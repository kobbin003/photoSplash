import { RefObject, useEffect } from "react";

export const useClickedOutsideId = (ids: string[], callback: () => void) => {
	ids.map((id) => {
		console.log(`${id}`, document.getElementById(`${id}`));
	});
	useEffect(() => {
		const handleClick = (e: any) => {
			const clickedOutside = ids.every((id) => {
				const el = document.getElementById(`${id}`);
				if (e.target !== el) {
					return true;
				} else {
					return false;
				}
			});
			console.log(clickedOutside);
			if (clickedOutside) {
				callback();
			}
		};
		const modalContainer = document.getElementById("modalContainer");
		modalContainer && modalContainer.addEventListener("click", handleClick);
		if (modalContainer) {
			return () => modalContainer.removeEventListener("click", handleClick);
		}
	}, []);
};
export const useClickedOutsideRef = (
	refs: RefObject<HTMLElement>[],
	callback: () => void
) => {
	useEffect(() => {
		const handleClick = (e: any) => {
			const clickedOutside = refs.every(
				(ref) => ref.current && ref.current !== e.target
			);
			if (clickedOutside) {
				callback();
			}
		};
		const modalContainer = document.getElementById("modalContainer");
		modalContainer && modalContainer.addEventListener("click", handleClick);
		if (modalContainer) {
			return () => modalContainer.removeEventListener("click", handleClick);
		}
	}, []);
};
