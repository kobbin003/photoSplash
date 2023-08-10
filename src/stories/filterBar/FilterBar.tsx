import { FC, MouseEvent, ReactNode, useEffect, useState } from "react";
import "./filterBar.css";
import { Button } from "../button/Button";
interface FilterBarArgs {
	topics: string[];
	// children?: ReactNode;
}

const FilterBar: FC<FilterBarArgs> = ({ topics }) => {
	const [currentTopic, setCurrentTopic] = useState<string>("Editorial");
	const handleClickTopic = (e: MouseEvent<HTMLButtonElement>) => {
		setCurrentTopic(e.currentTarget.innerText);
	};

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
			<Button
				mode="only-icons"
				imgUrl="/src/stories/assets/filterBar/leftArrow.svg"
				height={30}
			/>
			<div id="scrollableContent">
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
			<Button
				mode="only-icons"
				imgUrl="/src/stories/assets/filterBar/rightArrow.svg"
				height={30}
			/>
		</div>
	);
};

export default FilterBar;
