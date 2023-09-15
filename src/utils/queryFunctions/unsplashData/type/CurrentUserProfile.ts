export interface CurrentUserProfile {
	id: string;
	updated_at: string;
	username: string;
	first_name: string;
	last_name: string;
	twitter_username: string;
	portfolio_url: any;
	bio: string;
	location: any;
	total_likes: number;
	total_photos: number;
	total_collections: number;
	followed_by_user: boolean;
	downloads: number;
	uploads_remaining: number;
	instagram_username: string;
	email: string;
	links: Links;
}

export interface Links {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
}
