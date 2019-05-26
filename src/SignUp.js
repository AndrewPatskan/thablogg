import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
class SignUp extends Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      firstname:'',
      lastname: '',
      login: '',
      password:''
    };
  }
  handleFirstNameChange(e){
    this.setState({firstname:e.target.value})
  }
  handleLastNameChange(e){
    this.setState({lastname:e.target.value})
  }
  handleLoginChange(e){
    this.setState({login:e.target.value})
  }
  handlePasswordChange(e){
    this.setState({password:e.target.value})
  }
  signUp(){
    //Не забувай ретурнити проміс з Axios
      return axios({
      method:'post',
      url:'https://thablogg.herokuapp.com',
      headers:{'Content-type':'application/json'}, // Ще сеть контент тайп цей, це для json інакше поля не будуть в боді
      data:{
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      login: this.state.login,
      password: this.state.password
    }}    )
    .then(function (response) {
      //Бо тут респонса не буде
      console.log(response);
      if(response.data==='success'){
        window.location.assign('https://thablogg.herokuapp.com/signin')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }
  render() {
    return (
      <div className='signup'>
          <input type='firstname' className='data' id='firstname' placeholder='First Name' onChange={this.handleFirstNameChange}/>
          <input type='lastname' className='data' id='lastname' placeholder='Last Name' onChange={this.handleLastNameChange}/>
          <input type='login' className='data' id='login' placeholder='Login' onChange={this.handleLoginChange}/>
          <input type='password' className='data' id='password' placeholder='Password' onChange={this.handlePasswordChange}/>
          <button className='btn' onClick={this.signUp}>sign up</button>
          <div>
            <Link to='/signin'>sign in</Link>
          </div>
      </div>
    );
  }
}

export default SignUp;
