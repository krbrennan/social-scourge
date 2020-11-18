import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import Post from "../components/Post";
import Profile from "../components/Profile";

// Material-UI
import Grid from "@material-ui/core/Grid";
import { connect, useSelector, useDispatch } from "react-redux";

import { getAllPosts } from "../redux/actions/dataActions.js";
// import GetPosts from '../components/GetPosts.js';

const styles = {};


class home extends Component {
  
  // this is what's fucking me
  componentDidMount() {
    this.props.getAllPosts();
  }
  
  render() {
    const { posts, loading } = this.props.data;

    let mostRecentScreams = !loading ? (
    posts.map((post) => {
      return <Post key={post.postId} post={post} />})
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

// function Home(props) {

 

//     // const { posts, loading } = props.data;
//     const { posts, loading } = props.data;

// console.log(posts)

//     let mostRecentScreams = !loading ? (
//     posts.map((post) => {
//       return <Post key={post.postId} post={post} />})
//     ) : (
//       <p>LOADING...</p>
//     );

//     return (
//       <Grid container className="container">
//         <Grid item sm={6} xs={12}>
//           {mostRecentScreams}
//         </Grid>
//         <Grid item sm={4} xs={12}>
//           <Profile />
//         </Grid>
//       </Grid>
//     );
  
// }

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
