<script setup lang="ts">
type Props = {
	modelValue: string[];
	options: { value: string; label: string }[];
};
type Emits = {
	(e: "update:modelValue", selected: string[]): void;
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function update(key: string) {
	const exists = props.modelValue.find((val) => val === key);

	if (exists) {
		emit(
			"update:modelValue",
			props.modelValue.filter((val) => val === key)
		);
	} else {
		emit("update:modelValue", props.modelValue.concat(key));
	}
}
</script>

<template>
	<va-chip
		v-for="option in props.options"
		:key="option.value"
		@click="update(option.value)"
		:outline="!props.modelValue.find((val) => val === option.value)"
		class="m-1"
	>
		{{ option.label }}
	</va-chip>
</template>
