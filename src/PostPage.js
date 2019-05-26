import React, { Component } from 'react';
import './App.css'
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
      window.location.assign('https://thablogg.herokuapp.com/addpost/'+id);
    }
    delPost(id){
        const self = this;
            return axios({
                method:'post',
                url:'https://thablogg.herokuapp.com/deletepost',
                headers:{'Content-type':'application/json'},
                data: {
                    id: id
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
              url:'https://thablogg.herokuapp.com/posts',
              headers:{'Content-type':'application/json'},
        })
        .then(function (response) {
            self.setState({posts:response.data});
        })
        .catch(function (error) {
          console.log('error is ',error);
        });
    }
    componentDidMount(){
        this.getPost();
      }
    logout(){
      //its just a training code
      const mess = document.createElement('h7');
      const node = document.createTextNode('logout is not workin yet');
      mess.appendChild(node);
      const div = document.getElementById('viewform');
      div.appendChild(mess);
    }
    render() {
      return (
        <div className='form1' id='viewform'>
            <Link to='/addpost'><button className='btn' id='viewposts'>add post</button></Link>
            <button className='btn' id='logout' onClick={this.logout}>log out</button>
            <br/>
            {
                this.state.posts.reverse().map(function(post,index) {
                    return <div key={index}>
                        <h6>{post.title}</h6>
                        <p>{post.subject}</p>
                        <h6>{post.author}</h6>
                        <button className='btn' onClick={this.delPost.bind(this,post._id)}>delete</button>
                        <button className='btn' onClick={this.updatePost.bind(this,post._id)}>update</button>
                        <hr color='black'/>
                    </div>
          }.bind(this))
        }
        </div>
      )
    }
  }
  export default PostPage;