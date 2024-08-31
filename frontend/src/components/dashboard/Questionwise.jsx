import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Questionwise.css';

const QuizAnalysis = () => {
    const { id } = useParams(); // Extract the dynamic quiz ID from the URL
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch quiz data based on dynamic URL ID
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quiz/${id}`);
                setQuizData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch quiz data");
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!quizData) {
        return <div>No quiz data available</div>;
    }

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
                    <h1>{quizData.title} Question Analysis</h1>
                    <p>Created on : {new Date(quizData.createdAt).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}<br />
                    Impressions : {quizData.quizImpressionCount}</p>
                </div>
                {quizData.questions.map((q, index) => (
                    <div className="question" key={index}>
                        <h2>Q.{index + 1} {q.question}</h2>
                        <div className="options">
                            {q.options.map((option, i) => (
                                <div className="option" key={i}>
                                    <span>{option.count || 0}</span>
                                    <p>{option.text}</p>
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
