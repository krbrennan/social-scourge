// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import PropTypes from "prop-types";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LanguageIcon from "@material-ui/icons/Language";

import dayjs from "dayjs";
import { connect } from "react-redux";

import LogoutBtn from "./LogoutBtn.js";
import EditProfile from "./EditProfile.js";

const styles = {
  hr: {
    borderColor: "transparent",
  },
  loggedInDiv: {
    height: 400,
    width: 400,
    margin: "0",
  },
  span: {
    marginLeft: "1em",
  },
  paper: {
    padding: 20,
  },
  profile: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
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
    "& .profile-details": {
      paddingBottom: "2em",
    },
  },
  profileImg: {
    borderRadius: "30%",
    height: "200px",
    width: "200px",
    display: "flex",
    margin: "0 auto",
  },
  imageWrapper: {
    display: "flex",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    padding: 20,
    button: {},
  },
  ".bottom-buttons": {
    display: "flex",
    height: "200px",
    // flexDirection: "row",
    padding: "2em",
  },
};

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: {
          username,
          createdAt,
          imgUrl,
          userId,
          email,
          bio,
          location,
          website,
        },
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
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${username}`}
                color="primary"
                variant="h5"
              >
                @{username}
              </MuiLink>
              <hr className={classes.hr} />
              {bio && (
                <Typography variant="body2">
                  {bio}
                  <hr className={classes.hr} />
                </Typography>
              )}
              <CalendarTodayIcon color="primary" />{" "}
              <span className="span">
                Joined {"        "}
                {dayjs(createdAt).format("MMM YYYY")}
              </span>
              <hr className={classes.hr} />
              {location && (
                <Fragment>
                  <LocationOn color="primary" />
                  <span className="span">
                    {"        "}
                    {location}
                  </span>
                  <hr className={classes.hr} />
                </Fragment>
              )}
              {website && (
                <Fragment>
                  <LanguageIcon />
                  <span className="span">
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {"        "}
                      {website}
                    </a>
                  </span>
                </Fragment>
              )}
            </div>
            <Fragment className="bottom-buttons">
              <EditProfile />
              <LogoutBtn />
            </Fragment>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body1" align="center">
            No profile found, please login or signup
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
              className={classes.button}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
              className={classes.button}
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
