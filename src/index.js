// src/index.js

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/bootstrap.min.css'; // Your CSS files
import './assets/css/common.css';
import './assets/css/main.css';
import './assets/css/responsive.css';
import { Provider } from 'react-redux';
import store from './store/store'; // Import your store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
        <Provider store={store}>
            <StrictMode></StrictMode>
    <App />
    <StrictMode/>
  </Provider>,
        
  document.getElementById('root')
);
