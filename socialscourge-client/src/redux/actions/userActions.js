import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../reducers/types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI});
     // send req to server and show errors, if successful then show errors
     axios.post('/signin', userData)
        .then((postData) => {
            // console.log(postData.data)
            const FBIdToken = `Bearer ${postData.data.token}`
            localStorage.setItem('FBIdToken', `Bearer ${postData.data.token}`)
            axios.defaults.headers.common['Authorization'] = FBIdToken
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS});
            history.push('/')
        })
        .catch((err) => {
            // console.log(err.response.data)
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res._data
            })
        })
        .catch((err) => {
            console.log(err)
        })
}