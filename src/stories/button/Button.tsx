import { Children, MouseEvent, ReactNode } from "react";
import "./button.css";

interface ButtonProps {
	mode: "only-icons" | "icons-with-label" | "only-label";
	label?: string;
	imgUrl?: string;
	height?: number;
	width?: number;
	handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	children?: ReactNode;
}

export const Button = ({
	mode,
	label,
	imgUrl,
	height,
	width,
	handleClick,
	children,
	...props
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={`button--${mode}`}
			style={{ height: `${height}px`, width: `${width}px` }}
			onClick={handleClick}
			{...props}
		>
			{imgUrl && (
				<img
					src={imgUrl}
					className="svg-image"
				/>
			)}
			{label && <span>{label}</span>}
			{children}
		</button>
	);
};
