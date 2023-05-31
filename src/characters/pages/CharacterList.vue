<script setup lang="ts">
import CardList from "@/characters/components/CardList.vue";

const props = defineProps<{
        title: string,
        visible: boolean,
}>();

</script>

<template>
        <div>
                <h2>{{ props.title }}</h2>
                <CardList />
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