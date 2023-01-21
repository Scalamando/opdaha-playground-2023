<script setup lang="ts">
import { ref, watch } from "vue";

type Props = {
	modelValue: string[];
	options: { value: string; label: string }[];
};
type Emits = {
	(e: "update:modelValue", selected: string[]): void;
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selected = ref<{ [key: string]: boolean }>(
	props.options.reduce((all, opt) => ({ ...all, [opt.value]: false }), {})
);
watch(
	selected,
	(newSelected) => {
		const selectedArr = Object.entries(newSelected)
			.filter(([_, value]) => value)
			.map(([key]) => key);
		emit("update:modelValue", selectedArr);
	},
	{ deep: true }
);
</script>

<template>
	<va-chip
		v-for="option in props.options"
		:key="option.value"
		@click="() => (selected[option.value] = !selected[option.value])"
		:outline="!selected[option.value]"
		class="m-1"
	>
		{{ option.label }}
	</va-chip>
</template>
