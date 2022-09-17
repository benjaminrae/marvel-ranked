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
            <div className="image__container">
                <img
                    src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="character__image"
                />
                <div className="image__overlay">
                    <p className="character__description">
                        {character.description
                            ? character.description
                            : "No description available"}
                    </p>
                </div>
            </div>
            <h2 className="character__title">{character.name}</h2>

            <Button onClick={handleVoteClick} innerText="vote" />
        </div>
    );
};

export default CharacterCard;
