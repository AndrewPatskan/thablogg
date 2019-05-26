import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class SignIn extends Component {
    constructor(props){
        super(props);
        this.signIn = this.signIn.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
            login:'',
            password:''
        };
    }
    handleLoginChange(e){
        this.setState({login:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }
    signIn(){
          return axios({
          method:'post',
          url:'https://thablogg.herokuapp.com/signin',
          headers:{'Content-type':'application/json'},
          data:{
          login: this.state.login,
          password: this.state.password
        }}    )
        .then(function (response) {
          console.log(response);
          if(response.data==='success'){
            window.location.assign('https://thablogg.herokuapp.com/posts');
          }
        })
        .catch(function (err) {
          if(err){
            const mess = document.createElement('h7');
            const node = document.createTextNode('wrong login or password...try again');
            mess.appendChild(node);
            const div = document.getElementById('signinform');
            div.appendChild(mess);
          }
        });
       
      }
    render() {
        return (
        <div className='signin' id='signinform'>
                <input type='login' className='data' id='login' placeholder='Login' onChange={this.handleLoginChange}/>
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
