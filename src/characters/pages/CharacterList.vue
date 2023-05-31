<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Result as Character, CharactersResponse } from "../interfaces/character";
import CardList from "@/characters/components/CardList.vue";
import characterStore from "@/store/characters.store";
import { isAxiosError } from "axios";

const props = defineProps<{
    title: string;
    visible: boolean;
}>();

const getCharactersCacheFirst = async (): Promise<Character[]> => {
    if (characterStore.characters.count > 0) return characterStore.characters.list;

    const { data: { results: characters } } = await rickAndMortyApi.get<CharactersResponse>("character");
    return characters;
};

useQuery(
    ["characters"], 
    getCharactersCacheFirst, {
    //! @deprecated
    onSuccess(data) {
        if (characterStore.characters.list === data) return;
        characterStore.loadedCharacters(data);
    },
    //! @deprecated
    onError(error) {
        if(isAxiosError(error)) {
                characterStore.loadCharactersFailed(error.message);
            }else{
                characterStore.loadCharactersFailed("Algo ha salido mal mientras se cargaban los datos...");
            }
    },
});
</script>

<template>
    <div>
        <h3 v-if="characterStore.characters.isLoading">Cargando...</h3>
        <div v-else-if="characterStore.characters.isError">
            <h3>Error al cargar!</h3>
            <p>{{ characterStore.characters.errorMessage }}</p>
        </div>
        <template v-else>
            <h2>{{ props.title }}</h2>
            <CardList :characters="characterStore.characters.list" />
        </template>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    font-size: 2rem;
}
</style>
