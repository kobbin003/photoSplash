import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EditorialPhotosType } from "../utils/queryFunctions/unsplashData/type/EditorialPhotos";
import { CurrentUserProfile } from "../utils/queryFunctions/unsplashData/type/CurrentUserProfile";
import {
	UserLikeedPhoto,
	UserLikeedPhotos,
} from "../utils/queryFunctions/unsplashData/type/UserLikedPhotos";
import {
	UserUploadedPhoto,
	UserUploadedPhotos,
} from "../utils/queryFunctions/unsplashData/type/UserUploadedPhotos";
import { UserCollections } from "../utils/queryFunctions/unsplashData/type/UserCollections";
import { CollectionPhotos } from "../utils/queryFunctions/unsplashData/type/CollectionPhotos";
import { SearchPhoto } from "../utils/queryFunctions/unsplashData/type/SearchPhotos";
import { SearchCollection } from "../utils/queryFunctions/unsplashData/type/SearchCollections";

interface PhotoStore {
	currentPhoto:
		| null
		| EditorialPhotosType
		| UserLikeedPhoto
		| UserUploadedPhoto
		| SearchPhoto
		| SearchCollection;
	setCurrentPhoto: (
		val:
			| EditorialPhotosType
			| UserLikeedPhoto
			| UserUploadedPhoto
			| SearchPhoto
			| SearchCollection
			| null
	) => void;
	allPhotos: null | EditorialPhotosType[];
	setAllPhotos: (val: EditorialPhotosType[] | null) => void;
	setAllPhotosPush: (
		fn: (prevData: EditorialPhotosType[]) => EditorialPhotosType[]
	) => void;
	allLikedPhotos: null | UserLikeedPhotos;
	setAllLikedPhotos: (val: UserLikeedPhotos | null) => void;
	setAllLikedPhotosPush: (
		fn: (prevData: UserLikeedPhotos) => UserLikeedPhotos
	) => void;
	allUploadedPhotos: null | UserUploadedPhotos;
	setAllUploadedPhotos: (val: UserUploadedPhotos | null) => void;
	setAllUploadedPhotosPush: (
		fn: (prevData: UserUploadedPhotos) => UserUploadedPhotos
	) => void;
	allCollections: null | UserCollections;
	setAllCollections: (val: UserCollections | null) => void;
	setAllCollectionsPush: (
		fn: (prevData: UserCollections) => UserCollections
	) => void;
	allCollectionPhotos: null | CollectionPhotos;
	setAllCollectionPhotos: (val: CollectionPhotos | null) => void;
	setAllCollectionPhotosPush: (
		fn: (prevData: CollectionPhotos) => CollectionPhotos
	) => void;
	showModal: boolean;
	setShowModal: (val: boolean) => void;
	showCollectionModal: {
		show: boolean;
		img: { url: string; id: string; collectionIds: number[] | [] };
	};
	setShowCollectionModal: (val: {
		show: boolean;
		img: { url: string; id: string; collectionIds: number[] | [] };
	}) => void;
	accessToken: string;
	setAccessToken: (val: string) => void;
	currentUserProfile: null | CurrentUserProfile;
	setCurrentUserProfile: (val: CurrentUserProfile) => void;
	limitExceeded: boolean;
	setLimitExceeded: (val: boolean) => void;
}

export const usePhotoStore = create<PhotoStore>()(
	devtools(
		persist(
			(set) => ({
				showCollectionModal: {
					show: false,
					img: { url: "", id: "", collectionIds: [] },
				},
				setShowCollectionModal: (val: {
					show: boolean;
					img: { url: string; id: string; collectionIds: number[] };
				}) => set((state) => ({ ...state, showCollectionModal: val })),
				currentPhoto: null,
				setCurrentPhoto: (
					val:
						| EditorialPhotosType
						| UserLikeedPhoto
						| UserUploadedPhoto
						| SearchPhoto
						| SearchCollection
						| null
				) => set((state) => ({ ...state, currentPhoto: val })),
				allPhotos: null,
				allLikedPhotos: null,
				allUploadedPhotos: null,
				allCollections: null,
				allCollectionPhotos: null,
				setAllPhotos: (val: EditorialPhotosType[] | null) =>
					set((state) => ({ ...state, allPhotos: val })),
				setAllLikedPhotos: (val: UserLikeedPhotos | null) =>
					set((state) => ({ ...state, allLikedPhotos: val })),
				setAllUploadedPhotos: (val: UserUploadedPhotos | null) =>
					set((state) => ({ ...state, allUploadedPhotos: val })),
				setAllCollections: (val: UserCollections | null) =>
					set((state) => ({ ...state, allCollections: val })),
				setAllCollectionPhotos: (val: CollectionPhotos | null) =>
					set((state) => ({ ...state, allCollectionPhotos: val })),
				setAllPhotosPush: (
					fn: (prevData: EditorialPhotosType[]) => EditorialPhotosType[]
				) =>
					set((state) => ({ ...state, allPhotos: fn(state.allPhotos || []) })),
				setAllLikedPhotosPush: (
					fn: (prevData: UserLikeedPhotos) => UserLikeedPhotos
				) =>
					set((state) => ({
						...state,
						allLikedPhotos: fn(state.allLikedPhotos || []),
					})),
				setAllUploadedPhotosPush: (
					fn: (prevData: UserUploadedPhotos) => UserUploadedPhotos
				) =>
					set((state) => ({
						...state,
						allUploadedPhotos: fn(state.allUploadedPhotos || []),
					})),
				setAllCollectionsPush: (
					fn: (prevData: UserCollections) => UserCollections
				) =>
					set((state) => ({
						...state,
						allCollections: fn(state.allCollections || []),
					})),
				setAllCollectionPhotosPush: (
					fn: (prevData: CollectionPhotos) => CollectionPhotos
				) =>
					set((state) => ({
						...state,
						allCollectionPhotos: fn(state.allCollectionPhotos || []),
					})),
				showModal: false,
				setShowModal: (val: boolean) =>
					set((state) => ({ ...state, showModal: val })),
				// 				showCollectionModal: { show: boolean; img: { url: string } };
				// setShowCollectionModal: (show: boolean, url: string) => void;
				accessToken: "",
				setAccessToken: (val) =>
					set((state) => ({ ...state, accessToken: val })),
				currentUserProfile: null,
				setCurrentUserProfile: (val) =>
					set((state) => ({ ...state, currentUserProfile: val })),
				limitExceeded: false,
				setLimitExceeded: (val: boolean) =>
					set((state) => ({ ...state, limitExceeded: val })),
			}),
			{
				name: "photoStore",
			}
		)
	)
);
