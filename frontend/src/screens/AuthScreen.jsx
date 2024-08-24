import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation, useLoginMutation } from '../slices/usersApiSlice';
import './AuthScreen.css'; // Import the CSS for styling

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (isSignUp && !name) {
      newErrors.name = 'Invalid name';
    }
    if (!email) {
      newErrors.email = 'Invalid Email';
    }
    if (!password) {
      newErrors.password = 'Weak password';
    }
    if (isSignUp && !confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (isSignUp && password !== confirmPassword) {
      newErrors.confirmPassword = 'Password doesn’t match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let res;
        if (isSignUp) {
          res = await register({ name, email, password }).unwrap();
        } else {
          res = await login({ email, password }).unwrap();
        }
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="form-container">
      <h1>QUIZZIE</h1>

      <div className="toggle-buttons">
        <button
          id='signup'
          className={`toggle-button ${isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
        <button
          id='login'
          className={`toggle-button ${!isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(false)}
        >
          Log In
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <div className="inputContainer">
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={errors.name ? errors.name : "Enter name"}
                className={errors.name ? 'error' : ''}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={errors.email ? errors.email : "Enter email"}
              className={errors.email ? 'error' : ''}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={errors.password ? errors.password : "Enter password"}
              className={errors.password ? 'error' : ''}
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={errors.confirmPassword ? errors.confirmPassword : "Confirm password"}
                className={errors.confirmPassword ? 'error' : ''}
              />
            </div>
          )}
          <button
            id='btn'
            type="submit"
            className="btn"
            disabled={isSignUp ? isRegistering : isLoggingIn}
          >
            {isSignUp ? 'Sign-Up' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthScreen;


















































// import  { useState } from 'react';
// import './AuthScreen.css'; // Import the CSS for styling

// const AuthScreen = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (isSignUp && !name) {
//       newErrors.name = 'Invalid name';
//     }
//     if (!email) {
//       newErrors.email = 'Invalid Email';
//     }
//     if (!password) {
//       newErrors.password = 'Weak password';
//     }
//     if (isSignUp && !confirmPassword) {
//       newErrors.confirmPassword = 'Confirm Password is required';
//     } else if (isSignUp && password !== confirmPassword) {
//       newErrors.confirmPassword = 'password doesn’t match';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       if (isSignUp) {
//         // Handle the registration logic
//         console.log('Register:', { name, email, password });
//       } else {
//         // Handle the login logic
//         console.log('Login:', { email, password });
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1>QUIZZIE</h1>

//       <div className="toggle-buttons">
//         <button
//         id='signup'
//           className={`toggle-button ${isSignUp ? 'active' : ''}`}
//           onClick={() => setIsSignUp(true)}
//         >
//           Sign Up
//         </button>
//         <button
//         id='login'
//           className={`toggle-button ${!isSignUp ? 'active' : ''}`}
//           onClick={() => setIsSignUp(false)}
//         >
//           Log In
//         </button>
//       </div>
//       <form onSubmit={submitHandler}>
//         <div className="inputContainer">


//         {isSignUp && (
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder={errors.name ? errors.name : "Enter name"}
//               className={errors.name ? 'error' : ''}
//             />
//           </div>
//         )}
//         <div className="form-group">
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder={errors.email ? errors.email : "Enter email"}
//             className={errors.email ? 'error' : ''}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder={errors.password ? errors.password : "Enter password"}
//             className={errors.password ? 'error' : ''}
//           />
//         </div>
//         {isSignUp && (
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder={errors.confirmPassword ? errors.confirmPassword : "Confirm password"}
//               className={errors.confirmPassword ? 'error' : ''}
//             />
//           </div>
//         )}
//         <button id='btn' type="submit" className="btn">
//           {isSignUp ? 'Sign-Up' : 'Log In'}
//         </button>

//         </div>

//       </form>
//     </div>
//   );
// };

// export default AuthScreen;