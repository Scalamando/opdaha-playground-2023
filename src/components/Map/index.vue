<script setup lang="ts">
import "maplibre-gl/dist/maplibre-gl.css";

import { GeolocateControl, LngLatBounds, Map, type LngLatLike } from "maplibre-gl";
import { nextTick, onBeforeUnmount, onMounted, provide, ref } from "vue";

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

type Props = {
	mapStyle: string;
	center: LngLatLike;
	zoom: number;
	minZoom?: number;
	maxZoom?: number;
	maxBounds?: LngLatBounds;
};
type Emits = {
	(event: "load", map: Map): void;
};
const map = ref<Map>();
const initial = ref(true);
const mapContainer = ref<HTMLDivElement>();

onMounted(async () => {
	if (!mapContainer.value || !initial.value) return;

	map.value = new Map({
		container: mapContainer.value,
		style: props.mapStyle,
		center: props.center,
		zoom: props.zoom,
		minZoom: props.minZoom,
		maxZoom: props.maxZoom,
		maxBounds: props.maxBounds,
	});

	const geolocate = new GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
		},
		trackUserLocation: true,
	});

	map.value.addControl(geolocate);

	initial.value = false;
	emit("load", map.value);
});

onBeforeUnmount(async () => {
	await nextTick();
	if (map.value) map.value.remove();
});

provide("map", map);
</script>

<template>
	<div ref="mapContainer" class="h-full w-full">
		<slot v-if="!initial"></slot>
	</div>
</template>

<style>
.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-top-right,
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
	z-index: 10;
}

.maplibregl-ctrl-bottom-right {
	padding-bottom: 70px;
}
</style>
