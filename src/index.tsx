import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './page/Login'
import Home from './page//Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider  store={store}>
    <React.StrictMode>
    <div className="App">
        <Router>
    <Routes>
        <Route  path={'/'} element = {<Login/>}/>
        <Route  path={'/home'} element = {<Home/>}/>
    </Routes>
</Router>
    </div>
  </React.StrictMode>
  </Provider>
  
);
