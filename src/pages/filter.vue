<script>
export default {
	data() {
		return {
			distanceValue: [0],
			ageValue: [0, 5],
		
			ratingOptions: [
				{ label: "Alle", value: "Alle" },
				{ label: "3", value: "3 Sterne", iconRight: "star" },
				{ label: "4", value: "4 Sterne", iconRight: "star" },
				{ label: "5", value: "5 Sterne", iconRight: "star" },
			],
			model: "Alle",

			wheelchairOptions: [
				{ label: "Nein", value: "Nein" },
				{ label: "Ja", value: "Ja" },
				{ label: "Limitiert", value: "Limitiert" },
			],
			chair: "Nein",

			equipments: [
				{ id: 1, label: "Rutsche", value: false },
				{ id: 2, label: "Schaukel", value: false },
				{ id: 3, label: "Klettergerüst", value: false },
				{ id: 4, label: "Sandkasten", value: false },
				{ id: 5, label: "Wippe", value: false },
				{ id: 6, label: "Feder-Wippe", value: false },
				{ id: 7, label: "Spielhaus", value: false },
				{ id: 8, label: "Karusel", value: false },
				{ id: 9, label: "Wasser", value: false },
			],
		};
	},
	methods: {
		processTrackLabel(value, order) {
			return order === 0 ? `${value}Jahre` : `${value}Jahre`;
		},
		toggleChip(id) {
			const index = this.equipments.findIndex((eq) => eq.id === id);
			this.equipments[index].value = !this.equipments[index].value;
		},
	},
};
</script>

<template>
	<div class="w-full p-4">
		<div class="flex items-center justify-between">
			<h1 class="va-h1">Filter</h1>
			<span class="text-right"><va-icon class="material-icons" size="large">cancel</va-icon></span>
		</div>

		<div class="mb-6">
			<p class="mb-6 text-base font-semibold">Spielgeräte</p>
			<va-chip
				@click="toggleChip(equipment.id)"
				:outline="!equipment.value"
				v-for="equipment in equipments"
				:key="equipment.id"
				class="m-1"
			>
				{{ equipment.label }}
			</va-chip>
		</div>

		<va-divider />

		<div class="mb-6">
			<div class="flex justify-between">
				<p class="mb-6 text-base font-semibold">Distanz</p>
				<span class="text-right">{{ distanceValue[0] }} km</span>
			</div>

			<va-slider class="mb-4" v-model="distanceValue[0]" track-label-visible :max="15" />
		</div>

		<va-divider />

		<div class="mb-6">
			<div class="flex">
				<p class="mb-6 text-base font-semibold">Alter</p>
				<span class="text-right">{{ ageValue[0] }} - {{ ageValue[1] }} Jahre</span>
			</div>

			<va-slider
				class="mb-4"
				v-model="ageValue"
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
				<span class="text-right">{{ model }}</span>
			</div>

			<va-button-toggle
				preset="secondary"
				grow="true"
				border-color="primary"
				v-model="model"
				:options="ratingOptions"
			/>
		</div>

		<va-divider />

		<div class="mb-6">
			<div class="flex justify-between">
				<p class="mb-6 text-base font-semibold">Barrierefreiheit</p>
				<span class="text-right">{{ chair }}</span>
			</div>

			<va-button-toggle
				preset="secondary"
				grow="true"
				border-color="primary"
				v-model="chair"
				:options="wheelchairOptions"
			/>
		</div>

		<va-divider />
	</div>
</template>
