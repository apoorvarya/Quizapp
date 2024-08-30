// Question wise poll type 
import React from 'react';
import './Questionwise.css';

const QuizAnalysis = () => {
    const questions = [
        {
            question: "Question place holder for analysis ?",
            options: [
                { label: "Option 1", count: 60 },
                { label: "Option 2", count: 23 },
                { label: "Option 3", count: 45 },
                { label: "Option 4", count: 11 },
            ],
        },
        {
            question: "Question place holder for analysis ?",
            options: [
                { label: "Option 1", count: 60 },
                { label: "Option 2", count: 23 },
                { label: "Option 3", count: 45 },
                { label: "Option 4", count: 11 },
            ],
        },
        {
            question: "Question place holder for analysis ?",
            options: [
                { label: "Option 1", count: 60 },
                { label: "Option 2", count: 23 },
                { label: "Option 3", count: 45 },
                { label: "Option 4", count: 11 },
            ],
        },
    ];

    return (
        <div className="quiz-analysis">
            <div className="sidebar">
                <h2>QUIZZIE</h2>
                <ul>
                    <li>Dashboard</li>
                    <li className="active">Analytics</li>
                    <li>Create Quiz</li>
                </ul>
                <button>LOGOUT</button>
            </div>
            <div className="content">
                <div className="header">
                    <h1>Quiz 2 Question Analysis</h1>
                    <p>Created on : 04 Sep, 2023<br />Impressions : 667</p>
                </div>
                {questions.map((q, index) => (
                    <div className="question" key={index}>
                        <h2>Q.{index + 1} {q.question}</h2>
                        <div className="options">
                            {q.options.map((option, i) => (
                                <div className="option" key={i}>
                                    <span>{option.count}</span>
                                    <p>{option.label}</p>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizAnalysis;





