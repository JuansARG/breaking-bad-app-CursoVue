import { onMounted, ref } from "vue";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { CharactersResponse, Result as Characters } from "../interfaces/character";
import axios from "axios";

const isLoading = ref<boolean>(true);
const characters = ref<Characters[]>([]);
const isError = ref<boolean>(false);
const errorMessage = ref<string>();

export const useCharacters = () => {

    onMounted( async() => {
        await loadCharacters();
    })

    const loadCharacters = async() => {

        if( characters.value.length > 0 ) return;

        isLoading.value = true;

        try {

            const { data: { results } } = await rickAndMortyApi.get<CharactersResponse>("/character");
            characters.value = results;
            isLoading.value = false;
            
        } catch (error) {
            isLoading.value = false;
            isError.value = true;

            if( axios.isAxiosError(error) ){
                return errorMessage.value = error.message;
            }

            errorMessage.value = "Algo salio mal en el useCharacters...";
        }
    }

    return {
        characters,
        isLoading,
        isError,
        errorMessage,
        loadCharacters
    };
};
