import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  CREATE_POST,
} from "../reducers/types";

import axios from "axios";

// export const getAllPosts = () => (dispatch) => {
//     axios
//         .get("/posts")
//         .then
// }

// Create a post
export const createPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", newPost)
    .then((res) => {
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
