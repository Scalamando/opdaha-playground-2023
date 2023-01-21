<script setup lang="ts">
import type { Image } from "@/composables/useStations";
import distance from "@turf/distance";
import { useGeolocation } from "@vueuse/core";
import { addIcons } from "oh-vue-icons";
import { FaCheckSquare, FaDirections } from "oh-vue-icons/icons";
import { computed, ref, Transition } from "vue";
import { RouterLink } from "vue-router";

type Props = {
	id: number;
	image: Image | null;
	name: string;
	location: [number, number];
};

const open = ref(false);

const props = defineProps<Props>();

const { coords } = useGeolocation();
const curDistance = computed(() =>
	coords.value ? distance([coords.value.longitude, coords.value.latitude], props.location) : 0
);

addIcons(FaCheckSquare, FaDirections);

const onEnter = (el: Element) => {
	(el as HTMLElement).style.visibility = "hidden";
	(el as HTMLElement).style.height = "auto";
	const height = getComputedStyle(el).height;
	(el as HTMLElement).style.visibility = "visible";
	(el as HTMLElement).style.height = "0";
	// Force repaint
	getComputedStyle(el).height;
	// Make sure the browser has finished painting the line above
	requestAnimationFrame(() => {
		(el as HTMLElement).style.height = height;
	});
};
const afterEnter = (el: Element) => ((el as HTMLElement).style.height = "auto");
const onLeave = (el: Element) => {
	const height = getComputedStyle(el).height;
	(el as HTMLElement).style.height = height;
	getComputedStyle(el).height;
	requestAnimationFrame(() => {
		(el as HTMLElement).style.height = "0";
	});
};
</script>

<template>
	<div class="rounded-xl bg-white p-2 shadow-lg" >
		<div class="flex items-center gap-2">
			<div class="flex items-start justify-between" @click="open = !open">
				<div>
					<h2 class="mr-auto pl-3 text-2xl font-semibold">{{ props.name }}</h2>
					<div class="flex justify-items-center">
						<va-icon class="w-6 flex-none" name="location_on" />
						<p class="mr-auto pb-4 text-sm text-gray-400">{{ curDistance.toFixed(2) }} km</p>
					</div>
				</div>
				<va-button color="textInverted" icon-color="textPrimary" class="mr-3 mb-2 flex-none">
					<va-icon v-if="!open" name="add">add</va-icon> 
					<va-icon v-else name="remove">remove</va-icon>
				</va-button>
			</div>
		</div>
		<Transition name="expand" @enter="onEnter" @after-enter="afterEnter" @leave="onLeave">
			<div class="w-full" v-if="open">
				<img v-if="props.image" :src="props.image.url" alt="" class="rounded-lg px-4 pb-5 pt-4" />
			</div>
		</Transition>

		<RouterLink
			:to="{ name: 'playground-id', params: { id: props.id } }"
			class="block w-full rounded-lg bg-slate-900 py-1.5 text-center text-white shadow-lg"
		>
			Details
		</RouterLink>
	</div>
</template>

<style scoped>
/* Hardware acceleration trick*/
* {
	will-change: height;
	transform: translateZ(0);
	backface-visibility: hidden;
	perspective: 1000px;
}

.expand-enter-active,
.expand-leave-active {
	transition: height 0.5s ease;
	overflow: hidden;
}

.expand-enter,
.expand-leave-to {
	height: 0;
}
</style>
