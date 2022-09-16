import React from "react";
import { JsxElement } from "typescript";
import "./App.css";
import Header from "./components/Header/Header";

const App = (): JSX.Element => {
    return (
        <div className="app">
            <Header />
        </div>
    );
};

export default App;
