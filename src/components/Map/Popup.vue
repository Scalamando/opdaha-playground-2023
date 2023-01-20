<script setup lang="ts">
import { addIcons } from "oh-vue-icons";
import { FaCheckSquare, FaDirections } from "oh-vue-icons/icons";
import { RouterLink } from "vue-router";

type Props = {
	id: number;
	image: string;
	name: string;
};
const props = defineProps<Props>();

addIcons(FaCheckSquare, FaDirections);
</script>

<template>
	<div class="rounded-xl bg-white p-2 shadow-lg">
		<div class="flex items-center gap-2">
			<img :src="props.image" alt="" class="h-14 w-14 rounded-lg bg-slate-100 p-1.5" />
			<div>
				<h2 class="mr-auto text-2xl font-semibold">{{ props.name }}</h2>
			</div>
		</div>
		<RouterLink
			:to="{ name: 'playground-id', params: { id: props.id } }"
			class="bg-slate-900 block w-full rounded-lg py-1.5 text-center text-white shadow-lg"
		>
			Anzeigen
		</RouterLink>
	</div>
</template>
