import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.signIn = this.signIn.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            email:'',
            password:''
        };
    }
    handleEmailChange(e){
        this.setState({email:e.target.value});
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value});
    }
    signIn(){
          return axios({
          method:'post',
          url:'http://localhost:7777/signin',
          headers:{'Content-type':'application/json'},
          data:{
            email: this.state.email,
            password: this.state.password
        }
      })
        .then(function (response) {
          if(response){
            console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', response.data.email);
            window.location.assign('/posts');
          }
        })
        .catch(function (err) {
          if(err){
            const mess = document.createElement('h7');
            const node = document.createTextNode('wrong email or password... try again');
            mess.appendChild(node);
            const div = document.getElementById('signinform');
            div.appendChild(mess);
          }
        });
      }
    render() {
        return (
        <div className='signin' id='signinform'>
                <input type='email' className='data' id='email' placeholder='Email' onChange={this.handleEmailChange}/>
                <input type='password' className='data' id='password' placeholder='Password' onChange={this.handlePasswordChange}/>
                <button className='btn' onClick={this.signIn}>sign in</button>
                <div>
                    <Link to='/'>sign up</Link>
                </div>
        </div>
        );
  }
}

export default SignIn;
