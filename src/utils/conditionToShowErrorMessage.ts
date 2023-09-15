export const conditionToShowErrorMessage = (remainingLimit: string) => {
	return parseInt(remainingLimit, 10) < parseInt("2", 10);
};
