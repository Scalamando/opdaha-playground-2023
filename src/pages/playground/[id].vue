<script setup lang="ts">
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaChild } from "oh-vue-icons/icons";
import { useRoute } from "vue-router";

// picture carousel
import { useOneStation } from "@/composables/useStations";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";

addIcons(FaChild);

const route = useRoute();
const station = useOneStation(Number(route.params.id));

// mock data
const name = "Ratzeburger";
const distance = "500";
const ageRange = "2-12";

const surroundings = ["Cafe", "Supermarkt", "Parkplatz"];
const wheelchair = "limited";
const equipment = ["Rutsche", "Schaukel", "Wippe", "Klettergerüst", "Sandkasten", "Varjo XR-3"];
const adress = "Ratzeburger Allee 92a";
const busstation = "Kahlhorstraße";
const pg_rating = 4;
const alerts = [
	{ type: "warning", content: "Die Schaukel ist kaputt" },
	{ type: "message", content: "Wasserspiele von 10:00 bis 16:00" },
];

let own_pg_rating = 0;
const user_ratings = [
	{ name: "Indrani Neufeld", rating: 5, message: "Bester Spielplatz" },
	{ name: "Anonymous User", rating: 4, message: "Haha, toller Spielplatz" },
];
const images = [
	{ url: "https://picsum.photos/600/400", width: 600, height: 400 },
	{ url: "https://picsum.photos/500/350", width: 500, height: 350 },
];
</script>

<template>
	<nav class="absolute top-2 left-2 z-50 h-12 items-center">
		<a
			@click.prevent="$router.back()"
			class="flex content-center items-center rounded-full bg-white py-4 px-4"
		>
			<va-icon name="arrow_back_ios" />
		</a>
	</nav>
	<div>
		<Swiper
			:slides-per-view="1.15"
			:space-between="8"
			centered-slides
			centered-slides-bounds
			css-mode
			class="mb-4"
			v-viewer.static="{ toolbar: false, navbar: false, title: (img : HTMLImageElement) => img.alt }"
		>
			<SwiperSlide v-for="(image, index) in images" :key="index">
				<img
					:src="image.url"
					width="500"
					height="250"
					:alt="'Ein Bild von einem Spielplatz'"
					class="h-[250px] w-[500px] rounded-b-xl object-cover"
				/>
			</SwiperSlide>
		</Swiper>
	</div>
	<div class="p-2">
		<div class="flex items-center">
			<div>
				<!-- name, distance and age -->
				<h2 class="va-h2">{{ name }}</h2>
				<div class="flex">
					<div class="flex flex-none pr-4">
						<va-icon class="flex-none" name="location_on" color="gray" />
						<p>{{ distance }}m</p>
					</div>
					<div class="flex">
						<OhVueIcon name="fa-child" color="gray" class="flex-none"></OhVueIcon>
						<p>{{ ageRange }} Jahre</p>
					</div>
				</div>
				<va-rating v-model="pg_rating" color="gold" class="py-4"></va-rating>
			</div>
			<va-button class="bg-primary h-12 flex-none">
				<va-icon class="mr-2" name="location_on" color="#FFFFFF" />
			</va-button>
		</div>
		<!-- messages/ additional info -->
		<div class="flex py-4">
			<div
				v-for="alert in alerts"
				class="text-cente m-2 flex w-full rounded-md border-2 border-solid p-2"
				:class="{
					'border-rose-400, text-rose-400': alert.type === 'warning',
					'border-blue-400, text-blue-400': alert.type === 'message',
				}"
			>
				<va-icon v-if="alert.type === 'warning'" name="warning" class="p-2" size="2rem" />
				<p class="text-xl font-bold">{{ alert.content }}</p>
			</div>
		</div>
		<div class="flex py-4">
			<div class="w-full">
				<h4 class="va-h4">Umgebung</h4>
				<va-chip v-for="item in surroundings" class="m-1" color="gray">{{ item }}</va-chip>
			</div>
			<va-divider vertical color="gray" class="mx-6 flex-none" />
			<div class="w-full">
				<h4 class="va-h4">Barrierefreiheit</h4>
				<va-chip color="gray">{{ wheelchair }}</va-chip>
			</div>
		</div>
		<div>
			<h4 class="va-h4">Spielgeräte</h4>
			<va-chip v-for="item in equipment" class="m-1" color="gray">{{ item }}</va-chip>
		</div>
		<div>
			<h4 class="va-h4">Standort</h4>
			<div class="flex pb-4">
				<va-icon name="location_on" class="mr-2 flex-none" />
				<p>{{ adress }}</p>
				<va-icon name="directions_bus" class="mr-2 flex-none" />
				<p>{{ busstation }}</p>
			</div>
			<va-button class="w-full">Route in Maps öffnen</va-button>
		</div>
		<div>
			<h4 class="va-h4">Bewertung</h4>
			<div class="flex py-4">
				<!-- Rating Component -->
				<va-rating v-model="own_pg_rating" color="gold" />
				<va-button class="flex-none">
					<va-icon name="warning" class="pr-4" />
					Melden
				</va-button>
			</div>
			<!-- user ratings -->
			<div v-for="user in user_ratings" class="flex items-center pl-6 pt-6">
				<va-icon name="account_circle" size="4rem" class="flex-none pr-4" />
				<div>
					<h6 class="va-h6">{{ user.name }}</h6>
					<va-rating v-model="user.rating" color="gold" />
					<p>{{ user.message }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
