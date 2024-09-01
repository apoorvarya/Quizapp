import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import ProfileScreen from './screens/ProfileScreen.jsx';
 import Dashboard from './components/dashboard/Dashboard.jsx';
import AuthScreen from './screens/AuthScreen.jsx';
import Analytics from './components/dashboard/Analytics.jsx';
import Questionwise from './components/dashboard/Questionwise.jsx'
import QuizInterface from './components/quizInterface/QuizInterface.jsx';
 const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/auth' element={<AuthScreen />} />
      <Route path='/analytics' element={<Analytics />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/questionwise/:id' element={<Questionwise />} />
      <Route path="/quiz/:id" element={<QuizInterface />} />
 
 
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
