import { useGeolocation } from "@vueuse/core";
import { defineStore } from "pinia";

export const useGeoLocationStore = defineStore("geolocation", () => {
	const { coords } = useGeolocation();

	return { coords };
});
