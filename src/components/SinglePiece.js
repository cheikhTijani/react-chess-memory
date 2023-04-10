import React from 'react'
import './SinglePiece.css';

export default function SinglePiece({ piece, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(piece);
        }
    }

    return (
        <div className="piece">
            <div className={flipped ? 'flipped' : ''} >
                <img className="front" src={piece.src} alt="piece front" />
                <img className="back" src="./img/question.svg" alt="piece back" onClick={handleClick} />
            </div>
        </div>
    )
}
