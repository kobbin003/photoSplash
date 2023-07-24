import "./button.css";

interface ButtonProps {
	mode: "only-icons" | "icons-with-label" | "only-label";
	label?: string;
	imgUrl?: string;
	height?: number;
	width?: number;
}

export const Button = ({
	mode,
	label,
	imgUrl,
	height,
	width,
	...props
}: ButtonProps) => {
	return (
		<button
			type="button"
			className={`button--${mode}`}
			style={{ height: `${height}px`, width: `${width}px` }}
			{...props}
		>
			{imgUrl && (
				<img
					src={imgUrl}
					className="svg-image"
				/>
			)}
			<span>{label && label}</span>
		</button>
	);
};
