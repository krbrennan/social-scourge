import React, { Component } from "react";
import PropTypes from "prop-types";

import axios from "axios";

import withStyles from "@material-ui/core/styles/withStyles";

// Components
import Post from "../components/Post";
import Profile from "../components/Profile";

// Material-UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import { getAllPosts } from "../redux/actions/dataActions.js";

const styles = {};

class home extends Component {
  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    const { posts, loading } = this.props.data;
    console.log(posts)
    // if(posts.length !== 0){

    // }
    let mostRecentScreams = !loading ? (
      // do i need to parse?
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <p>LOADING...</p>
    );

    return (
      <Grid container className="container">
        <Grid item sm={6} xs={12}>
          {mostRecentScreams}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getAllPosts })(home);

// export default home;
// export default withStyles(styles)(home);
