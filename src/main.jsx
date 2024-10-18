import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import {Provider} from 'react-redux'
// import { store } from './redux/Store.js';

import {  HashRouter } from 'react-router-dom'
import { persistor, store } from './redux/Store.js';
import { PersistGate } from 'redux-persist/integration/react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HashRouter>
     <Provider store = {store}>
     <PersistGate loading={null} persistor={persistor}> 
          <App />
         </PersistGate> 
      
      </Provider>
      </HashRouter>
  </React.StrictMode>,
)
