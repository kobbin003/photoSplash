export interface CollectionById {
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
	cover_photo: any;
	user: User;
	links: Links;
}

export interface Links {
	self: string;
	html: string;
	photos: string;
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
