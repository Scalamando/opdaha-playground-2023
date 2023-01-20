import { ref } from "vue";

export type Station = {
	id: number;
	name: string;
	images: string[];
	location: [number, number];
};

export function useAllStations() {
	return ref<Station[]>([
		{
			id: 1,
			name: "Bla",
			images: ["https://picsum.photos/300/200", "https://picsum.photos/300/200"],
			location: [10.637646233333333, 53.851657200000005],
		},
	]);
}
