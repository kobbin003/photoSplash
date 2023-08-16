import { create } from "zustand";
import { EditorialPhotosType } from "../utils/queryFunctions/unsplashData/getEditorialPhotos";

interface PhotoStore {
	currentPhoto: {} | EditorialPhotosType;
	allPhotos: [] | EditorialPhotosType[];
	setCurrentPhoto: (val: EditorialPhotosType) => void;
	setAllPhotos: (val: EditorialPhotosType[]) => void;
}
export const usePhotoStore = create<PhotoStore>((set) => ({
	currentPhoto: {},
	allPhotos: [],
	setCurrentPhoto: (val: EditorialPhotosType) =>
		set((state) => ({ ...state, currentPhoto: val })),
	setAllPhotos: (val: EditorialPhotosType[]) =>
		set((state) => ({ ...state, allPhotos: val })),
}));
