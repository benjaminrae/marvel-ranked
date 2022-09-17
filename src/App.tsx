import React, { useEffect } from "react";
import { JsxElement } from "typescript";
import "./App.css";
import Header from "./components/Header/Header";
import { marvelService } from "./services/marvel";
const App = (): JSX.Element => {
    useEffect(() => {
        marvelService.getMarvelCharacter(10);
    }, []);
    return (
        <div className="app">
            <Header />
        </div>
    );
};

export default App;
