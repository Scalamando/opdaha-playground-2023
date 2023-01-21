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
		age: [0, 16],
		rating: "Alle",
		wheelchair: "no",
		equipment: [],
	});

	function resetFilter(){
		state.distance = [0]; 
		state.age = [0, 16]; 
		state.rating = "Alle"; 
		state.wheelchair = "no"; 
		state.equipment = []; 
	}
	return { state, resetFilter };
});
