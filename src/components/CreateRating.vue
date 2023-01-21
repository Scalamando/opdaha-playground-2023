<script setup lang="ts">
import {ref} from 'vue';
import { sendUserRating }from "@/composables/useUserRating";

type Props = {
	station_id: number;
};
type Emits = {
	(e: "newRating"): void;
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();


const rating_titel = ref('');
const rating_content = ref('');
const own_pg_rating = ref(0);

async function post_rating(){
   
    await sendUserRating(props.station_id, own_pg_rating.value, rating_titel.value, rating_content.value);
    emit('newRating');
}

</script>

<template>
    <div class="flex flex-col">
        <div class="flex flex-col">
            <h6 class="mb-4 text-base font-semibold">Bewertung erstellen</h6>
            <va-rating v-model="own_pg_rating" :readonly="false" color="gold" :size="40"/>
        </div>
        <!-- open when star is set -->
        <div v-if=" own_pg_rating != 0" class="w-full py-4">
            <h6 class="mb-4 text-base font-semibold">Titel</h6>
            <va-input v-model="rating_titel" class="mb-4" placeholder="Wichtigste Information"/>
            <h6 class="mb-4 text-base font-semibold">Beschreibung</h6>
            <va-input v-model="rating_content" :max-length="200" counter type="textarea"  placeholder="Was hat gefallen / nicht gefallen?" class="mb-4 w-full" />
            <va-button icon-right="send" class="pt-4 w-full" @click="post_rating()">Senden</va-button>
        </div>
        
    </div>
</template>

