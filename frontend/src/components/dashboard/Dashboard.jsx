import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './dashboard.css';
import Sidebar from './Sidebar';

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizStats, setQuizStats] = useState({ totalQuizzes: 0, totalQuestions: 0, totalImpressions: 0 });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz');
        const quizzes = response.data;
        setQuizzes(quizzes);

        // Calculate stats
        const totalQuizzes = quizzes.length;
        const totalQuestions = quizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0);
        const totalImpressions = quizzes.reduce((sum, quiz) => sum + quiz.quizImpressionCount, 0);

        setQuizStats({ totalQuizzes, totalQuestions, totalImpressions });
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header quizStats={quizStats} />
        <TrendingQuizzes quizzes={quizzes} />
      </div>
    </div>
  );
}

const Header = ({ quizStats }) => {
  return (
    <div className="header">
      <div className="stat">
        <h3>{quizStats.totalQuizzes} Quiz{quizStats.totalQuizzes !== 1 && 'zes'}</h3>
        <p className="p1">Created</p>
      </div>
      <div className="stat">
        <h3>{quizStats.totalQuestions}</h3>
        <p className="p2">Questions Created</p>
      </div>
      <div className="stat">
        <h3>{quizStats.totalImpressions.toLocaleString()} Total</h3>
        <p className="p3">Impressions</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  quizStats: PropTypes.shape({
    totalQuizzes: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    totalImpressions: PropTypes.number.isRequired,
  }).isRequired,
};

const TrendingQuizzes = ({ quizzes }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="trending-quizzes">
      <h3>Trending Quizzes</h3>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-item">
            <p className="font-bold">{quiz.title} <span role="img" aria-label="fire" className="fire"> {quiz.quizImpressionCount} 👁️</span></p>
             <p>Created on: {formatDate(quiz.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

TrendingQuizzes.propTypes = {
  quizzes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      quizImpressionCount: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dashboard;
