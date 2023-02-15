<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
// Viewport height hack for mobile
function setViewportHeight() {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
}
onMounted(() => setTimeout(setViewportHeight, 500));
window.addEventListener("resize", setViewportHeight, { passive: true });
</script>

<template>
	<head>
		<link
			href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap"
			rel="stylesheet"
		/>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
	</head>
	<RouterView />
</template>

<style>
html,
body,
#app {
	height: calc(var(--vh, 1vh) * 100) !important;
	width: 100%;
	background-color: #ffffff;
}
</style>
