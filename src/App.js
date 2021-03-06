import React, { useState } from "react";
import { Route } from "react-router-dom";
// import styled from "styled-components";

//comment data may not need to be passed down to rightpanel.
import { comments, postData } from "./data/store.js";

import CombinedPanels from "./components/Forum/Combined-Panels";

import PostDetail from "./components/Dialogs/PostDetail.js";
// import PostReply from "./components/Dialogs/PostReply.js";

// import "./App.css";

function App() {
  //NEW POST CONTROLLERS

  /*****POST CONTROLLER LOGIC*********/

  //Initial formstate is for setting current post. This is then updated basedon the post that the user wants to edit.
  const initialFormState = {
    id: null,
    title: "",
    name: null,
    postText: "",
    comment: null,
    flag: null,
    date: null,
    time: null
  };

  //sets inital list of posts that are stored in db (currently dummy data in store.js)
  const [userPosts, setUserPosts] = useState(postData);
  //currentp post is used for editing functionality.  basically once
  const [currentPost, setCurrentPost] = useState(initialFormState);
  //editing switch.  HOwever, this is not used as newpost and edit existing forms are in seperate pages.
  const [editing, setEditing] = useState(false);

  //logic for adding new post.
  const addPost = newPost => {
    newPost.id = userPosts.length + 1;
    const newPosts = [...userPosts, newPost];
    console.log("App.js - addPost - newPosts updated", newPosts);
    setUserPosts(newPosts);
    // setUserPost(initialFormState);
  };

  //logic for deleting post.
  const deletePost = id => {
    setEditing(false);
    setUserPosts(userPosts.filter(post => post.id !== id));
  };

  //logic for updating a post once it's edited.
  const updatePost = (id, updatedPost) => {
    setEditing(false);
    setUserPosts(userPosts.map(post => (post.id === id ? updatedPost : post)));
  };

  //edits existin post.
  const editPost = post => {
    setEditing(true);

    setCurrentPost({
      id: post.id,
      title: post.title,
      name: post.name,
      postText: post.postText,
      comment: post.comment,
      flag: post.flag,
      date: post.date,
      time: post.time
    });
  };

  /*****REPLY CONTROLLER LOGICSHOULD GO HERE BUT CURRENTLY IN POSTDETAIL.JS; NEEDS TO BE RE-FACTORED.*********/

  
  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => (
          <CombinedPanels
            {...props}
            // post={postData}
            userPosts={userPosts}
            setUserPosts={setUserPosts}
            addPost={addPost}
            deletePost={deletePost}
            editing={editing}
            setEditing={setEditing}
            editPost={editPost}
            currentPost={currentPost}
            updatePost={updatePost}

            // handleSubmit={handleSubmit}
            // handleChangeText={handleChangeText}
            // handleChangeTitle={handleChangeTitle}
            // newPost={newPost}
            // setNewPost={setNewPost}
          />
        )}
      />
      <Route
        path="/posts/:id"
        render={props => (
          <PostDetail {...props} comments={comments} post={postData} />
        )}
      />
    </div>
  );
}

export default App;
