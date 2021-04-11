import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import axios from 'axios'

import App from './App';
import store from './store/store'
import './index.css';

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.withCredentials = true

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);


