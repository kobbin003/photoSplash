const accessKey = import.meta.env.VITE_ACCESS_KEY;
export type ErrorUnsplash = {
	error: string[];
};
export const getEditorialPhotos = async () => {
	// export const getEditorialPhotos = async () => {
	try {
		const response = await fetch(
			`https://api.unsplash.com/photos/?client_id=${accessKey}`
		);
		if (!response.ok) {
			const unsplashError = await response.json();
			throw unsplashError;
		}
		return response.json();
	} catch (error) {
		console.log("fetch-error", error);
		return Promise.reject(error);
	}
};

export interface EditorialPhotosType {
	id: string;
	created_at: string;
	updated_at: string;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	likes: number;
	liked_by_user: boolean;
	description: string;
	user: User;
	current_user_collections: CurrentUserCollection[];
	urls: Urls;
	links: Links2;
}

export interface User {
	id: string;
	username: string;
	name: string;
	portfolio_url: string;
	bio: string;
	location: string;
	total_likes: number;
	total_photos: number;
	total_collections: number;
	instagram_username: string;
	twitter_username: string;
	profile_image: ProfileImage;
	links: Links;
}

export interface ProfileImage {
	small: string;
	medium: string;
	large: string;
}

export interface Links {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
}

export interface CurrentUserCollection {
	id: number;
	title: string;
	published_at: string;
	last_collected_at: string;
	updated_at: string;
	cover_photo: any;
	user: any;
}

export interface Urls {
	raw: string;
	full: string;
	regular: string;
	small: string;
	thumb: string;
}

export interface Links2 {
	self: string;
	html: string;
	download: string;
	download_location: string;
}
