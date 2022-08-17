import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { getPosts } from "./actions/postsAction";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      
        <Routes>
          {/* <Route path="/" exact element={<Home />} /> */}
          <Route path="/" exact element={   <Navigate to ='/posts' />} />
          <Route path="/posts" exact element={<Home/>} />
          <Route path="/posts/search" exact element={<Home/>} />
          <Route path ='/posts/:id' element ={<PostDetails />} />
          <Route path="/auth" element={( !user ? <Auth /> : <Navigate to ='/posts' /> )} />
          {/* <Route path="/auth" element={  ( !user ? <Auth /> : <Navigate to ='/posts' /> )} /> */}

        </Routes>
      
    </Container>
    </BrowserRouter>
  );
}

export default App;
