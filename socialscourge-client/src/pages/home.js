import React, { Component } from 'react';

import axios from 'axios';

// Components
import Post from '../components/Post';

// Material-UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;

        let posts = this.state.posts ? 
        this.state.posts.map(post => <Post key={post.postId} post={post} />)
        : <p>LOADING...</p>

        return (
            <Grid container className='container'>
                <Grid item sm={8} xs={12}>
                    { posts}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default home;
// export default withStyles(styles)(home);
