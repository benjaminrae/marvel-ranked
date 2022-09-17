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
            console.log(response);
        });

        marvelService.getMarvelCharacter(offset2).then((response) => {
            setCharacter2(response);
            console.log(response);
        });
    };
    return (
        <div className="app">
            <Header />
            <Button innerText="Start" onClick={handleStart} />
        </div>
    );
};

export default App;
