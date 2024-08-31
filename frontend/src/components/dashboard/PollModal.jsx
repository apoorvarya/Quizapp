import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import "./QuizeModel.css";
import { FaTrashAlt } from 'react-icons/fa';

const PollModal = ({ show, onClose, quizType }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      type: "Text",
      options: [
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
      ],
      correctOption: 0,
      timer: 0, // Default timer to 0 (OFF)
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCreated, setQuizCreated] = useState(false);
  const [quizLink, setQuizLink] = useState("");

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
        {
          id: questions.length + 1,
          question: "",
          type: "Text",
          options: [
            { text: "", imageUrl: "" },
            { text: "", imageUrl: "" },
          ],
          correctOption: 0,
          timer: 0,
        },
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
    if (newQuestions[currentQuestionIndex].options.length < 6) {
      newQuestions[currentQuestionIndex].options.push({
        text: "",
        imageUrl: "",
      });
      setQuestions(newQuestions);
    }
  };

  const removeOption = (oIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[currentQuestionIndex].options.length > 2) {
      newQuestions[currentQuestionIndex].options = newQuestions[
        currentQuestionIndex
      ].options.filter((_, index) => index !== oIndex);
      setQuestions(newQuestions);
    }
  };

  const handleTimerChange = (value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].timer = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].correctOption = index;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    try {
      const quizData = {
        title: `Quiz ${Date.now()}`,
        type: quizType === "Poll Type" ? "Poll" : "Q&A",
        questions: questions.map((q) => ({
          question: q.question,
          type: q.type,
          options: q.options.filter(
            (opt) => opt.text.trim() !== "" || opt.imageUrl.trim() !== ""
          ),
          correctOption: q.correctOption,
          timer: q.timer,
        })),
      };

      const response = await axios.post(
        "http://localhost:5000/api/quiz/create",
        quizData
      );
      console.log(response);
      

      if (response.status === 201) {
        const { uniqueUrl } = response.data;
        setQuizLink(`http://localhost:5000/api/quiz/${uniqueUrl}`);
        setQuizCreated(true);
      } else {
        alert("Failed to create quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Error creating quiz. Please try again.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(quizLink);
    alert("Link copied to clipboard!");
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
                  className={`question-number-container ${
                    index === currentQuestionIndex ? "active" : ""
                  }`}
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
                value={questions[currentQuestionIndex].question}
                onChange={(e) =>
                  handleQuestionChange("question", e.target.value)
                }
              />

              <div className="option-type">
                <p>Quiz Type</p>
                <label>
                  <input
                    type="radio"
                    name={`type-${currentQuestionIndex}`}
                    value="Text"
                    checked={questions[currentQuestionIndex].type === "Text"}
                    onChange={(e) =>
                      handleQuestionChange("type", e.target.value)
                    }
                  />
                  Text
                </label>
                <label>
                  <input
                    type="radio"
                    name={`type-${currentQuestionIndex}`}
                    value="Image"
                    checked={questions[currentQuestionIndex].type === "Image"}
                    onChange={(e) =>
                      handleQuestionChange("type", e.target.value)
                    }
                  />
                  Image
                </label>
                <label>
                  <input
                    type="radio"
                    name={`type-${currentQuestionIndex}`}
                    value="Text and Image"
                    checked={
                      questions[currentQuestionIndex].type === "Text and Image"
                    }
                    onChange={(e) =>
                      handleQuestionChange("type", e.target.value)
                    }
                  />
                  Text & Image
                </label>
              </div>

              {questions[currentQuestionIndex].options.map((option, oIndex) => (
                <div
                  key={oIndex}
                  className={`option-section ${
                    questions[currentQuestionIndex].correctOption === oIndex
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`correctOption-${currentQuestionIndex}`}
                    checked={
                      questions[currentQuestionIndex].correctOption === oIndex
                    }
                    onChange={() => handleCorrectOptionChange(oIndex)}
                  />
                  <input
                    type="text"
                    placeholder={
                      questions[currentQuestionIndex].type === "Text"
                        ? "Text"
                        : questions[currentQuestionIndex].type === "Image"
                        ? "Image URL"
                        : "Text"
                    }
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(oIndex, "text", e.target.value)
                    }
                  />
                  {questions[currentQuestionIndex].type === "Text and Image" && (
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={option.imageUrl}
                      onChange={(e) =>
                        handleOptionChange(oIndex, "imageUrl", e.target.value)
                      }
                    />
                  )}
                  {oIndex >= 2 && (
                    <button
                      className="remove-option"
                      onClick={() => removeOption(oIndex)}
                    >
                       <FaTrashAlt />
                    </button>
                  )}
                </div>
              ))}

              {questions[currentQuestionIndex].options.length < 6 && (
                <button className="add-option" onClick={addOption}>
                  Add Option
                </button>
              )}

              {quizType !== "Poll Type" && (
                <div className="timer-options">
                  <p>Timer</p>
                  {[0, 5, 10].map((value) => (
                    <button
                      key={value}
                      className={`timer-button ${
                        questions[currentQuestionIndex].timer === value
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleTimerChange(value)}
                    >
                      {value === 0 ? "OFF" : `${value} sec`}
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
              className="quiz-link"
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
