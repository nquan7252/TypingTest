import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App2';
import Big from './Big';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.js'
import $ from 'jquery';
import Popper from 'popper.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

ReactDOM.render(
  <React.StrictMode>
    <Big />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
