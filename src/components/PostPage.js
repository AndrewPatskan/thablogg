import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import config from '../config/index';
import ErrorHandler from '../helpers/error';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.delPost = this.delPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
          posts:[],
          error: ''
        };
      }

    updatePost(id){
      window.location.assign('/addpost/'+ id);
    }

    delPost(id){
            return axios({
                method:'post',
                url: config.serverUri + '/deletepost',
                headers:{'Content-type':'application/json'},
                data: {
                    id: id,
                    token: localStorage.getItem('token')
                }
                }
            )
            .then((response) => {
                console.log(response);
                this.getPost();
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

    getPost(){
        return axios({
            method:'post',
              url: config.serverUri + '/posts',
              headers: {'Content-type':'application/json'},
              data: {
                token: localStorage.getItem('token')
              }
        })
        .then((response) => {
            console.log(response);
            this.setState({posts:response.data});
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
      this.getPost();
    }
    
    logout(){
      localStorage.removeItem('token');
      window.location.assign('/signin');
    }

    render() {

      return (
        <div className='form1' id='viewform'>
          <Link to='/addpost'><button className='btn' id='viewposts'>add post</button></Link>
          <button className='btn' id='logout' onClick={this.logout}>log out</button>
          <br/>
          {
            this.state.posts.reverse().map(function(post,index) {
              let button1, button2;
              if(post.author === localStorage.getItem('userEmail')){
                button1 = <button className='btn' onClick={this.delPost.bind(this,post._id)}>delete</button>;
                button2 = <button className='btn' onClick={this.updatePost.bind(this,post._id)}>update</button>;
              } 
              else {
                button1 = null;
                button2 = null;
              }
              return <div id='postt' key={index}>
                        <h6>{post.title}</h6>
                        <p>{post.subject}</p>
                        <h6>{post.author}</h6>
                        {button1}
                        {button2}
                        <hr color='white'/>
                      </div>
            }.bind(this))
          }
          <ErrorHandler error={this.state.error} />
        </div>
      )
    }
  }

  export default PostPage;