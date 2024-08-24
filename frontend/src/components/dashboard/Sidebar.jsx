
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useLogoutMutation } from '../slices/usersApiSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';
// import { logout } from '../slices/authSlice';
import { logout } from '../../slices/authSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };
    return (
      <div className="sidebar">
        <h1>QUIZZIE</h1>
        <ul>
          <li>Dashboard</li>
          <li>Analytics</li>
          <li>Create Quiz</li>
        </ul>
        <hr />
        <button className="logout" onClick={logoutHandler}>LOGOUT</button>
      </div>
    );
  };

export default Sidebar;