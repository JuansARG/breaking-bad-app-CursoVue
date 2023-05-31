<script setup lang="ts">
import { useCharacters } from "../composables/useCharacters";


// import rickAndMortyApi from "@/api/rickAndMortyApi";
// import type { CharactersResponse } from "@/characters/interfaces/character";

// const { data: { results: characters } } = await rickAndMortyApi.get<CharactersResponse>("/character");

const { characters, isLoading, hasError, errorMessage } = useCharacters();

</script>

<template>
    <h3 v-if="isLoading">Cargando...</h3>
    <h3 v-if="hasError">{{ errorMessage }}</h3>
    <ul>
        <li 
            v-for="{ id, name } of characters" 
            :key="id"
        >{{ name }}</li>
    </ul>
</template>

<style scoped></style>