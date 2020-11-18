import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  CREATE_POST,
  SET_POSTS,
  SET_POST,
  LOADING_DATA,
} from "../reducers/types";

import axios from "axios";

export const getAllPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("https://us-central1-social-scourge.cloudfunctions.net/api/posts")
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => dispatch({ type: SET_POSTS, payload: [] }));
};

// Create a post
export const createPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("https://us-central1-social-scourge.cloudfunctions.net/api/post", newPost)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: CREATE_POST, payload: res.data });
      dispatch(clearErrors());
      dispatch({ type: LOADING_UI });
    })
    .catch((err) => {
      //   console.log(err.response);
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
