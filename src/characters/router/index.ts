import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "@/characters/layout/CharacterLayout.vue";
import CharacterId from "@/characters/pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

const ROUTE_NAME = "/characters"; 

export const characterRoute: RouteRecordRaw = {
    path: `${ ROUTE_NAME }`,
    component: CharacterLayout,
    children: [
        { 
            path: `${ ROUTE_NAME }/by/:id`,
            name: "character-id",
            component: CharacterId,
            props: {
                title: "Por Id",
                visible: false,
            }
        },
        { 
            path: `${ ROUTE_NAME }/list`,
            name: "character-list",
            component: CharacterList,
            props: {
                title: "Lista",
                visible: true,
            }
        },
        { 
            path: `${ ROUTE_NAME }/search`,
            name: "character-search",
            component: CharacterSearch,
            props: {
                title: "Busqueda",
                visible: true,
            }
        }
    ],
    redirect: `${ ROUTE_NAME }/list`
}