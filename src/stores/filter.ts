import type { Equipment, Wheelchair } from "@/composables/useStations";
import { defineStore } from "pinia";
import { reactive } from "vue";

export type Filter = {
	distance: [number];
	age: [number, number];
	rating: "Alle" | 3 | 4 | 5;
	wheelchair: Wheelchair;
	equipment: Equipment[];
};

export const useFilterStore = defineStore("filter", () => {
	const state = reactive<Filter>({
		distance: [0],
		age: [0, 5],
		rating: "Alle",
		wheelchair: "no",
		equipment: [],
	});

	return { state };
});
