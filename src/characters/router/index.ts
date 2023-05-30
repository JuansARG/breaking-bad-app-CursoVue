import type { RouteRecordRaw } from "vue-router";
import CharacterLayout from "@/characters/layout/CharacterLayout.vue";
import CharacterId from "@/characters/pages/CharacterId.vue";
import CharacterList from "../pages/CharacterList.vue";
import CharacterSearch from "../pages/CharacterSearch.vue";

export const characterRoute: RouteRecordRaw = {
    path: "/characters",
    component: CharacterLayout,
    children: [
        { 
            path: "by/id",
            name: "character-id",
            component: CharacterId,
            props: {
                title: "Por Id",
                visible: false,
            }
        },
        { 
            path: "list",
            name: "character-list",
            component: CharacterList,
            props: {
                title: "Lista",
                visible: true,
            }
        },
        { 
            path: "search",
            name: "character-search",
            component: CharacterSearch,
            props: {
                title: "Busqueda",
                visible: true,
            }
        }
    ],
    redirect: "/characters/list"
}