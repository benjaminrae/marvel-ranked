import { response } from "express";
import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import { Character, marvelService } from "./services/marvel";
import { getRandomOffset } from "./utils/getRandomOffset";
import {
    doc,
    FieldValue,
    getDoc,
    setDoc,
    updateDoc,
    increment,
} from "firebase/firestore";
import { db } from "./services/firebase";
import Footer from "./components/Footer/Footer";

const App = (): JSX.Element => {
    const [character1, setCharacter1] = useState<Character[]>();
    const [character2, setCharacter2] = useState<Character[]>();
    const [isStarted, setIsStarted] = useState(false);

    const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
        getAndSetNewCharacters();
    };

    const handleVote = async (character: Character) => {
        const docRef = doc(db, "votes", `${character.id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            await updateDoc(docRef, {
                votes: increment(1),
            });
        } else {
            await setDoc(doc(db, "votes", `${character.id}`), {
                name: character.name,
                votes: 1,
                thumbnailUrl: `${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`,
            });
        }
        // getAndSetNewCharacters();
    };

    const getAndSetNewCharacters = () => {
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
                    {character1 && (
                        <CharacterCard
                            character={character1[0]}
                            onVote={handleVote}
                        />
                    )}
                    {character2 && (
                        <CharacterCard
                            character={character2[0]}
                            onVote={handleVote}
                        />
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default App;
