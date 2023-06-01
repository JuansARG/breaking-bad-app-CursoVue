<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Result as Character } from '../interfaces/character';
import characterStore from "@/store/characters.store";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import { useQuery } from '@tanstack/vue-query';


const route = useRoute();
const { id } = route.params as { id: string };

const getCharacterCacheFirst = async(): Promise<Character> => {
    if( characterStore.checkIdInStore(id) ){
        return characterStore.ids.list[id];
    }

    const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`);
    return data;
}

const { data: character } = useQuery(
    [`character/${id}`],
    // si nesesito pasarle parametros a la queryFn se hace asi
    // () => getCharacterCacheFirst(id) 
    getCharacterCacheFirst,
    {
        onSuccess( character ){
            characterStore.loadedCharacter( character );
        },

    }
);

</script>

<template>
    <h1 v-if="!character">Loading...</h1>

    <div class="container" v-else>
        <h1>{{ character.name }}</h1>
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