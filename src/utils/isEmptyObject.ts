export const isEmptyObject = (obj: any) => {
	for (const el in obj) return false;
	return true;
};
