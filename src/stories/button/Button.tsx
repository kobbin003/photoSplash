import { MouseEvent, ReactNode } from "react";
import "./button.css";

interface ButtonProps {
	mode: "only-icons" | "icons-with-label" | "only-label";
	label?: string;
	imgUrl?: string;
	height?: number;
	width?: number;
	heart?: string;
	handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	children?: ReactNode;
}

export const Button = ({
	mode,
	label,
	imgUrl,
	height,
	width,
	heart,
	handleClick,
	children,
	...props
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={`button--${mode} button--${heart}`}
			style={{
				height: `${height}px`,
				width: `${width}px`,
			}}
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
