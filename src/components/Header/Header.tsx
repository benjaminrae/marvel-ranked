import "./Header.css";

import React, { useState, useEffect, useRef } from "react";

type HeaderProps = {
    onLeaderboardClick: () => void;
    onRankClick: () => void;
};
const Header = ({
    onLeaderboardClick,
    onRankClick,
}: HeaderProps): JSX.Element => {
    const [showNav, setShowNav] = useState(true);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [width, setWidth] = useState(0);

    const header = useRef<any>();

    useEffect(() => {
        updateWindowWidth();
        window.addEventListener("resize", updateWindowWidth);
    }, []);

    useEffect(() => {
        if (width < 630) {
            setShowNav(false);
            setHamburgerOpen(false);
        } else {
            setShowNav(true);
            setHamburgerOpen(false);
        }
    }, [width]);

    const updateWindowWidth = () => {
        if (header.current) {
            setWidth(header.current.clientWidth);
        }
    };

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    return (
        <header className="header" ref={header}>
            {!hamburgerOpen && (
                <h1 className="header__title">
                    <span className="caps">Marvel</span>{" "}
                    <span className="border-top-bottom">Ranking</span>
                </h1>
            )}
            {hamburgerOpen && <h1> </h1>}

            {(showNav || hamburgerOpen) && (
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
            )}

            {!showNav && (
                <div className="header__hamburger" onClick={toggleHamburger}>
                    <div
                        className={
                            hamburgerOpen
                                ? "hamburger__icon--open"
                                : "hamburger__icon"
                        }
                    >
                        &#9776;
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
