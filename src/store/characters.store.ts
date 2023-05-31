import { reactive } from "vue";
import type { Result as Character, CharactersResponse } from "@/characters/interfaces/character";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import { isAxiosError } from "axios";

interface Store {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        isError: boolean;
        errorMessage: string | null;
    };
    ids: {
        errorMessage: string | null;
        isError: boolean;
        isLoading: boolean;
        list: {
            [id: string]: Character;
        }
    };

    // Methods
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Character[] ) => void;
    loadCharactersFailed: ( error: string ) => void;
}

// Initial state
const characterStore = reactive<Store>({
    characters: {
        count: 0,
        errorMessage: null,
        isError: false,
        isLoading: true,
        list: []
    },

    ids: {
        errorMessage: "",
        isError: false,
        isLoading: true,
        list: {}
    },

    // Methods
    async startLoadingCharacters(){
        try {
            const { data: { results: characters } } = await rickAndMortyApi.get<CharactersResponse>("character");
        
            this.characters = {
                count: characters.length,
                errorMessage: null,
                isError: false,
                isLoading: false,
                list: characters
            };
        } catch (error) {
            if(isAxiosError(error)) {
                this.loadCharactersFailed(error.message);
            }else{
                this.loadCharactersFailed("Algo ha salido mal mientras se cargaban los datos...");
            }
        }
    },

    loadedCharacters( data ){
        const characters = data.filter( character => ![19].includes( character.id ) );

        this.characters = {
            count: characters.length,
            errorMessage: null,
            isError: false,
            isLoading: false,
            list: characters
        };
    },

    loadCharactersFailed( error ){
        this.characters = {
            count: 0,
            errorMessage: error,
            isError: true,
            isLoading: false,
            list: []
        };
    },
});

characterStore.startLoadingCharacters();
export default characterStore;