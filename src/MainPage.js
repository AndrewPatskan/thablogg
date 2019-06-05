import React, { Component } from 'react';
import './App.css'
import axios from 'axios';
import {Link} from 'react-router-dom';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.addPost = this.addPost.bind(this);
        this.getPostWithId = this.getPostWithId.bind(this);
        this.state = {
          title:'',
          subject:'',
          author: '',
          id: ''
        };
      }
        handleTitleChange(e){
          this.setState({title:e.target.value});
        }
        handleSubjectChange(e){
          this.setState({subject:e.target.value});
        }
        handleAuthorChange(e){
          this.setState({author:e.target.value});
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
              window.location.assign('https://thablogg.herokuapp.com/posts')
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
    render() {
      return (
        <div className='form1' id='addform'>
            <Link to='/posts'><button className='btn' id='viewposts'>view all</button></Link>
            <div className='newpost'>
                <h1>Tha Blogg</h1>
                <div className='form-group'>
                    <input value={this.state.title} onChange={this.handleTitleChange} type='text' className='form-control' id='title' name='title' placeholder='Title' required />
                </div>
                
                <div className='form-group'>
                    <textarea value={this.state.subject} onChange={this.handleSubjectChange} className='form-control' type='textarea' id='subject' placeholder='Subject' maxLength='140' rows='7'></textarea>
                </div>

                <div className='form-group'>
                    <input value={this.state.author} onChange={this.handleAuthorChange} type='text' className='form-control' id='author' name='author' placeholder='Author' required />
                </div>
                    <button type='button' id='submit' name='submit' className='btn' onClick={this.addPost}>add post</button>
            </div>
        </div>
      )
    }
}
export default MainPage;