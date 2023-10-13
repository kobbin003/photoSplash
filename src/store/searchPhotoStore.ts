import { create } from "zustand";
import { SearchPhoto } from "../utils/queryFunctions/unsplashData/type/SearchPhotos";
import { devtools, persist } from "zustand/middleware";

interface PhotoStore {
	allSearchPhotos: null | SearchPhoto[];
	setAllSearchPhotos: (val: SearchPhoto[] | null) => void;
	setAllSearchPhotosPush: (
		fn: (prevData: SearchPhoto[]) => SearchPhoto[]
	) => void;
}
export const useSearchPhotosStore = create<PhotoStore>()(
	devtools(
		persist(
			(set) => ({
				allSearchPhotos: null,
				setAllSearchPhotos: (val: SearchPhoto[] | null) =>
					set((state) => ({ ...state, allSearchPhotos: val })),
				setAllSearchPhotosPush: (
					fn: (prevData: SearchPhoto[]) => SearchPhoto[]
				) =>
					set((state) => ({
						...state,
						allSearchPhotos: fn(state.allSearchPhotos || []),
					})),
			}),
			{
				name: "search",
			}
		)
	)
);
