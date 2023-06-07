import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import { Provider } from'react-redux'
import {  BrowserRouter as Router} from "react-router-dom";
import store from './redux/store/store';
import { UpdateTitleOnRouteChange } from "./Components/UpdateTitleOnRouteChange.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <UpdateTitleOnRouteChange />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
