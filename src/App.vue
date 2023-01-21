<script setup lang="ts">
import { RouterView } from "vue-router";
// Viewport height hack for mobile
function setViewportHeight() {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setViewportHeight();
window.addEventListener("resize", setViewportHeight, { passive: true });


</script>

<template>
	<head>
		<link
			href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap"
			rel="stylesheet"
			>
		<link
			href="https://fonts.googleapis.com/icon?family=Material+Icons"
			rel="stylesheet"
			>
	</head>
	<RouterView />
</template>

<style>
html,
body,
#app {
	min-height: calc(var(--vh,1vh)*100) !important;
	height: 100%;
	width: 100%;
	@apply bg-slate-100;
};
</style>
