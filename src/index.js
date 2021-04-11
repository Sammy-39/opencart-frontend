import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import axios from 'axios'

import App from './App';
import store from './store/store'
import './index.css';

axios.defaults.baseURL = 'https://opencart-backend.herokuapp.com/api'
axios.defaults.withCredentials = true

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);


