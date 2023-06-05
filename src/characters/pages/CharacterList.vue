<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";
import useCharacters from '../composables/useCharacters';

const props = defineProps<{
    title: string;
    visible: boolean;
}>();

const { 
     characters,
     count,
     errorMessage,
     isError,
    isLoading 
} = useCharacters();


</script>

<template>
    <div>
        <h3 v-if="isLoading">Cargando...</h3>
        <div v-else-if="isError">
            <h3>Error al cargar!</h3>
            <p>{{ errorMessage }}</p>
        </div>
        <template v-else>
            <h2>{{ props.title }} - {{ count }}</h2>
            <CardList :characters="characters" />
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
