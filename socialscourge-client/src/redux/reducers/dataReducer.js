import { LOADING_DATA, CREATE_POST } from "./types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
}
