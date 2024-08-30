// Quiz interface - congrats
import React from 'react';
import './Step8.css'; 
const QuizCompletion = () => {
  return (
    <div className="quiz-completion">
      <h1>Congrats Quiz is completed</h1>
      <div className="trophy-container">
        <img src="image.png" alt="" />
        {/* Your trophy image here */}
      </div>
      <p>Your Score is 03/04</p>
    </div>
  );
};

export default QuizCompletion;