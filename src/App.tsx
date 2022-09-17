import { response } from "express";
import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import { Character, marvelService } from "./services/marvel";
import { getRandomOffset } from "./utils/getRandomOffset";

const App = (): JSX.Element => {
    const [character1, setCharacter1] = useState<Character[]>();
    const [character2, setCharacter2] = useState<Character[]>();
    const [isStarted, setIsStarted] = useState(false);

    const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
        const offset1 = getRandomOffset();
        let offset2 = getRandomOffset();
        if (offset1 === offset2) {
            offset2 = getRandomOffset();
        }
        marvelService.getMarvelCharacter(offset1).then((response) => {
            setCharacter1(response);
        });

        marvelService.getMarvelCharacter(offset2).then((response) => {
            setCharacter2(response);
        });
        setIsStarted(true);
    };
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                {!isStarted && (
                    <Button innerText="Start" onClick={handleStart} />
                )}
                <section className="main__characters">
                    {character1 && <CharacterCard character={character1[0]} />}
                    {character2 && <CharacterCard character={character2[0]} />}
                </section>
            </main>
        </div>
    );
};

export default App;
