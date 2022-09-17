import "./Header.css";

import React from "react";

const Header = () => {
    return (
        <div className="header">
            <h1 className="header__title">
                <span className="caps">Marvel</span>{" "}
                <span className="border-top-bottom">Ranking</span>
            </h1>
            <nav className="header__nav">
                <ul className="nav__ul">
                    <li className="ul__li">Leaderboard</li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
