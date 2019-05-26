import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import MainPage from './MainPage';
import PostPage from './PostPage';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
    <Route component={SignUp} exact path='/'></Route>
    <Route component={SignIn} path='/signin'></Route>
    <Route component={MainPage} path='/addpost/:id?'></Route>
    <Route component={PostPage} path='/posts'></Route>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();