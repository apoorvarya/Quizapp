// Quiz interface
import React, { useState } from 'react';
import './Step7.css';

const QuizInterface = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <span className="quiz-progress">01/04</span>
                <span className="quiz-timer">00:10s</span>
            </div>
            <div className="quiz-question">
                Your question text comes here, its a sample text.
            </div>
            <div className="quiz-options">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
                        onClick={() => handleOptionClick(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button className="quiz-next">NEXT</button>
        </div>
    );
};

export default QuizInterface;