import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import apiSlice from './store/apiSlice';


// if you want to access the data or api call outside the provider
// Number here refers to the id of that particular todo
store.dispatch(apiSlice.endpoints.getTodo.initiate(number));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
