<script setup lang="ts">
import { useAllStations, useStationByName, type Station } from "@/composables/useStations";
import { addIcons } from "oh-vue-icons";
import { FaSearch } from "oh-vue-icons/icons";
import { defineAsyncComponent, onActivated, onDeactivated, ref, watch } from "vue";

import useQueryParameters from "@/composables/useQueryParameters";
import type { Map } from "maplibre-gl";
import { useRouter } from "vue-router";
import BaseLoader from "../components/BaseLoader.vue";
import MapPopup from "../components/Map/Popup.vue";

import { useAsyncState } from "@vueuse/core";

import { useFilterStore } from "@/stores/filter";
import FilterOverlay from "../components/Map/FilterOverlay.vue";

addIcons(FaSearch);

const value = "";

const Map = defineAsyncComponent(() => import("@/components/Map/index.vue"));
const MapMarker = defineAsyncComponent(() => import("@/components/Map/Marker.vue"));
const mapStyle = import.meta.env.VITE_MAP_STYLE_URL ?? {
	version: 8,
	sources: {
		osm: {
			type: "raster",
			tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
			tileSize: 256,
			attribution: "&copy; OpenStreetMap Contributors",
			maxzoom: 19,
		},
	},
	layers: [
		{
			id: "osm",
			type: "raster",
			source: "osm", // This must match the source key above
		},
	],
};

const filterStore = useFilterStore();

const { state: stations } = useAsyncState(() => useAllStations({ filter: filterStore.state }), []);

const map = ref<Map>();
function loadMap(loadedMap: Map) {
	map.value = loadedMap;
	stations.value && focusQueriedStation(stations.value);
}

// FOCUS STATION
const router = useRouter();
const focusedStation = ref<Station | null>(null);
function focusStation(station: Station | null) {
	focusedStation.value = station;
	router.replace(station ? `/?focus=${station?.id}` : "/");

	if (focusedStation.value === null) return;

	map.value?.easeTo({
		offset: [0, -80],
		center: focusedStation.value.location,
		zoom: 15,
	});
}

// FOCUS QUERIED STATION (?focus=id)

const focusedQueried = ref(false);
function focusQueriedStation(stations: Station[]) {
	if (focusedQueried.value || !map.value || !stations) return;
	focusedQueried.value = true;

	const { focus } = useQueryParameters();
	const initialStation = stations.find((station) => station.id == Number(focus)) ?? null;
	if (initialStation) {
		focusStation(initialStation);
	}
}

watch(stations, (newStations) => {
	newStations && focusQueriedStation(newStations);
});
onActivated(() => {
	stations.value && focusQueriedStation(stations.value);
});
onDeactivated(() => (focusedQueried.value = false));

// COMPONENT ACTIVATED

const activated = ref(true);
onActivated(() => (activated.value = true));
onDeactivated(() => (activated.value = false));

const searchTerm = ref("");
async function searchRequest() {
	stations.value = await useStationByName(searchTerm.value);
}
</script>

<template>
	<div
		class="group absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4 pb-8"
	>
		<!-- <h1 class="mb-4 text-4xl font-semibold leading-none text-white drop-shadow-xl">Spielplätze</h1> -->
		<div class="flex mt-4 w-80">
		<va-input class="mb-4 mx-auto" v-model="searchTerm" placeholder="Suche" @keyup="searchRequest">
			<template #prependInner>
				<va-icon name="search" />
			</template>
		</va-input>
		</div>
	</div>

	<Suspense timeout="500">
		<Map
			class="absolute inset-0"
			:center="{ lng: 10.687559341052179, lat: 53.86785850093136 }"
			:zoom="13"
			:map-style="mapStyle"
			@click="() => focusStation(null)"
			@load="loadMap"
		>
			<MapMarker
				v-for="station in stations"
				:key="station.id"
				:coordinates="station.location"
				:offset="[0, 0]"
			>
				<div class="mapboxgl-marker mapboxgl-marker-anchor-center">
					<button
						class="relative block h-10 w-10 rounded-full bg-white p-1.5 shadow-md transition-transform before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-transparent before:border-t-slate-900"
						:class="{
							'-translate-y-8 outline outline-2 outline-slate-900 before:border-[10px]':
								focusedStation?.id === station.id,
						}"
						@click.stop="() => focusStation(station)"
					>
						<img v-if="station.equipments.length <= 2 && !station.equipments.includes('water') " src="/src/assets/icons/klein.png" alt="" />
						<img v-if="station.equipments.length > 2 && !station.equipments.includes('water')" src="/src/assets/icons/gross.png" alt="" />
						<img v-if="station.equipments.includes('water')" src="/src/assets/icons/wasser_bunt.png" alt="" />

					</button>
				</div>
			</MapMarker>
		</Map>
		<template #fallback
			><BaseLoader class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		/></template>
	</Suspense>
	<Transition name="slide-up" v-if="activated">
		<MapPopup
			v-if="focusedStation !== null"
			:name="focusedStation.name || 'Spielplatz'"
			:id="focusedStation.id"
			:image="focusedStation.images[0]"
			:location="focusedStation.location"
			class="absolute inset-x-2 bottom-2 z-40"
		/>
	</Transition>
	<div
		class="group absolute inset-x-0 bottom-0 z-10 bg-gradient-to-b from-transparent to-black/60 p-4 pb-8"
	>
		<FilterOverlay class="mx-auto"></FilterOverlay>
	</div>
</template>

<style scoped>
.slide-up-enter-active {
	transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
}

.slide-up-leave-active {
	transition: all 0.2s cubic-bezier(0.12, 0, 0.39, 0);
}

.slide-up-enter-from,
.slide-up-leave-to {
	transform: translateY(10px);
	opacity: 0;
}
</style>

<style>
.mapboxgl-ctrl-top-right .mapboxgl-ctrl,
.maplibregl-ctrl-top-right .maplibregl-ctrl {
	margin: 1.5rem 1.5rem 0 0 !important;
}

.mapboxgl-ctrl-attrib.mapboxgl-compact,
.maplibregl-ctrl-attrib.maplibregl-compact {
	margin: 0 0.5rem 0 0 !important;
}

.maplibregl-ctrl-bottom-right {
	padding-bottom: 0.5rem !important;
}
</style>
