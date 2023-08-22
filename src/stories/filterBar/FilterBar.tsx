import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import "./filterBar.css";
interface FilterBarArgs {
	topics: string[];
	// children?: ReactNode;
}

const FilterBar: FC<FilterBarArgs> = ({ topics }) => {
	const [currentTopic, setCurrentTopic] = useState<string>("Editorial");
	const [showLeftScrollArrow, setShowLeftScrollArrow] = useState(false);
	const [showRightScrollArrow, setShowRightScrollArrow] = useState(true);
	const scrollableContentRef = useRef<HTMLDivElement>(null);
	const handleClickTopic = (e: MouseEvent<HTMLButtonElement>) => {
		setCurrentTopic(e.currentTarget.innerText);
	};
	const handleScroll = (e: MouseEvent<HTMLDivElement>) => {
		// console.log("sccroll event", e.currentTarget.scrollLeft);
		const scrollableContentScrolledBy = e.currentTarget.scrollLeft;
		if (scrollableContentScrolledBy > 30) {
			setShowLeftScrollArrow(true);
		} else {
			setShowLeftScrollArrow(false);
		}
	};
	const handleScrollLeft = () => {
		console.log("scroll left click");
		const el = scrollableContentRef.current as HTMLElement;
		el.scrollLeft -= 300;
	};
	const handleScrollRight = () => {
		const el = scrollableContentRef.current as HTMLElement;
		el.scrollLeft += 300;
	};
	useEffect(() => {
		setCurrentTopic("Editorial");
	}, []);
	useEffect(() => {
		const el = scrollableContentRef.current as HTMLElement;
		el.addEventListener("scroll", () => {
			// console.log("scroll....", el.scrollWidth, el.scrollLeft, el.clientWidth);
			const elTotalWidth = el.scrollWidth;
			const elVisibleWidth = el.clientWidth;
			const elAmountScrolledLeft = el.scrollLeft;
			if (elVisibleWidth + elAmountScrolledLeft > elTotalWidth - 10) {
				console.log("hide right");
				setShowRightScrollArrow(false);
			}
			if (elVisibleWidth + elAmountScrolledLeft < elTotalWidth - 10) {
				console.log("show right");
				setShowRightScrollArrow(true);
			}
		});
	}, []);
	return (
		<div id="filterBar">
			<button
				style={{ paddingRight: "10px" }}
				onClick={handleClickTopic}
				// className="active"
				className={`${currentTopic == "Editorial" && "active"}`}
			>
				Editorial
			</button>

			<p id="divider"></p>

			<button
				onClick={handleScrollLeft}
				className="arrowContainer arrowContainer__left"
				style={{ display: showLeftScrollArrow ? "flex" : "none" }}
			>
				<img
					src="/src/stories/assets/filterBar/leftArrow.svg"
					alt="go-left"
				/>
			</button>
			<div
				id="scrollableContent"
				onScroll={handleScroll}
				ref={scrollableContentRef}
			>
				{topics.map((topic) => (
					<button
						key={topic}
						onClick={handleClickTopic}
						className={`${currentTopic == topic && "active"}`}
					>
						{topic}
					</button>
				))}
			</div>

			<button
				className="arrowContainer arrowContainer__right"
				onClick={handleScrollRight}
				style={{ display: showRightScrollArrow ? "flex" : "none" }}
			>
				<img
					src="/src/stories/assets/filterBar/rightArrow.svg"
					alt="go-right"
				/>
			</button>
		</div>
	);
};

export default FilterBar;
