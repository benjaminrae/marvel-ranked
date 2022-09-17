import axios from "axios";

type CharacterDataWrapper = {
    code?: number;
    status?: string;
    copyright?: string;
    attributionText?: string;
    attributionHTML?: string;
    data?: CharacterDataContainer;
    etag?: string;
};

type CharacterDataContainer = {
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    results: Character[];
};

type Character = {
    id?: number;
    name?: string;
    description?: string;
    modified?: Date;
    resourceURI?: string;
    urls?: {
        type?: "string";
        url?: "string";
    }[];
    thumbnail?: {
        path?: string;
        extension?: string;
    };
    comics?: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: {
            resourceURI?: string;
            name?: string;
        }[];
    };

    stories?: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: {
            resourceURI?: string;
            name?: string;
            type?: string;
        }[];
    };
    events?: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: {
            resourceURI?: string;
            name?: string;
        }[];
    };
    series: {
        available?: number;
        returned?: number;
        collectionURI?: string;
        items?: {
            resourceURI?: string;
            name?: string;
        }[];
    };
};

const baseEndpoint = "https://gateway.marvel.com/";
const charactersEndpoint = "v1/public/characters";

const maxOffset = 1561;
const getMarvelCharacter = async (offset: number) => {
    console.log("key", process.env.REACT_APP_MARVEL_PUBLIC_API_KEY);
    const request = axios.get(
        `${baseEndpoint}${charactersEndpoint}?limit=1&offset=${offset}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`
    );
    return await request
        .then((response) => {
            const { data } = response as unknown as CharacterDataWrapper;
            return data?.results;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const marvelService = {
    maxOffset: maxOffset,
    getMarvelCharacter,
};
