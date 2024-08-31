import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./QuizInterface.css";
import Finalresult from "./finalresult.jpg";
const QuizInterface = () => {
  const { id } = useParams(); // Get the quiz ID from the URL
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // Fetch quiz data based on the dynamic quiz ID
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quiz/${id}`);
        setQuizData(response.data);
        setLoading(false);
        setTimeLeft(response.data.questions[0]?.timer || 10);
      } catch (err) {
        console.error("Error fetching quiz data:", err);
        setError("Failed to load quiz. Please try again.");
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, quizCompleted]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      if (selectedOption === quizData.questions[currentQuestionIndex].correctOption) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setTimeLeft(quizData.questions[currentQuestionIndex + 1]?.timer || 10);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (quizCompleted) {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Congrats, Quiz is Completed!</h2>
          <img src={Finalresult} alt="Congrats" className="congrats-image" />
          <p>Your Score: {score}/{quizData.questions.length}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="quiz-header">
          <div className="question-counter">
            {currentQuestionIndex + 1}/{quizData.questions.length}
          </div>
          <div className="timer">
            {timeLeft > 0 ? `00:${timeLeft}s` : "Time's up!"}
          </div>
        </div>

        <div className="question-section">
          <h3>{quizData.questions[currentQuestionIndex].question}</h3>
          <div className="options-section">
            {quizData.questions[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`option ${
                  selectedOption === index ? "selected" : ""
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option.imageUrl ? (
                  <img src={option.imageUrl} alt={option.text} />
                ) : null}
                <p>{option.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-actions">
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex < quizData.questions.length - 1
              ? "Next"
              : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
QuizInterface.propTypes = {
  quizId: PropTypes.string,  // Validate quizId as a string prop
};

export default QuizInterface;
