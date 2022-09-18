import React from "react";
import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading">
            <h2>Loading</h2>
            <div className="loading__bar-outer">
                <div className="loading__bar-inner"></div>
            </div>
        </div>
    );
};

export default Loading;
