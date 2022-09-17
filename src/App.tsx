import { response } from "express";
import { get } from "http";
import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import { Character, marvelService } from "./services/marvel";
import { getRandomOffset } from "./utils/getRandomOffset";

const App = (): JSX.Element => {
    const [character1, setCharacter1] = useState<Character[]>();
    const [character2, setCharacter2] = useState<Character[]>();

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
    };
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Button innerText="Start" onClick={handleStart} />
                <section className="characters">
                    {character1 && (
                        <div>
                            <div>{character1[0].name}</div>
                            <img
                                src={`${character1[0].thumbnail.path}/portrait_uncanny.${character1[0].thumbnail.extension}`}
                                alt={character1[0].name}
                            />
                        </div>
                    )}
                    {character2 && (
                        <div>
                            <div>{character2[0].name}</div>
                            <img
                                src={`${character2[0].thumbnail.path}/portrait_uncanny.${character2[0].thumbnail.extension}`}
                                alt={character2[0].name}
                            />
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default App;
