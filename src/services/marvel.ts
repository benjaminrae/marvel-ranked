import axios from "axios";

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
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

export const marvelService = {
    maxOffset: maxOffset,
    getMarvelCharacter,
};
