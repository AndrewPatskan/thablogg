import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FormErrors } from './FormErrors';

class MainPage extends Component {
    constructor(props) {
        super(props);
        /*this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this); */
        this.addPost = this.addPost.bind(this);
        this.getPostWithId = this.getPostWithId.bind(this);
        this.handleFormInput = this.handleFormInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.state = {
          title:'',
          subject:'',
          author: '',
          id: '',
          formErrors: {subject: '', author: ''},
          subjestValid: false,
          authorValid: false,
          formValid: false
        };
      }
      /* handleTitleChange(e){
          this.setState({title:e.target.value});
        }
        handleSubjectChange(e){
          this.setState({subject:e.target.value});
        }
        handleAuthorChange(e){
          this.setState({author:e.target.value});
        } */
      handleFormInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
          () => { this.validateField(name, value) });
      }
        addPost(){
              return axios({
              method:'post',
              url:'http://localhost:7777/addpost',
              headers:{'Content-type':'application/json'},
              data:{
              title: this.state.title,
              subject: this.state.subject,
              author: this.state.author,
              id: this.state.id
            }})
            .then(function (response) {
              console.log('succ');
              window.location.assign('http://localhost:3000/posts')
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        getPostWithId(){
          const id = this.props.match.params.id;
          const self = this;
          return axios({
            method:'post',
            url:'http://localhost:7777/getpostwithid',
            headers:{'Content-type':'application/json'},
            data:{
              id: id
            }
          })
          .then(function (response) {
            if(response){
              self.setState({id:response.data._id});
              self.setState({title:response.data.title});
              self.setState({subject:response.data.subject});
              self.setState({author:response.data.author});  
            }
          })
          .catch(function (error) {
            console.log('error is ',error);
          });
        }
        componentDidMount(){
          this.getPostWithId();
        }
        validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let subjectValid = this.state.subjectValid;
          let authorValid = this.state.authorValid;
      
          switch(fieldName) {
            case 'subject':
              subjectValid = value.length >= 20;
              fieldValidationErrors.subject = subjectValid ? '' : ' should have at least 20 symbols';
              break;
            case 'author':
              authorValid = value.length >= 10;
              fieldValidationErrors.author = authorValid ? '': ' is too short';
              break;
            default:
              break;
          }
          this.setState({formErrors: fieldValidationErrors,
                          subjectValid: subjectValid,
                          authorValid: authorValid,
                        }, this.validateForm);
        }
      
        validateForm() {
          this.setState({formValid: this.state.subjectValid && this.state.authorValid});
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

                <div className='form-group'>
                    <input value={this.state.author} onChange={this.handleFormInput} type='text' className='form-control' id='author' name='author' placeholder='Author'/>
                </div>
                    <button type='button' id='submit' name='submit' className='btn' onClick={this.addPost} disabled={!this.state.formValid}>add post</button>
            </div>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
        </div>
      )
    }
}
export default MainPage;