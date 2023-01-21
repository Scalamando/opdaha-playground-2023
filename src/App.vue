<script setup lang="ts">
import { RouterView } from "vue-router";
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
	min-height: 100vh;
	height: 100%;
	width: 100%;
	background-color: #FFFFFF;
};
</style>
