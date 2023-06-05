import { computed, ref } from 'vue';
import type { Result as Character, CharactersResponse } from '../interfaces/character';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import { useQuery } from '@tanstack/vue-query';


const characters    = ref<Character[]>([]);
const errorMessage  = ref<string | null>(null);
const isError       = ref<boolean>(false);

const getCharacters = async (): Promise<Character[]> => {
    if ( characters.value.length > 0 ) 
    return characters.value;

    const { data: { results: charactersList } } = await rickAndMortyApi.get<CharactersResponse>("character");
    return charactersList;
};

const loadedCharacters = ( data: Character[] ) => {
    errorMessage.value = null;
    isError.value = false;
    characters.value = data.filter( character => ![19].includes(character.id) );
};

const useCharacters = () => {

    const { isLoading } = useQuery(
        ["characters"],
        getCharacters, 
        {
            onSuccess(data) {
                loadedCharacters(data);
            },
        }
    );


    return {
        // Properties
        characters,
        errorMessage,
        isError,
        isLoading,

        // Getters
        count: computed(() => characters.value.length),

        // Methods
    }
};

    export default useCharacters;