import React, { useEffect } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Header from "./components/Header/Header";
import { marvelService } from "./services/marvel";

const App = (): JSX.Element => {
    const handleStart = (event: React.MouseEvent<HTMLButtonElement>) => {};
    return (
        <div className="app">
            <Header />
            <Button
                innerText="Start"
                onClick={() => {
                    console.log("start");
                }}
            />
        </div>
    );
};

export default App;
