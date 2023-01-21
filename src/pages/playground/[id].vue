<script setup lang="ts">
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaChild } from "oh-vue-icons/icons";
import { useRoute } from "vue-router";
import { useGeolocation } from "@vueuse/core";
import { computed, watch} from "vue";
import distance from "@turf/distance";

import { useAsyncState } from "@vueuse/core";

import CreateRating from "@/components/CreateRating.vue";
import { useOneStation } from "@/composables/useStations";

// picture carousel
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";

//import icons
import SliteIcon from "@/assets/icons/slide.png"
import SwingIcon from "@/assets/icons/swing.png"
import ClimbingframeIcon from "@/assets/icons/klettergerust.png"
import SandpitIcon from "@/assets/icons/sandkasten.png"
import SeesawIcon from "@/assets/icons/wippe.png"
import WasserIcon from "@/assets/icons/wasser.png"
import KaruselIcon from "@/assets/icons/merry-go-round.png"
import SpielhausIcon from "@/assets/icons/spielplatz.png"
import FederIcon from "@/assets/icons/kinderfahrt.png"

import CafeIcon from "@/assets/icons/coffee-cup.png"
import RestaurantIcon from "@/assets/icons/restaurant.png"
import BakeryIcon from "@/assets/icons/backerei.png"
import wcIcon from "@/assets/icons/wc-sign.png"
import kioskIcon from "@/assets/icons/kiosk.png"
import shoppingIcon from "@/assets/icons/shopping-cart.png"

import bankIcon from "@/assets/icons/bench.png"
import untergrundIcon from "@/assets/icons/sand.png"
import schattenIcon from "@/assets/icons/shadow.png"
import zaunIcon from "@/assets/icons/picket.png"
import grunIcon from "@/assets/icons/nature.png"

import wheelchairIcon from "@/assets/icons/disability.png"
import noWheelchairIcon from "@/assets/icons/warning.png"
import limitedWheelchairIcon from "@/assets/icons/limited.png"

addIcons(FaChild);

const route = useRoute();

const { state: station, execute } = useAsyncState(() => useOneStation(Number(route.params.id)), null);

function openLocationInMaps({lat , lng }: {lat : number, lng : number}){

  window.open( 'https://google.com/maps/dir/?api=1&destination=' + lat +',' + lng , '_blank', 'noreferrer')
}

//callculate distance to playground
const { coords } = useGeolocation();
const curDistance = computed(() =>
	coords.value && station.value ? distance([coords.value.longitude, coords.value.latitude], [Number(station.value.location[0]), Number(station.value.location[1])]) : 0
);

//const pg_rating = 4; // todo
const pg_rating = computed(() => station.value?.userRatings.length ? station.value.userRatings.reduce((sum,rating) => sum + rating.rating, 0)/station.value.userRatings.length : 0)
watch(pg_rating, console.log);



// mock
const adress = "Ratzeburger Allee 92a";
const busstation = "Kahlhorstraße";
const alerts = [
	{ type: "warning", content: "Schaukel aktuell kaputt" },
	{ type: "message", content: "Wasserspiele von 10:00-16:00" },
];

let own_pg_rating = 0;
const user_ratings = [
	{ name: "Indrani Neufeld", rating: 5, content: "Bester Spielplatz" },
	{ name: "Anonymous User", rating: 4, content: "Haha, toller Spielplatz" },
];

const imageMap = {
	slide: SliteIcon,
    swing: SwingIcon,
    climbingframe: ClimbingframeIcon,
    sandpit: SandpitIcon,
    seesaw: SeesawIcon,
    springy: FederIcon,
    playhouse: SpielhausIcon,
    roundabout: KaruselIcon,
    water: WasserIcon,
}
const imageSorroundings ={
	cafe: CafeIcon,
    restaurant: RestaurantIcon,
    bakery: BakeryIcon,
    shopping: shoppingIcon,
    kiosk: kioskIcon,
    toilet: wcIcon,
}
const imageExtra={
	bench: bankIcon,
	ground: untergrundIcon,
	shade: schattenIcon,
	fence: zaunIcon,
	greenery: grunIcon
}
const imageWheelchair={
	yes: wheelchairIcon,
	no: noWheelchairIcon,
	limited: limitedWheelchairIcon
}

const tranlsations = {
  surroundings: {
    "restaurant": "Restaurant",
    "toilet": "Toilette",
    "shopping": "Einkaufen",
    "cafe": "Cafe",
    "bakery": "Bäkerei",
    "kiosk": "Kiosk",
  },
  equipment: {
    "slide": "Rutsche",
		"swing": "Schaukel",
		"climbingframe": "Klettergerüst",
		"sandpit": "Sandkasten",
		"seesaw": "Wippe",
		"springy": "Feder-Wippe",
		"playhouse": "Spielhaus",
		"roundabout": "Karusel",
		"water": "Wasser",
  },
}

