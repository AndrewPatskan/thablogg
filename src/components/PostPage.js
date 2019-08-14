import React, { Component } from 'react';
import '../styles/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.delPost = this.delPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
          posts:[]
        };
      }
    updatePost(id){
      window.location.assign('/addpost/'+id);
    }
    delPost(id){
        const self = this;
            return axios({
                method:'post',
                url:'http://localhost:7777/deletepost',
                headers:{'Content-type':'application/json'},
                data: {
                    id: id,
                    token: localStorage.getItem('token')
                }
                }
            )
            .then(function (response) {
                console.log(response);
                self.getPost();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPost(){
        const self = this;
       
        return axios({
            method:'post',
              url:'http://localhost:7777/posts',
              headers:{'Content-type':'application/json'},
              data:{
                token: localStorage.getItem('token')
            }
        })
        .then(function (response) {
            console.log(response);
            self.setState({posts:response.data});
        })
        .catch(function (error) {
          console.log('error is ',error);
          /*const mess = document.createElement('h1');
            const node = document.createTextNode('Please signin or register');
            mess.appendChild(node);
            const div = document.getElementById('viewform');
            div.appendChild(mess); */
            window.location.assign('/signin');
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
        </div>
      )
    }
  }
  export default PostPage;