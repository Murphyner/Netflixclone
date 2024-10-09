import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import PopUpProvider from './Context/PopUpContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PopUpProvider>
      <RouterProvider router={router} />
    </PopUpProvider>
  </Provider>
);
