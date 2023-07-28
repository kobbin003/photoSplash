import { useQuery } from "@tanstack/react-query";
import {
	EditorialPhotosType,
	ErrorUnsplash,
	getEditorialPhotos,
} from "../../utils/queryFunctions/getEditorialPhotos";
import PhotoLayoutGeneric from "../../stories/PhotoLayout/PhotoLayoutGeneric";

const PhotoGallery = () => {
	const { isLoading, isError, data, error } = useQuery<
		EditorialPhotosType[],
		ErrorUnsplash
	>({
		queryKey: ["singlePhoto"],
		queryFn: getEditorialPhotos,
	});
	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Error:{error.error[0]}</span>;
	}
	console.log(data);
	return (
		<PhotoLayoutGeneric<EditorialPhotosType>
			items={data}
			height="auto"
			width="100vw"
		/>
	);
};

export default PhotoGallery;
