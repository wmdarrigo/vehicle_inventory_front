import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './index.css'; // any css library put below will take precedence over default styles


ReactDOM.render(
 // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
