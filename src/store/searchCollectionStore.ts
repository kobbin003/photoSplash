import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SearchCollection } from "../utils/queryFunctions/unsplashData/type/SearchCollections";

interface PhotoStore {
	allSearchCollections: null | SearchCollection[];
	setAllSearchCollections: (val: SearchCollection[] | null) => void;
	setAllSearchCollectionsPush: (
		fn: (prevData: SearchCollection[]) => SearchCollection[]
	) => void;
}

export const useSearchCollectionsStore = create<PhotoStore>()(
	devtools(
		persist(
			(set) => ({
				allSearchCollections: null,
				setAllSearchCollections: (val: SearchCollection[] | null) =>
					set((state) => ({ ...state, allSearchCollections: val })),
				setAllSearchCollectionsPush: (
					fn: (prevData: SearchCollection[]) => SearchCollection[]
				) =>
					set((state) => ({
						...state,
						allSearchCollections: fn(state.allSearchCollections || []),
					})),
			}),
			{
				name: "search",
			}
		)
	)
);
