import PropTypes from 'prop-types';
import { useState } from 'react';
import './QuizeModel.css';

const PollModal = ({ show, onClose, quizType }) => {
  const [questions, setQuestions] = useState([
    { id: 1, text: '', type: 'Text', options: [{ text: '', imageUrl: '' }], timer: 'OFF' }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCreated, setQuizCreated] = useState(false); // New state for handling quiz creation
  // eslint-disable-next-line no-unused-vars
  const [quizLink, setQuizLink] = useState('https://example.com/quiz-link'); // Placeholder for quiz link

  const handleQuestionChange = (field, value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (oIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].options[oIndex][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([
        ...questions,
        { id: questions.length + 1, text: '', type: 'Text', options: [{ text: '', imageUrl: '' }], timer: 'OFF' }
      ]);
      setCurrentQuestionIndex(questions.length);
    }
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(index === 0 ? 0 : index - 1);
    }
  };

  const addOption = () => {
    const newQuestions = [...questions];
    if (newQuestions[currentQuestionIndex].options.length < 5) {
      newQuestions[currentQuestionIndex].options.push({ text: '', imageUrl: '' });
      setQuestions(newQuestions);
    }
  };

  const removeOption = (oIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[currentQuestionIndex].options.length > 2) {
      newQuestions[currentQuestionIndex].options.splice(oIndex, 1);
      setQuestions(newQuestions);
    }
  };

  const handleTimerChange = (value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].timer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    console.log('Quiz Type:', quizType);
    console.log('Questions:', questions);
    setQuizCreated(true); // Move to the link-sharing view after quiz creation
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(quizLink);
    alert('Link copied to clipboard!');
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        {!quizCreated ? (
          <>
            <h2>Create {quizType}</h2>
            <div className="question-navigation">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`question-number-container ${index === currentQuestionIndex ? 'active' : ''}`}
                  onMouseEnter={() => setCurrentQuestionIndex(index)}
                >
                  <div className="question-number">
                    {index + 1}
                    <button
                      className="remove-question"
                      onClick={() => removeQuestion(index)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              {questions.length < 5 && (
                <button className="add-question" onClick={addQuestion}>
                  +
                </button>
              )}
            </div>

            <div className="question-section">
              <input
                type="text"
                placeholder="Poll Question"
                value={questions[currentQuestionIndex].text}
                onChange={(e) => handleQuestionChange('text', e.target.value)}
              />
              <div className="option-type">
                <label>
                  <input
                    type="radio"
                    name={`type-${currentQuestionIndex}`}
                    value="Text"
                    checked={questions[currentQuestionIndex].type === 'Text'}
                    onChange={(e) => handleQuestionChange('type', e.target.value)}
                  />
                  Text
                </label>
                <label>
                  <input
                    type="radio"
                    name={`type-${currentQuestionIndex}`}
                    value="Image URL"
                    checked={questions[currentQuestionIndex].type === 'Image URL'}
                    onChange={(e) => handleQuestionChange('type', e.target.value)}
                  />
                  Image URL
                </label>
                <label>
                  <input
                    type="radio"
                    name={`type-${currentQuestionIndex}`}
                    value="Text & Image URL"
                    checked={questions[currentQuestionIndex].type === 'Text & Image URL'}
                    onChange={(e) => handleQuestionChange('type', e.target.value)}
                  />
                  Text & Image URL
                </label>
              </div>

              {questions[currentQuestionIndex].options.map((option, oIndex) => (
                <div key={oIndex} className="option-section">
                  <input
                    type="text"
                    placeholder={
                      questions[currentQuestionIndex].type === 'Text' 
                        ? 'Text' 
                        : questions[currentQuestionIndex].type === 'Image URL' 
                        ? 'Image URL' 
                        : 'Text'
                    }
                    value={option.text}
                    onChange={(e) => handleOptionChange(oIndex, 'text', e.target.value)}
                  />
                  {questions[currentQuestionIndex].type === 'Text & Image URL' && (
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={option.imageUrl}
                      onChange={(e) => handleOptionChange(oIndex, 'imageUrl', e.target.value)}
                    />
                  )}
                  {questions[currentQuestionIndex].options.length > 2 && (
                    <button className="remove-option" onClick={() => removeOption(oIndex)}>
                      🗑️
                    </button>
                  )}
                </div>
              ))}
              <button className="add-option" onClick={addOption}>
                Add option
              </button>

              {quizType !== 'Poll Type' && (
                <div className="timer-options">
                  {['OFF', '5 sec', '10 sec'].map((value) => (
                    <button
                      key={value}
                      className={`timer-button ${questions[currentQuestionIndex].timer === value ? 'selected' : ''}`}
                      onClick={() => handleTimerChange(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button onClick={onClose}>Cancel</button>
              <button onClick={handleSubmit}>Create Quiz</button>
            </div>
          </>
        ) : (
          <>
            <h2>Congrats, your Quiz is Published!</h2>
            <input
              type="text"
              value={quizLink}
              readOnly
              className="quiz-link-input"
            />
            <button className="share-button" onClick={handleCopyLink}>
              Share
            </button>
          </>
        )}
      </div>
    </div>
  );
};

PollModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  quizType: PropTypes.string.isRequired,
};

export default PollModal;
