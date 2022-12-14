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

export type Character = {
    id: number;
    name: string;
    description: string;
    modified?: Date;
    resourceURI?: string;
    urls?: {
        type?: "string";
        url?: "string";
    }[];
    thumbnail: {
        path: string;
        extension: string;
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
const modifiedSince = "2000-01-01T00%3A00%3A00";
const modifiedSinceMaxOffset = 768;

const getMarvelCharacter = async (offset: number) => {
    const request = axios.get(
        `${baseEndpoint}${charactersEndpoint}?limit=1&offset=${offset}&modifiedSince=${modifiedSince}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_API_KEY}`
    );
    return await request
        .then((response): CharacterDataWrapper => {
            return response.data.data.results;
        })
        .catch((error) => {
            return error;
        });
};

export const marvelService = {
    maxOffset: modifiedSinceMaxOffset,
    getMarvelCharacter,
};