</script>

<template>
	<div v-if="station">
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
				v-viewer.static="{ toolbar: false, navbar: false, title: (img: HTMLImageElement) => img.alt }"
			>
				<SwiperSlide v-for="(image, index) in station.images" :key="index">
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
					<h4 class="va-h4">{{ station.name }}</h4>
					<div class="flex">
						<div class="flex flex-none pr-4">
							<va-icon class="flex-none" name="location_on" color="gray" />
							<p class="text-gray-500">{{ curDistance.toFixed(2) }} km</p>
						</div>
						<div class="flex">
							<OhVueIcon name="fa-child" color="gray" class="flex-none"></OhVueIcon>
							<p class="text-gray-500">{{ station.minAge }} - {{ station.maxAge }}Jahre</p>
						</div>
					</div>
					<va-rating :readonly="true" v-model="pg_rating" color="primary" class="py-4"></va-rating>
				</div>
				<va-button class="bg-primary h-12 flex-none" @click="openLocationInMaps({lat: station!.location[1], lng: station!.location[0]})">
					<va-icon class="mr-2" name="location_on" color="#FFFFFF" />
				</va-button>
			</div>
			<!-- messages/ additional info -->
			<div class="flex py-4">
				<div class="flex">
					<va-card v-for="alert in alerts" class="row mx-4 w-1/2 !shadow-none" color="accent">
						<va-card-content class="mx-4 flex h-full items-center justify-center px-4">
							<va-icon v-if="alert.type === 'warning'" name="error" class="pr-5 pl-2" />
							<va-icon v-else name="info" class="pr-5 pl-2" />
							{{ alert.content }}</va-card-content
						>
					</va-card>
				</div>
			</div>

			<div class="flex py-4">
				<div class="w-full">
					<h4 class="va-h6">Umgebung</h4>
					<div class="grid grid-cols-3 text-center">
						<va-card
							v-for="item in station.surroundings"
							class="mx-4 my-3 py-4 !shadow-none"
							color="accent"
						>
							<img :src="imageSorroundings[item]" alt="" class="flex mx-auto w-8"/>
							<va-card-content class="py-4"> {{ tranlsations.surroundings[item] }}</va-card-content>
						</va-card>
					</div>
				</div>
			</div>

			<div class="flex py-4">
				<div class="w-full">
					<h4 class="va-h6">Barrierefreiheit</h4>
					<div class="grid grid-cols-3 text-center">
						<va-card class="mx-4 my-3 py-4 !shadow-none" color="accent">
							<va-card-content class="py-4"> {{ station.wheelchair ?? 'Unbekannt'}}</va-card-content>
						</va-card>
					</div>
				</div>
			</div>

			<div class="flex py-4">
				<div class="w-full">
					<h4 class="va-h6">Spielgeräte</h4>
					<div class="grid grid-cols-3 text-center">
						<va-card v-for="item in station.equipments" class="mx-4 my-3 py-4 !shadow-none" color="accent">

							<img :src="imageMap[item]" alt="" class="flex mx-auto w-8"/>

							<va-card-content class="py-4"> {{ tranlsations.equipment[item] }}</va-card-content>
						</va-card>
					</div>
				</div>
			</div>

			<div class="mt-8">
				<h4 class="va-h4">Standort</h4>
				<div class="flex pb-6 mt-6">
					<va-icon name="location_on" class="mr-2 flex-none" />
					<p>{{ adress }}</p>
					<va-icon name="directions_bus" class="mr-2 flex-none" />
					<p>{{ busstation }}</p>
				</div>
				<va-button class="w-full" @click="openLocationInMaps({lat: station!.location[1], lng: station!.location[0]})">Route in Maps öffnen</va-button>
			</div>
			<div class="mt-8">
				<h4 class="va-h4">Bewertung</h4>
				<div class="flex py-4">
					<CreateRating :station_id="station.id" @newRating="execute()"/>
				</div>
				<!-- user ratings -->
				<h5 class="va-h5">Bewertung anderer Nutzenden</h5>
				<div v-if="station.userRatings.length" v-for="userRating in station.userRatings" class="flex items-center pl-6 pt-4">
					<va-icon name="account_circle" size="4rem" class="flex-none pr-4" />
					<div>
						<h6 class="va-h6">{{ userRating.title }}</h6>
						<va-rating :readonly="true" v-model="userRating.rating" color="primary" />
						<p>{{ userRating.content }}</p>
					</div>
				</div>
        <div v-else>
          <p> Es sind noch keine Bewertungen vorhanden. Sei die erste Person.</p>
        </div>
			</div>
			<va-button class="mt-8 flex w-full justify-center">
				<div class="w-full">
					<va-icon name="warning" class="pr-4" />
					Mängel Melden
				</div>
			</va-button>
		</div>
	</div>
</template>
