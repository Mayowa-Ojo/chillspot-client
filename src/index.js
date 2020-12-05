import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from "./store";
import { ErrorFallback } from "./components";
import "./assets/styles.css";

ReactDOM.render(
   // <React.StrictMode>
   <Store>
      <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
         <App />
      </ErrorBoundary>
      </Router>
   </Store>,
   /* </React.StrictMode>, */
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
