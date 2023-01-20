import axios from "axios";

export type Image = {
	url: string;
	width: number;
	height: number;
};

export type Surrounding = "cafe" | "restaurant" | "bakery" | "shopping" | "kiosk" | "toilet";
export type Equipment =
	| "slide"
	| "swing"
	| "climbingframe"
	| "sandpit"
	| "seesaw"
	| "springy"
	| "playhouse"
	| "roundabout"
	| "water";
export type Extra = "bench" | "ground" | "shade" | "fence" | "greenery";
export type Wheelchair = "yes" | "limited" | "no";

export type Station = {
	id: number;
	oid: string;
	name?: string;
	altName?: string;
	minAge?: number;
	maxAge?: number;
	openingHours?: string;
	wheelchair: Wheelchair;
	location: [number, number];
	surroundings: Surrounding[];
	extras: Extra[];
	equipments: Equipment[];
	images: Image[];
};

type StationResponse = {
	id: number;
	attributes: {
		oid: string;
		name: string | null;
		altName: string | null;
		minAge: number | null;
		maxAge: number | null;
		openingHours: string | null;
		wheelchair: Wheelchair;
		location: [number, number];
		surroundings: Surrounding[];
		extras: Extra[];
		equipments: Equipment[];
		images: {
			id: number;
			attributes: {
				width: number;
				height: number;
				url: string;
			};
		}[];
	};
};

function transformStrapiStationResponse(stationResponse: StationResponse): Station {
	const station: Station = {
		id: stationResponse.id,
		oid: stationResponse.attributes.oid,
		name: stationResponse.attributes.name ?? undefined,
		altName: stationResponse.attributes.altName ?? undefined,
		minAge: stationResponse.attributes.minAge ?? undefined,
		maxAge: stationResponse.attributes.maxAge ?? undefined,
		openingHours: stationResponse.attributes.openingHours ?? undefined,
		wheelchair: stationResponse.attributes.wheelchair,
		location: stationResponse.attributes.location,
		surroundings: stationResponse.attributes.surroundings,
		extras: stationResponse.attributes.extras,
		equipments: stationResponse.attributes.equipments,
		images: stationResponse.attributes.images.map((img) => ({
			url: img.attributes.url,
			height: img.attributes.height,
			width: img.attributes.width,
		})),
	};

	return station;
}

export async function useAllStations() {
	const response = await axios.get(
		import.meta.env.VITE_APP_API_URL + "/api/playgrounds?populate=*"
	);

	if (response.status === 200) {
		return response.data.map(transformStrapiStationResponse);
	}

	return [];
}

export async function useOneStation(id: number) {
	const response = await axios.get(
		import.meta.env.VITE_APP_API_URL + "/api/playground/" + id + "?populate=*"
	);

	if (response.status === 200) {
		return transformStrapiStationResponse(response.data);
	}

	return {};
}
