import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
} from "./types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  likes: [],
};

export default function (state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
