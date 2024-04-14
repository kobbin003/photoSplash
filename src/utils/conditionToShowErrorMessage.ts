export const conditionToShowErrorMessage = (remainingLimit: string) => {
	return parseInt(remainingLimit, 10) < 15;
};
