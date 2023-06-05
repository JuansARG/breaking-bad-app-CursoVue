import { computed, ref } from "vue";
import type { Result as Character } from '../interfaces/character';
import rickAndMortyApi from "@/api/rickAndMortyApi";
import { useQuery } from "@tanstack/vue-query";
import type { AxiosError } from "axios";


const isError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const characterSet = ref<{ [id: string]: Character }>({});

const getCharacter = async( id: string ): Promise<Character> => {

    if( characterSet.value[id] ) return characterSet.value[id];

    try {
        const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`)
        return data;
    } catch (error) {
        throw new Error(`No se encontro un personaje con id ${id}`);
    }
};

const loadedWithError = ( error: string ) => {
        isError.value = true;
        errorMessage.value = error;
};

const loadedCharacter = ( character: Character ) => {
    isError.value = false;
    errorMessage.value = null;
    characterSet.value[character.id] = character;
};

const useCharacter = ( id: string ) => {
    
    const { isLoading } = useQuery(
        [`character/${id}`],
        () => getCharacter(id),
        {   
            onSuccess: ( character ) => {
                loadedCharacter( character! );
            },
            onError: ( error: AxiosError ) => {
                loadedWithError( error.message );
            },
        }
    );
    
    return {
        // Properties
        errorMessage,
        isError,
        isLoading,
        list: characterSet,

        // Getters
        character: computed<Character | null>(() => characterSet.value[id]),

        // Methods
    }
};

export default useCharacter;