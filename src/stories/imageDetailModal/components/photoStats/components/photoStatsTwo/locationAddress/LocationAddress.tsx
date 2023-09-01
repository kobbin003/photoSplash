import { useQuery } from "@tanstack/react-query";
import {
	LocationAddressType,
	MapBoxError,
	reverseGeocode,
} from "../../../../../../../utils/queryFunctions/mapbox/reverseGeocode";
import { Location } from "../../../../../../../utils/queryFunctions/unsplashData/type/Photo";

export const LocationAddress = ({ location }: { location: Location }) => {
	const longitude = location.position.longitude;
	const latitude = location.position.latitude;
	// const isEnabled = longitude !== null;
	// console.log("location address", location);
	const { data, isLoading, error, isError } = useQuery<
		LocationAddressType,
		MapBoxError
	>(["getPhoto", { longitude, latitude }], reverseGeocode, {
		useErrorBoundary: false,
		// enabled: isEnabled,
	});
	if (isError && error) {
		console.log("client", error);
		return <span>Error{error.message}</span>;
	}
	if (isLoading) return <p>Loading...</p>;
	console.log("locationAddress", data, location);
	return (
		<>
			{data.features.length > 0 ? (
				<p>
					<span>{data.features[0].properties.context.address.name},</span>
					<span>&nbsp;{data.features[0].properties.context.place.name},</span>
					<span>&nbsp;{data.features[0].properties.context.country.name}</span>
				</p>
			) : (
				<p>
					<span>{location.name},</span>
					<span>&nbsp;{location.city},</span>
					<span>&nbsp;{location.country}</span>
				</p>
			)}
		</>
	);
};

export default LocationAddress;
