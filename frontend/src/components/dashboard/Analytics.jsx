import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import Sidebar from './Sidebar';
import { FaTrashAlt, FaPen, FaShareAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './QuizAnalysis.css';

const Analytics = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [deleteQuizId, setDeleteQuizId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate

  // Fetch quiz data when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  // Handle delete quiz
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/quiz/delete/${deleteQuizId}`);
      // Update the state to remove the deleted quiz
      setQuizzes(quizzes.filter(quiz => quiz.uniqueUrl !== deleteQuizId));
      setShowDeleteModal(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const openDeleteModal = (quizId) => {
    setDeleteQuizId(quizId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteQuizId(null);
  };

  // Handle share quiz link
  const handleShare = (quizUrl) => {
    const link = `${window.location.origin}/quiz/${quizUrl}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch((error) => {
      console.error("Failed to copy the link:", error);
    });
  };

  // Handle Question Wise Analysis navigation
  const handleQuestionWiseAnalysis = (quizUrl) => {
    navigate(`/questionwise/${quizUrl}`);
  };

  return (
    <>
      <div className="parentComponent">
        <Sidebar />
        <div className="quiz-analysis-container">
          <h1>Quiz Analysis</h1>
          <table className="quiz-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impression</th>
                <th>Actions</th>
                <th>Analysis</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{index + 1}</td>
                  <td>{quiz.title}</td>
                  <td>{new Date(quiz.createdAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}</td>
                  <td>{quiz.quizImpressionCount}</td>
                  <td>
                    <FaPen className="icon1" />
                    <FaTrashAlt className="icon2" onClick={() => openDeleteModal(quiz.uniqueUrl)} />
                    <FaShareAlt className="icon3" onClick={() => handleShare(quiz.uniqueUrl)} />
                  </td>
                  <td>
                    <a href="#" onClick={() => handleQuestionWiseAnalysis(quiz.uniqueUrl)}>Question Wise Analysis</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this quiz?</h3>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={closeDeleteModal}>Cancel</button>
              <button className="btn-delete" onClick={handleDelete}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Analytics;
