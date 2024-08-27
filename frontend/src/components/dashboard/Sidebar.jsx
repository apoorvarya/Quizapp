import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import QuizModal from './QuizModal'; 
import PollModal from './PollModal'; // Import the second modal

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [quizType, setQuizType] = useState('');

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };

  const openQuizModal = () => setShowQuizModal(true);
  const closeQuizModal = () => setShowQuizModal(false);
  
  const openPollModal = () => setShowPollModal(true);
  const closePollModal = () => setShowPollModal(false);

  const handleQuizContinue = (selectedQuizType) => {
    setQuizType(selectedQuizType);
    closeQuizModal(); // Close the first modal
    openPollModal(); // Open the second modal
  };

  return (
    <div className="sidebar">
      <h1>QUIZZIE</h1>
      <ul>
        <li>Dashboard</li>
        <li>Analytics</li>
        <li onClick={openQuizModal}>Create Quiz</li>
      </ul>
      <hr />
      <button className="logout" onClick={logoutHandler}>LOGOUT</button>
      <QuizModal show={showQuizModal} onClose={closeQuizModal} onContinue={handleQuizContinue} />
      <PollModal show={showPollModal} onClose={closePollModal} quizType={quizType} />
    </div>
  );
};

export default Sidebar;
