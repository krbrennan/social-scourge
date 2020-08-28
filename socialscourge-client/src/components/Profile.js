// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import dayjs from "dayjs";
import { connect } from "react-redux";

const styles = {
  loggedInDiv: {
    height: 400,
    width: 400,
    margin: "0",
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& image-wrapper": {
      display: "flex",
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
  },
  profileImg: {
    height: "120px",
    display: "flex",
    width: "100px",
    margin: "0 auto",
  },
  imageWrapper: {
    display: "flex",
  },
};

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { username, createdAt, imgUrl, userId, email },
        authenticated,
        loading,
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imgUrl} alt="profile" className={classes.profileImg} />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.usernameImageChange}
              />
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${username}`}
                color="primary"
                variant="h5"
              >
                @{username}
              </MuiLink>
              <hr />
              <CalendarTodayIcon color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            {/* <MyButton tip="Logout" onClick={this.usernameLogout}>
              <KeyboardReturn color="primary" />
            </MyButton> */}
            {/* <EditDetails /> */}
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Loading</p>
    );
    return profileMarkup;
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
