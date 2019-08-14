import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MainPage from './components/MainPage';
import PostPage from './components/PostPage';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
    <Route component={SignUp} exact path='/'></Route>
    <Route component={SignIn} path='/signin'></Route>
    <Route component={MainPage} path='/addpost/:id?'></Route>
    <Route component={PostPage} path='/posts'></Route>
</BrowserRouter>, document.getElementById('root'));
