import { mapboxToken } from "../unsplashData/key/accessKey";
import { Location } from "../unsplashData/type/Photo";

export const reverseGeocode = async ({ queryKey }: any) => {
	const [_, location] = queryKey;
	const typedLocation = location as Location["position"];
	// console.log(location);
	const url = `https://api.mapbox.com/search/geocode/v6/reverse?types=address&longitude=${typedLocation.longitude}&latitude=${typedLocation.latitude}&access_token=${mapboxToken}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			const mapBoxError = await response.json();
			// return mapBoxError;
			return Promise.reject(mapBoxError);
		}
		const data = await response.json();
		// console.log("mapbox-fetch", data);
		return data;
	} catch (error) {
		console.log("error:", error);
		return Promise.reject(error);
	}
};
export interface MapBoxError {
	error_code: string;
	message: string;
}
export interface LocationAddressType {
	type: string;
	features: Feature[];
	attribution: string;
}

export interface Feature {
	type: string;
	id: string;
	geometry: Geometry;
	properties: Properties;
}

export interface Geometry {
	type: string;
	coordinates: number[];
}

export interface Properties {
	mapbox_id: string;
	feature_type: string;
	name: string;
	coordinates: Coordinates;
	place_formatted: string;
	context: Context;
}

export interface Coordinates {
	longitude: number;
	latitude: number;
	accuracy: string;
}

export interface Context {
	address: Address;
	street: Street;
	neighborhood: Neighborhood;
	postcode: Postcode;
	place: Place;
	region: Region;
	country: Country;
}

export interface Address {
	mapbox_id: string;
	address_number: string;
	street_name: string;
	name: string;
}

export interface Street {
	mapbox_id: string;
	name: string;
}

export interface Neighborhood {
	mapbox_id: string;
	name: string;
}

export interface Postcode {
	mapbox_id: string;
	name: string;
}

export interface Place {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
}

export interface Region {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
	region_code: string;
	region_code_full: string;
}

export interface Country {
	mapbox_id: string;
	name: string;
	wikidata_id: string;
	country_code: string;
	country_code_alpha_3: string;
}
