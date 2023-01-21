<script lang="ts">
import ChipMultiSelect from "@/components/ChipMultiSelect.vue";
import { useFilterStore } from "@/stores/filter";
import { defineComponent } from "vue";

export default defineComponent({
	components: { ChipMultiSelect },
	setup() {
		const filterStore = useFilterStore();
		return {
			filterStore,
		};
	},
	data() {
		return {
			options: {
				rating: [
					{ label: "Alle", value: "Alle" },
					{ label: "3", value: 3, iconRight: "star" },
					{ label: "4", value: 4, iconRight: "star" },
					{ label: "5", value: 5, iconRight: "star" },
				],
				wheelchair: [
					{ label: "Nein", value: "no" },
					{ label: "Ja", value: "yes" },
					{ label: "Limitiert", value: "limited" },
				],
				equipment: [
					{ label: "Rutsche", value: "slide" },
					{ label: "Schaukel", value: "swing" },
					{ label: "Klettergerüst", value: "climbingframe" },
					{ label: "Sandkasten", value: "sandpit" },
					{ label: "Wippe", value: "seesaw" },
					{ label: "Feder-Wippe", value: "springy" },
					{ label: "Spielhaus", value: "playhouse" },
					{ label: "Karusel", value: "roundabout" },
					{ label: "Wasser", value: "water" },
				],
			},
		};
	},
	methods: {
		processTrackLabel(value: string, order: number) {
			return order === 0 ? `${value}Jahre` : `${value}Jahre`;
		},
	},
});
</script>

<template>
	<div class="w-full p-4">
		<div class="flex items-center justify-between">
			<h1 class="va-h1">Filter</h1>
			<span class="text-right"><va-icon class="material-icons" size="large">cancel</va-icon></span>
		</div>

		<div class="mb-6">
			<p class="mb-6 text-base font-semibold">Spielgeräte</p>
			<ChipMultiSelect :options="options.equipment" v-model="filterStore.state.equipment" />
		</div>

		<va-divider />

		<div class="mb-6">
			<div class="flex justify-between">
				<p class="mb-6 text-base font-semibold">Distanz</p>
				<span class="text-right">{{ filterStore.state.distance[0] }} km</span>
			</div>

			<va-slider
				class="mb-4"
				v-model="filterStore.state.distance[0]"
				track-label-visible
				:max="15"
			/>
		</div>

		<va-divider />

		<div class="mb-6">
			<div class="flex">
				<p class="mb-6 text-base font-semibold">Alter</p>
				<span class="text-right"
					>{{ filterStore.state.age[0] }} - {{ filterStore.state.age[1] }} Jahre</span
				>
			</div>

			<va-slider
				class="mb-4"
				v-model="filterStore.state.age"
				range
				track-label-visible
				:track-label="processTrackLabel"
				:max="16"
			/>
		</div>

		<va-divider />

		<div class="mb-6">
			<div class="flex">
				<p class="mb-6 text-base font-semibold">Bewertung</p>
				<span class="text-right">{{ filterStore.state.rating }}</span>
			</div>

			<va-button-toggle
				preset="secondary"
				grow
				border-color="primary"
				v-model="filterStore.state.rating"
				:options="options.rating"
			/>
		</div>

		<va-divider />

		<div class="mb-6">
			<div class="flex justify-between">
				<p class="mb-6 text-base font-semibold">Barrierefreiheit</p>
				<span class="text-right">{{ filterStore.state.wheelchair }}</span>
			</div>

			<va-button-toggle
				preset="secondary"
				grow
				border-color="primary"
				v-model="filterStore.state.wheelchair"
				:options="options.wheelchair"
			/>
		</div>

		<va-divider />

	</div>
</template>
