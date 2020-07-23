import React, { Component } from 'react';

import axios from 'axios';

// Material-UI
import Grid from '@material-ui/core/Grid';

class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: null
        }
    }

    componentDidMount(){
        axios.get('/posts')
            .then((postData) => {
                // console.log(data)
                this.setState({
                    posts: postData.data
                })
            })
            // .then(() => {
            //     return res.status(200)
            // })
            // .catch((err) => {
            //     res.status(500).json(err)
            // })
    }

    render() {
        return (
            <Grid container className='container'>
                <Grid item sm={8} xs={12}>
                    { this.state.posts ? 
                        // console.log(this.state.posts)
                        this.state.posts.map((postItem) => {
                           return <p>{postItem.body}</p> 
                        })
                    :
                        <p>LOADING...</p>
                    }
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default home;
