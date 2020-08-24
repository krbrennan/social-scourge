import React, { Component } from "react";
import Link from "react-router-dom/Link";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import axios from "axios";
import { Typography } from "@material-ui/core";

// icons
const styles = {
  loggedInDiv: {
    height: 400,
    width: 400,
    background: "yellow",
    margin: "0",
  },
};

class Profile extends Component {
  componentDidMount() {
    if (localStorage.getItem("FBIdToken")) {
      this.setState({
        isLoggedIn: true,
      });
    } else {
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      imgUrl: "",
      username: "",
      bio: "",
    };
  }

  render() {
    const {
      classes,
      user: {
        credentials: { username, createdAt, imageUrl, bio, website, location },
        loading,
      },
    } = this.props;

    // let profileMarkup = !loading ? (
    //   authenticated ? (
    //     <Paper className={classes.paper}>
    //       <div className={classes.profile}>
    //         <div className="profile-image">
    //           <img src={imageUrl} alt="profile" />
    //         </div>
    //         <hr />
    //         <div className="profile-details">
    //           <MuiLink
    //             component={Link}
    //             to={`/users/${username}`}
    //             color="primary"
    //             variant="h5"
    //           >
    //             @{username}
    //           </MuiLink>
    //           <hr />
    //           {bio && <Typography variant="body2">{bio}</Typography>}
    //           <hr />
    //         </div>
    //       </div>
    //     </Paper>
    //   ) : null
    // ) : (
    //   <p>Loading</p>
    // );
    return <h1>Anus</h1>;
    // return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));

// if localStorage.getItem('FBIdToken')
// show profile information
// else show a box to signin or signup
