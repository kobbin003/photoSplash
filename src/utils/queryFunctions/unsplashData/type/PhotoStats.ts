export type ErrorUnsplash = {
	errors: string[];
};
export interface PhotoStats {
	id: string;
	downloads: Downloads;
	views: Views;
	likes: Likes;
}

export interface Downloads {
	total: number;
	historical: Historical;
}

export interface Historical {
	change: number;
	resolution: string;
	quantity: number;
	values: Value[];
}

export interface Value {
	date: string;
	value: number;
}

export interface Views {
	total: number;
	historical: Historical2;
}

export interface Historical2 {
	change: number;
	resolution: string;
	quantity: number;
	values: Value2[];
}

export interface Value2 {
	date: string;
	value: number;
}

export interface Likes {
	total: number;
	historical: Historical3;
}

export interface Historical3 {
	change: number;
	resolution: string;
	quantity: number;
	values: Value3[];
}

export interface Value3 {
	date: string;
	value: number;
}
