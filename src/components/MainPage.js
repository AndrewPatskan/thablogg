import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FormErrors } from './FormErrors';
import config from '../config/index';
import ErrorHandler from '../helpers/error';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.getPostWithId = this.getPostWithId.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.state = {
          error: '',
          formErrors: {subject: ''},
          subjestValid: false,
          formValid: false
        };
      }

      handleFormInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
          () => { this.validateField(name, value) });
      }
        addPost(){
              return axios({
              method:'post',
              url: config.serverUri + '/addpost',
              headers:{'Content-type':'application/json'},
              data:{
              title: this.state.title,
              subject: this.state.subject,
              author: localStorage.getItem('userEmail'),
              id: this.state.id,
              token: localStorage.getItem('token')
            }})
            .then((response) => {
              console.log(response);
              window.location.assign('/posts')
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
        getPostWithId(){
          const id = this.props.match.params.id;
          return axios({
            method:'post',
            url: config.serverUri + '/getpostwithid',
            headers:{'Content-type':'application/json'},
            data:{
              id: id,
              token: localStorage.getItem('token')
            }
          })
          .then((response) => {
            if(response){
              this.setState({id:response.data._id,
                            title:response.data.title,
                            subject:response.data.subject,
                            author:response.data.author});
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
        componentDidMount(){
          this.getPostWithId();
        }
        validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let subjectValid = this.state.subjectValid;
      
          switch(fieldName) {
            case 'subject':
              subjectValid = value.length >= 20;
              fieldValidationErrors.subject = subjectValid ? '' : ' must have at least 20 symbols';
              break;
            default:
              break;
          }
          this.setState({formErrors: fieldValidationErrors,
                          subjectValid: subjectValid
                        }, this.validateForm);
        }
      
        validateForm() {
          this.setState({formValid: this.state.subjectValid});
        }
    render() {
      return (
        <div className='form1' id='addform'>
            <Link to='/posts'><button className='btn' id='viewposts'>view all</button></Link>
            <div className='newpost'>
                <h1>Tha Blogg</h1>
                <div className='form-group'>
                    <input value={this.state.title} onChange={this.handleFormInput} type='text' className='form-control' id='title' name='title' placeholder='Title'/>
                </div>
                
                <div className='form-group'>
                    <textarea value={this.state.subject} onChange={this.handleFormInput} className='form-control' type='textarea' name='subject' id='subject' placeholder='Subject' maxLength='140' rows='7'></textarea>
                </div>

                <button type='button' id='submit' name='submit' className='btn' onClick={this.addPost} disabled={!this.state.formValid}>add post</button>
            </div>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
              <ErrorHandler error={this.state.error}/>
            </div>
        </div>
      )
    }
}
export default MainPage;