import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EditorialPhotosType } from "../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import { CurrentUserProfile } from "../utils/queryFunctions/unsplashData/type/CurrentUserProfile";
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
	accessToken: string;
	setAccessToken: (val: string) => void;
	currentUserProfile: null | CurrentUserProfile;
	setCurrentUserProfile: (val: CurrentUserProfile) => void;
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
				accessToken: "",
				setAccessToken: (val) =>
					set((state) => ({ ...state, accessToken: val })),
				currentUserProfile: null,
				setCurrentUserProfile: (val) =>
					set((state) => ({ ...state, currentUserProfile: val })),
			}),
			{
				name: "photoStore",
			}
		)
	)
);
