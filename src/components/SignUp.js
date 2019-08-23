import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FormErrors } from './FormErrors';
import {VALIDATION} from '../config/regExp';
import config from '../config/index';
import ErrorHandler from '../helpers/error';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      error: '',
      formErrors: {firstname: '', lastname: '', email: '', password: ''},
      firstnameValid: false,
      lastnameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false
    };
  }

handleUserInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value},
    () => { this.validateField(name, value) });
}

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let {firstnameValid, lastnameValid, emailValid, passwordValid} = this.state;

    switch(fieldName) {
      case 'firstname':
        firstnameValid = value.length >= 2;
        fieldValidationErrors.firstname = firstnameValid ? '' : ' is too short';
        break;
      case 'lastname':
        lastnameValid = value.length >= 2;
        fieldValidationErrors.lastname = lastnameValid ? '' : ' is too short';
        break;
      case 'email':
        emailValid = VALIDATION.EMAIL.test(value);
        fieldValidationErrors.email = emailValid ? '' : ' is too short or has unexpected symbol';
        break;
      case 'password':
        passwordValid = VALIDATION.PASSWORD.test(value);
        fieldValidationErrors.password = passwordValid ? '': ' is too short or has unexpected symbol';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    firstnameValid: firstnameValid,
                    lastnameValid: lastnameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.firstnameValid && this.state.lastnameValid && this.state.emailValid && this.state.passwordValid});
  }

  signUp(){
      return axios({
      method:'post',
      url: config.serverUri,
      headers:{'Content-type':'application/json'},
      data:{
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    }
    })
    .then((response) => {
      if(response.data==='user registered'){
        window.location.assign('/signin')
      }
    })
    .catch((error) => {
        console.log(error);
        if(!error.response){
          this.setState({error: error.message});
        }
        else{
          this.setState({error: error.response.data.message});
        }
    });
  }
  render() {
    return (
      <div className='signup' id='signupform'>
          <input type='firstname' name='firstname' value={this.state.firstname} className='data' id='firstname' placeholder='First Name' onChange={this.handleUserInput}/>
          <input type='lastname' name='lastname' value={this.state.lastname} className='data' id='lastname' placeholder='Last Name' onChange={this.handleUserInput}/>
          <input type='email' name='email' value={this.state.email} className='data' id='email' placeholder='Email' onChange={this.handleUserInput} required/>
          <input type='password' name='password' value={this.state.password} className='data' id='password' placeholder='Password' onChange={this.handleUserInput}/>
          <button className='btn' onClick={this.signUp} disabled={!this.state.formValid}>sign up</button>
          <div>
            <Link to='/signin'>sign in</Link>
          </div>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
            <ErrorHandler error={this.state.error} />
          </div>
      </div>
    );
  }
}

export default SignUp;
