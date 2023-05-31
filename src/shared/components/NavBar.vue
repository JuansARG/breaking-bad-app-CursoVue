<script setup lang="ts">
import type { RouterLink } from "@/router/link-routes";

interface Props {
    links    : RouterLink[];
    title?   : string;
    showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showIcon: true,
    links: () => [],
});

</script>

<template>
    <nav>
        <img 
            v-if="props.showIcon" 
            src="@/assets/logo.svg" 
            alt="Vue Logo" 
            height="30" 
            width="30">
        <span v-if="props.title" >{{ props.title }}</span>

        <RouterLink
            v-for="link of links"
            :key="link.path"
            :to="link.path"
        >
        {{ link.title }} |
        </RouterLink>

    </nav>
</template>


<style scoped>
nav {
    align-items: flex-start;
    display: flex;
    font-size: 1rem;
    padding-top: 2rem;
    text-align: center;
    width: 100vw;
}

img, a {
    padding-right: .5rem;
}

span {
    padding-right: 1rem;
}

span {
    text-decoration: underline;
}
</style> 