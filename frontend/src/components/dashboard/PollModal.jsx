import PropTypes from 'prop-types';
import { useState } from 'react';
// import './PollModal.css';
import './QuizeModel.css'
 

const PollModal = ({ show, onClose, quizType }) => {
  const [questions, setQuestions] = useState([{ id: 1, text: '', options: ['', '', ''], timer: 'OFF' }]);

  const handleQuestionChange = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, { id: questions.length + 1, text: '', options: ['', '', ''], timer: 'OFF' }]);
    }
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = () => {
    console.log('Quiz Type:', quizType);
    console.log('Questions:', questions);
    onClose(); // Close the modal after submission
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create {quizType}</h2>
        {questions.map((question, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={question.text}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            <button onClick={() => removeQuestion(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addQuestion}>Add Question</button>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Create Quiz</button>
        </div>
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
