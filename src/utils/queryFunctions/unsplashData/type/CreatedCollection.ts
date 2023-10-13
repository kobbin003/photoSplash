export interface CreatedCollection {
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
	user: any;
	links: Links;
}

export interface Links {
	self: string;
	html: string;
	photos: string;
}
