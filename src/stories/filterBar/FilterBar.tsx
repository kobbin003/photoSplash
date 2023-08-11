import { FC, MouseEvent, ReactNode, useEffect, useState } from "react";
import "./filterBar.css";
import { Button } from "../button/Button";
interface FilterBarArgs {
	topics: string[];
	// children?: ReactNode;
}

const FilterBar: FC<FilterBarArgs> = ({ topics }) => {
	const [currentTopic, setCurrentTopic] = useState<string>("Editorial");
	const [showLeftScrollArrow, setShowLeftScrollArrow] = useState(false);
	const handleClickTopic = (e: MouseEvent<HTMLButtonElement>) => {
		setCurrentTopic(e.currentTarget.innerText);
	};
	const handleScroll = (e: MouseEvent<HTMLDivElement>) => {
		console.log("sccroll event", e.currentTarget.scrollLeft);
		const scrollableContentScrolledBy = e.currentTarget.scrollLeft;
		if (scrollableContentScrolledBy > 30) {
			setShowLeftScrollArrow(true);
		} else {
			setShowLeftScrollArrow(false);
		}
	};
	useEffect(() => {
		setCurrentTopic("Editorial");
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

			<div
				className="arrowContainer arrowContainer__left"
				style={{ display: showLeftScrollArrow ? "flex" : "none" }}
			>
				<img
					src="/src/stories/assets/filterBar/leftArrow.svg"
					alt="go-left"
				/>
			</div>
			<div
				id="scrollableContent"
				onScroll={handleScroll}
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

			<div className="arrowContainer arrowContainer__right">
				<img
					src="/src/stories/assets/filterBar/rightArrow.svg"
					alt="go-right"
				/>
			</div>
		</div>
	);
};

export default FilterBar;
