<script setup lang="ts">
import type { RouterLink } from "@/router/link-routes";

interface Props {
    links : RouterLink[];
    title?: string;
}

const props = defineProps<Props>();

</script>

<template>
    <nav>
        <img src="@/assets/logo.svg" alt="Vue Logo" height="30" width="30">
        <span>{{ props.title || "Vue 3" }}</span>

        <RouterLink
            v-for="link of links"
            :key="link.path"
            :to="link.path"
        >
            {{ link.title }}
        </RouterLink>

    </nav>
</template>


<style scoped>
nav {
    align-items: flex-start;
    display: flex;
    font-size: 1rem;
    margin-top: 2rem;
    text-align: center;
    width: 100vw;
}

img {
    margin-right: .5rem;
}

span {
    margin-right: 1rem;
}

a {
    margin-right: .5rem;
}

span {
    text-decoration: underline;
}
</style> 