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
    Timestamp,
    getDoc,
    setDoc,
    updateDoc,
    increment,
} from "firebase/firestore";
import { db } from "./services/firebase";
import Footer from "./components/Footer/Footer";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Loading from "./components/Loading/Loading";
import { off } from "process";

const App = (): JSX.Element => {
    const [character1, setCharacter1] = useState<Character[]>();
    const [character2, setCharacter2] = useState<Character[]>();
    const [isStarted, setIsStarted] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {
        getAndSetNewCharacters();
        setIsLoading(false);
    };

    const onLeaderboardClick = () => {
        setShowLeaderboard(true);
    };

    const onRankClick = () => {
        setShowLeaderboard(false);
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

        getAndSetNewCharacters();
        setIsLoading(false);
    };

    const getAndSetNewCharacters = () => {
        setIsLoading(true);
        const offset1 = getRandomOffset();
        let offset2 = getRandomOffset();
        if (offset1 === offset2) {
            offset2 = getRandomOffset();
        }
        checkCache(offset1).then((response) => {
            if (response) {
                retrieveFromCache(offset1).then((response) => {
                    setCharacter1(response);
                });
            } else {
                marvelService.getMarvelCharacter(offset1).then((response) => {
                    setCharacter1(response);
                    addToCache(offset1, response);
                });
            }
        });

        checkCache(offset2).then((response) => {
            if (response) {
                retrieveFromCache(offset2).then((response) => {
                    setCharacter2(response);
                });
            } else {
                marvelService.getMarvelCharacter(offset2).then((response) => {
                    setCharacter2(response);
                    addToCache(offset2, response);
                });
            }
        });
        setIsStarted(true);
    };

    const checkCache = async (offset: number) => {
        const docRef = doc(db, "cache", `${offset}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    };

    const retrieveFromCache = async (offset: number) => {
        const docRef = doc(db, "cache", `${offset}`);
        const docSnap = await getDoc(docRef);

        const docData = docSnap.data();
        if (docData) return docData.character;
    };

    const addToCache = async (offset: number, response: any) => {
        const ts = Timestamp.now();
        await setDoc(doc(db, "cache", `${offset}`), {
            character: response,
            createdAt: ts,
        });
    };
    return (
        <div className="app">
            <Header
                onLeaderboardClick={onLeaderboardClick}
                onRankClick={onRankClick}
            />
            <main className="app__main">
                {showLeaderboard && <Leaderboard />}
                {!showLeaderboard && isLoading && <Loading />}
                {!showLeaderboard && !isLoading && (
                    <>
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
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;
