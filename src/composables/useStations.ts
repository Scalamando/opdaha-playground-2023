import type { Filter } from "@/stores/filter";
import { useGeoLocationStore } from "@/stores/geolocation";
import distance from "@turf/distance";
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
		equipment: Equipment[];
		images: {
			data: {
				id: number;
				attributes: {
					width: number;
					height: number;
					url: string;
				};
			}[];
		};
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
		equipments: stationResponse.attributes.equipment,
		images:
			stationResponse.attributes.images.data?.map((img) => ({
				url: import.meta.env.VITE_APP_API_URL + img.attributes.url,
				height: img.attributes.height,
				width: img.attributes.width,
			})) ?? [],
	};

	return station;
}

export async function useAllStations({ filter }: { filter?: Filter }): Promise<Station[]> {
	const response = await axios.get<{ data: StationResponse[] }>(
		import.meta.env.VITE_APP_API_URL +
			"/api/playgrounds?pagination[start]=0&pagination[limit]=350&populate=*"
	);

	if (response.status === 200) {
		let stations = response.data.data.map(transformStrapiStationResponse);

		if (filter) {
			const geoStore = useGeoLocationStore();
			console.log(geoStore.coords);

			stations = stations.filter((station) => {
				const isInDistance =
					filter.distance[0] > 0 && geoStore.coords.latitude !== Infinity
						? distance(station.location, [geoStore.coords.longitude, geoStore.coords.latitude]) <
						  filter.distance[0]
						: true;

				const isInAgeRange =
					(station.minAge ?? 0) <= filter.age[0] && (station.maxAge ?? 16) >= filter.age[1];

				const meetsWheelchairFilter =
					filter.wheelchair === "no" ? true : station.wheelchair === filter.wheelchair;

				const hasEquipment = filter.equipment.every(
					(eq) => station.equipments?.find((stationEq) => stationEq === eq) != null
				);

				return isInDistance && isInAgeRange && meetsWheelchairFilter && hasEquipment;
			});
		}

		return stations;
	}

	return [];
}

export async function useOneStation(id: number): Promise<Station | null> {
	const response = await axios.get<{ data: StationResponse }>(
		import.meta.env.VITE_APP_API_URL + "/api/playgrounds/" + id + "?populate=*"
	);

	if (response.status === 200) {
		return transformStrapiStationResponse(response.data.data);
	}

	return null;
}
