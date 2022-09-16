import "./Header.css";

import React from "react";

const Header = () => {
    return (
        <div className="header">
            <h1 className="header__title">
                <span className="caps">Marvel</span>{" "}
                <span className="border-top-bottom">Ranking</span>
            </h1>
        </div>
    );
};

export default Header;
