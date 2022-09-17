import "./Header.css";

import React from "react";

type HeaderProps = {
    onLeaderboardClick: () => void;
    onRankClick: () => void;
};
const Header = ({
    onLeaderboardClick,
    onRankClick,
}: HeaderProps): JSX.Element => {
    return (
        <div className="header">
            <h1 className="header__title">
                <span className="caps">Marvel</span>{" "}
                <span className="border-top-bottom">Ranking</span>
            </h1>
            <nav className="header__nav">
                <ul className="nav__ul">
                    <li className="ul__li" onClick={onRankClick}>
                        Rank
                    </li>
                    <li className="ul__li" onClick={onLeaderboardClick}>
                        Leaderboard
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
