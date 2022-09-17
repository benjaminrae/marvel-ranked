import React from "react";
import Button from "../Button/Button";
import "./Character.css";
import { Character } from "./services/marvel";

type CharacterProps = {
    character: Character;
};
const CharacterCard = ({ character }: CharacterProps): JSX.Element => {
    return (
        <div>
            <img
                src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                alt={character.name}
            />
            <h2>{character.name}</h2>
            <Button onClick={() => {}} innerText="vote" />
        </div>
    );
};

export default CharacterCard;
