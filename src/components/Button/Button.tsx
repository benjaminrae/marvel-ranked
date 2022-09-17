import React from "react";
import "./Button.css";

type ButtonProps = {
    className?: string;
    innerText: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const Button = ({
    className,
    innerText,
    onClick,
}: ButtonProps): JSX.Element => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            <div className="button__text">{innerText}</div>
        </button>
    );
};

export default Button;
