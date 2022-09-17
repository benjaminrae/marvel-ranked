import { marvelService } from "../services/marvel";

export const getRandomOffset = () => {
    return Math.floor(Math.random() * marvelService.maxOffset + 1);
};
