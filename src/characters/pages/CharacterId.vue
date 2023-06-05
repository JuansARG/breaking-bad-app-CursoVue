<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import useCharacter from "../composables/useCharacter";
import { watchEffect } from "vue";


const route = useRoute();
const router = useRouter();

const { id } = route.params as { id: string };
const { character ,errorMessage, isError, isLoading } = useCharacter( id );

watchEffect(() => {
    if( !isLoading.value && isError.value ){
        router.replace('/characters');
    }
});

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="isError">{{ errorMessage }}</h1>

    <div v-else-if="character" class="container">
        <h1>{{ character!.name }}</h1>
        <div class="character-container">
            <img :src="character.image" :alt="character.name">
            <ul>
                <li>Genero: {{ character.gender }}</li>
                <li>Planeta de origen: {{ character.origin.name }}</li>
                <li>Especie: {{ character.species }}</li>
                <li>Estado: {{ character.status }}</li>
                <li>Ubicacion: {{ character.location.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}
.character-container {
    display: flex;
    flex-direction: row;
}

img {
    width: 150px;
    border-radius: 5px;
}
</style>