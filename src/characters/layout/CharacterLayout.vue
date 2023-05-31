<script setup lang="ts">
import NavBar from "@/shared/components/NavBar.vue";
import { characterRoute } from "../router/index";
import type { RouterLink } from "../../router/link-routes";

/*
    En las siguientes lineas podemos ver 3 casteo,
    la (routeLink.props as { visible: boolean })
    aqui casteamos las props como un objeto que tiene una propiedad 'visible': boolean,
    el motivo de hacer esto es que typescript no reconoce a el objeto props como tal.
    Luego de hacer esto podemos acceder a la propiedad mediante .visible.
    Por otro lado (route.name as string) este casteo lo hacemos porque la propiedad name 
    es enrealidad RouteRecordName, por  consecuente lo casteamos a string para que coincida con la interfaz
    RouterLink, quien tiene una propiedad name: string.
    Por ultimo con (route.props as { title: string }).title, pasa lo mismo que en primer punto.
    No reconoce que props es un objeto que tiene una propiedad title: string, por ende
    lo casteamos indicandole que luce 'as { title: string }' y posterimente accedemos a dicha propiedad
    con .title
*/
const routeLinks: RouterLink[] = characterRoute.children!
    .filter(routeLink => (routeLink.props as { visible: boolean }).visible)
    .map(route => {
        return {
            name: (route.name as string),
            path: route.path,
            title: (route.props as { title: string }).title
        }
    });

</script>

<template>
    <div>
        <h1>Personajes</h1>
    </div>

    <!-- NavBar -->
    <NavBar :show-icon="false" :links="routeLinks" />

    <!-- RouterView + Suspense -->
    <Suspense>
        <RouterView/>
    </Suspense>
</template>

<style scoped>
div {
    display: flex;
    justify-content: center;
}

h1 {
    text-decoration: underline;
}
</style>