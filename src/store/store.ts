import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EditorialPhotosType } from "../utils/queryFunctions/unsplashData/type/EditorialPhotos";
interface PhotoStore {
	currentPhoto: null | EditorialPhotosType;
	setCurrentPhoto: (val: EditorialPhotosType | null) => void;
	allPhotos: null | EditorialPhotosType[];
	setAllPhotos: (val: EditorialPhotosType[] | null) => void;
	setAllPhotosPush: (
		fn: (prevData: EditorialPhotosType[]) => EditorialPhotosType[]
	) => void;
	showModal: boolean;
	setShowModal: (val: boolean) => void;
}
export const usePhotoStore = create<PhotoStore>()(
	devtools(
		persist(
			(set) => ({
				currentPhoto: null,
				setCurrentPhoto: (val: EditorialPhotosType | null) =>
					set((state) => ({ ...state, currentPhoto: val })),
				allPhotos: null,
				setAllPhotos: (val: EditorialPhotosType[] | null) =>
					set((state) => ({ ...state, allPhotos: val })),
				setAllPhotosPush: (
					fn: (prevData: EditorialPhotosType[]) => EditorialPhotosType[]
				) =>
					set((state) => ({ ...state, allPhotos: fn(state.allPhotos || []) })),
				showModal: false,
				setShowModal: (val: boolean) =>
					set((state) => ({ ...state, showModal: val })),
			}),
			{
				name: "photoStore",
			}
		)
	)
);
