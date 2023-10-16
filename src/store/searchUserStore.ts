import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SearchUser } from "../utils/queryFunctions/unsplashData/type/SearchUsers";

interface PhotoStore {
	allSearchUsers: null | SearchUser[];
	setAllSearchUsers: (val: SearchUser[] | null) => void;
	setAllSearchUsersPush: (fn: (prevData: SearchUser[]) => SearchUser[]) => void;
}

export const useSearchUsersStore = create<PhotoStore>()(
	devtools(
		persist(
			(set) => ({
				allSearchUsers: null,
				setAllSearchUsers: (val: SearchUser[] | null) =>
					set((state) => ({ ...state, allSearchUsers: val })),
				setAllSearchUsersPush: (fn: (prevData: SearchUser[]) => SearchUser[]) =>
					set((state) => ({
						...state,
						allSearchUsers: fn(state.allSearchUsers || []),
					})),
			}),
			{
				name: "search",
			}
		)
	)
);
