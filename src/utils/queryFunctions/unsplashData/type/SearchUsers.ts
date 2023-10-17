export interface SearchUsers {
	total: number;
	total_pages: number;
	results: SearchUser[];
}

export interface SearchUser {
	id: string;
	username: string;
	name: string;
	first_name: string;
	last_name: string;
	instagram_username: string;
	twitter_username: string;
	portfolio_url: any;
	total_likes: number;
	total_photos: number;
	total_collections: number;
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
}
