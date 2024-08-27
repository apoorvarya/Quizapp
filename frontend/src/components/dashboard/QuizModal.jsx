import PropTypes from 'prop-types';
import { useState } from 'react';
import './QuizeModel.css';

const QuizModal = ({ show, onClose, onContinue }) => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('Q & A');

  const handleQuizNameChange = (e) => setQuizName(e.target.value);
  const handleQuizTypeChange = (type) => setQuizType(type);

  const handleSubmit = () => {
    console.log('Quiz Name:', quizName);
    console.log('Quiz Type:', quizType);
    onContinue(quizType); // Pass the quiz type to the parent
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Quiz</h2>
        <input
          type="text"
          placeholder="Quiz name"
          value={quizName}
          onChange={handleQuizNameChange}
        />
        <div className="quiz-type">
          <p>Quiz Type</p>
          <button
            className={quizType === 'Q & A' ? 'selected' : ''}
            onClick={() => handleQuizTypeChange('Q & A')}
          >
            Q & A
          </button>
          <button
            className={quizType === 'Poll Type' ? 'selected' : ''}
            onClick={() => handleQuizTypeChange('Poll Type')}
          >
            Poll Type
          </button>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </div>
  );
};

QuizModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default QuizModal;
