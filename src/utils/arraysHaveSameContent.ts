function arraysHaveSameContent(array1: any[], array2: any[]) {
	// Check if the arrays have the same length
	if (array1.length !== array2.length) {
		return false;
	}

	// Sort the arrays to ensure elements are in the same order
	const sortedArray1 = array1.slice().sort();
	const sortedArray2 = array2.slice().sort();

	// Compare each element of the sorted arrays
	for (let i = 0; i < sortedArray1.length; i++) {
		if (sortedArray1[i] !== sortedArray2[i]) {
			return false;
		}
	}

	// If all elements match, the arrays have the same content
	return true;
}
export default arraysHaveSameContent;
