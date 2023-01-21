import { defineStore } from "pinia";
import { reactive } from "vue";

export const useFilterStore = defineStore("filter", () => {
	const state = reactive({
		distance: [0],
		age: [0, 5],
		rating: "Alle",
		wheelchair: "no",
		equipment: [],
	});

	return { state };
});
