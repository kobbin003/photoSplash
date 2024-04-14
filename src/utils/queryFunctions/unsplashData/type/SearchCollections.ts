export interface SearchCollections {
	total: number;
	total_pages: number;
	results: SearchCollection[];
}

export interface SearchCollection {
	id: number;
	title: string;
	description: string;
	published_at: string;
	last_collected_at: string;
	updated_at: string;
	featured: boolean;
	total_photos: number;
	private: boolean;
	share_key: string;
	cover_photo: CoverPhoto;
	user: User2;
	links: Links4;
}
// export interface SearchCollection {
// 	id: number;
// 	title: string;
// 	description: any;
// 	published_at: string;
// 	last_collected_at: string;
// 	updated_at: string;
// 	featured: boolean;
// 	total_photos: number;
// 	private: boolean;
// 	share_key: string;
// 	cover_photo: CoverPhoto;
// 	user: User2;
// 	links: Links4;
// }

export interface CoverPhoto {
	id: string;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	likes: number;
	liked_by_user: boolean;
	description: string;
	created_at: string;
	user: User;
	urls: Urls;
	links: Links2;
}

export interface User {
	id: string;
	username: string;
	name: string;
	bio: string;
	location: string;
	total_likes: number;
	total_photos: number;
	total_collections: number;
	first_name: string;
	last_name: string;
	instagram_username: string;
	twitter_username: string;
	portfolio_url: string;
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
}

export interface User2 {
	id: string;
	updated_at: string;
	username: string;
	name: string;
	portfolio_url: string;
	bio: string;
	location: string;
	total_likes: number;
	total_photos: number;
	total_collections: number;
	profile_image: ProfileImage2;
	links: Links3;
}

export interface ProfileImage2 {
	small: string;
	medium: string;
	large: string;
}

export interface Links3 {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
}

export interface Links4 {
	self: string;
	html: string;
	photos: string;
	related: string;
}
