import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EditorialPhotosType } from "../utils/queryFunctions/unsplashData/type/EditorialPhotos";
interface PhotoStore {
	currentPhoto: null | EditorialPhotosType;
	currentphotoIndex: null | number;
	allPhotos: null | EditorialPhotosType[];
	setCurrentPhoto: (val: EditorialPhotosType | null) => void;
	setCurrentPhotoIndex: (val: number | undefined) => void;
	setCurrentPhotoIndexChange: (fn: (prevValue: number) => number) => void;
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
				currentphotoIndex: null,
				allPhotos: null,
				showModal: false,
				setCurrentPhoto: (val: EditorialPhotosType | null) =>
					set((state) => ({ ...state, currentPhoto: val })),
				setCurrentPhotoIndex: (val: number | undefined) =>
					set((state) => ({ ...state, currentphotoIndex: val })),
				setCurrentPhotoIndexChange: (fn: (prevValue: number) => number) =>
					set((state) => ({
						...state,
						currentphotoIndex: fn(state.currentphotoIndex || 0),
					})),
				// setCurrentPhotoIndex: (val: number) =>
				// 	set((state) => ({ ...state, currentphotoIndex: val })),
				setAllPhotos: (val: EditorialPhotosType[] | null) =>
					set((state) => ({ ...state, allPhotos: val })),
				setAllPhotosPush: (
					fn: (prevData: EditorialPhotosType[]) => EditorialPhotosType[]
				) =>
					set((state) => ({ ...state, allPhotos: fn(state.allPhotos || []) })),
				setShowModal: (val: boolean) =>
					set((state) => ({ ...state, showModal: val })),
			}),
			{
				name: "photoStore",
			}
		)
	)
);
