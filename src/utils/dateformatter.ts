export const dateFormatter = (dateString: string) => {
	const dateObject = new Date(dateString);
	const month = dateObject.toLocaleString("en-us", {
		month: "short",
	});
	const date = dateObject.getDate();
	const year = dateObject.getFullYear();
	return `${date} ${month}, ${year}`;
};
