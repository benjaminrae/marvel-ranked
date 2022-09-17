import React from "react";
import Button from "../Button/Button";
import "./CharacterCard.css";
import { Character } from "../../services/marvel";

type CharacterProps = {
    character: Character;
    onVote: (character: Character) => void;
};
const CharacterCard = ({ character, onVote }: CharacterProps): JSX.Element => {
    const handleVoteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onVote(character);
    };
    return (
        <div className="character">
            <img
                src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                alt={character.name}
                className="character__image"
            />
            <h2 className="character__title">{character.name}</h2>
            <p className="character__description">{character.description}</p>
            <Button onClick={handleVoteClick} innerText="vote" />
        </div>
    );
};

export default CharacterCard;
