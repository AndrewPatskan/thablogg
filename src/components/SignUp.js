import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FormErrors } from './FormErrors';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    /*this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this); */
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      firstname:'',
      lastname: '',
      login: '',
      password:'',
      formErrors: {firstname: '', lastname: '', login: '', password: ''},
      firstnameValid: false,
      lastnameValid: false,
      loginValid: false,
      passwordValid: false,
      formValid: false
    };
  }
 /* handleFirstNameChange(e){
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
*/
handleUserInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value},
    () => { this.validateField(name, value) });
}

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let firstnameValid = this.state.firstnameValid;
    let lastnameValid = this.state.lastnameValid;
    let loginValid = this.state.loginValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'firstname':
        firstnameValid = value.length >= 6;
        fieldValidationErrors.firstname = firstnameValid ? '' : ' has unexpected symbol';
        break;
      case 'lastname':
        lastnameValid = value.length >= 6;
        fieldValidationErrors.lastname = lastnameValid ? '' : ' has unexpected symbol';
        break;
      case 'login':
        loginValid = value.length >= 6;
        fieldValidationErrors.login = loginValid ? '' : ' has unexpected symbol';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    firstnameValid: firstnameValid,
                    lastnameValid: lastnameValid,
                    loginValid: loginValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.firstnameValid && this.state.lastnameValid && this.state.loginValid && this.state.passwordValid});
  }

  signUp(){
      return axios({
      method:'post',
      url:'http://localhost:7777',
      headers:{'Content-type':'application/json'},
      data:{
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      login: this.state.login,
      password: this.state.password
    }}    )
    .then(function (response) {
      console.log(response);
      if(response.data==='success'){
        window.location.assign('/signin')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }
  render() {
    return (
      <div className='signup'>
          <input type='firstname' name='firstname' value={this.state.firstname} className='data' id='firstname' placeholder='First Name' onChange={this.handleUserInput}/>
          <input type='lastname' name='lastname' value={this.state.lastname} className='data' id='lastname' placeholder='Last Name' onChange={this.handleUserInput}/>
          <input type='login' name='login' value={this.state.login} className='data' id='login' placeholder='Login' onChange={this.handleUserInput} required/>
          <input type='password' name='password' value={this.state.password} className='data' id='password' placeholder='Password' onChange={this.handleUserInput}/>
          <button className='btn' onClick={this.signUp} disabled={!this.state.formValid}>sign up</button>
          <div>
            <Link to='/signin'>sign in</Link>
          </div>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
      </div>
    );
  }
}

export default SignUp;
