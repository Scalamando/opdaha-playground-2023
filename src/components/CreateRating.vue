<script setup lang="ts">
import {ref} from 'vue';


const rating_titel = ref('');
const rating_text = ref('');
const own_pg_rating = ref(0);

function post_rating(){
    // push
    // own_pg_rating
    // rating_titel
    // rating_text
}

</script>

<template>
    <div class="flex flex-col">
        <div class="flex flex-col">
            <h6 class="mb-4 text-base font-semibold">Bewertung erstellen</h6>
            <va-rating v-model="own_pg_rating" :readonly="false"  color="gold" :size="40"/>
        </div>
        <!-- open when star is set -->
        <div v-if=" own_pg_rating != 0" class="w-full py-4">
            <h6 class="mb-4 text-base font-semibold">Titel</h6>
            <va-input v-model="rating_titel" class="mb-4" placeholder="Wichtigste Information"/>
            <h6 class="mb-4 text-base font-semibold">Beschreibung</h6>
            <va-input v-model="rating_text" :max-length="200" counter type="textarea"  placeholder="Was hat gefallen / nicht gefallen?" class="mb-4 w-full" />
            <va-button icon-right="send" class="pt-4 w-full" @click="post_rating()">Senden</va-button>
        </div>
        
    </div>
</template>

