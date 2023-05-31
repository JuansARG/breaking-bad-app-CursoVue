<script setup lang="ts">
// import { useCharacters } from "../composables/useCharacters";
import { useQuery } from "@tanstack/vue-query"; 
import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { CharactersResponse, Result as Character } from "@/characters/interfaces/character";
import CharacterCard from "./CharacterCard.vue";

//! 1- Normal suspense
// const { data: { results: characters } } = await rickAndMortyApi.get<CharactersResponse>("/character");

//! 2- Composable functions
// const { characters, isLoading, isError, errorMessage } = useCharacters();

//! 3- TanStack Vue-Query
const getCharactersSlow = async(): Promise<Character[]> => {

    return new Promise( (resolve) => {
        setTimeout( async() => {
            const { data: { results: charactersList } } = await rickAndMortyApi.get<CharactersResponse>("/character");
            resolve(charactersList.filter( character => ![19].includes( character.id ) ));
        }, 1000);
    })

};

const { isLoading, isError, data: characters, error } = useQuery(
    ["character"],
    getCharactersSlow,
    {
        cacheTime: 1000 * 60,
        refetchOnReconnect: "always"
    }
);

</script>

<template>
    <h3 v-if="isLoading">Cargando...</h3>
    <h3 v-if="isError">{{ error }}</h3>
    <div class="card-list">
        
        <CharacterCard 
            v-for="character of characters" 
            :key="character.id"
            :character="character"
        />

    </div>
</template>

<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 80%;
}
</style>