interface ButtonProps {}

export const TailwindButton = ({ ...props }: ButtonProps) => {
	return (
		<button
			type="button"
			className="bg-yellow-300"
		>
			Button Me
		</button>
	);
};
