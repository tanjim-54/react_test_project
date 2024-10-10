

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import store from './store/store';
import FeedPage from './components/FeedPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import { initializeUser } from './features/userSlice'; // Import the action

// Initialize user state based on localStorage
store.dispatch(initializeUser()); // This will set the initial state

const App = () => {
  const authenticatedUser = useSelector((state) => state.user);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={authenticatedUser.isAuthenticated ? <FeedPage /> : <Navigate to="/LoginPage" />} />
            <Route path="/RegistrationPage" element={<RegistrationPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="*" element={<p style={{ fontWeight: 'bold', fontSize: '30px' }}>The requested URL was not found on this server.</p>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;








