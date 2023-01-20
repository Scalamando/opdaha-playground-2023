<script setup lang="ts">
import {
	type LngLatLike,
	type Map,
	type MarkerOptions,
	type PointLike,
	Marker,
} from "maplibre-gl";
import { type Ref, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

type Props = {
	offset?: PointLike;
	coordinates: LngLatLike;
};
const props = withDefaults(defineProps<Props>(), {
	offset: () => [0, -15],
});

const map = inject<Ref<Map>>("map");
const marker = ref<Marker>();
const markerContainer = ref<HTMLDivElement>();
const initialized = ref(false);

onMounted(() => {
	if (!map) return;
	const markerOptions: MarkerOptions = { ...props };

	if (markerContainer.value?.children) {
		markerOptions.element = markerContainer.value.children[0] as HTMLDivElement;
	}

	marker.value = new Marker(markerOptions);

	initialized.value = true;
	marker.value.setLngLat(props.coordinates).addTo(map.value);
});

watch(
	() => props.coordinates,
	(lngLat: LngLatLike) => {
		if (initialized.value && lngLat) {
			marker.value?.setLngLat(lngLat);
		}
	}
);

watch(
	() => props.offset,
	(offset: PointLike) => {
		if (initialized.value && offset) {
			marker.value?.setOffset(offset);
		}
	}
);

onBeforeUnmount(async () => {
	await nextTick();
	if (map && map.value !== undefined && marker.value !== undefined) {
		marker.value.remove();
	}
});
</script>

<template>
	<div style="display: none" ref="markerContainer">
		<slot></slot>
	</div>
</template>
