import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import { connect } from "react-redux";

// icons
const styles = {
  loggedInDiv: {
    height: 400,
    width: 400,
    background: "yellow",
    margin: "0",
  },
  paper: {
    background: "green",
  },
  profile: {
    background: "red",
  },
};

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { username, createdAt, imageUrl },
        authenticated,
        loading,
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="profile-image">
              <img src={imageUrl} alt="profile" />
            </div>
            <hr />
            <div>
              <MuiLink
                component={Link}
                to={`/users/${username}`}
                color="primary"
                variant="h5"
              >
                @{username}
              </MuiLink>
              <hr />

              <CalendarTodayIcon color="primary" />
              {"  "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile Found. Please Login Again
          </Typography>
          <div>
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

{
  /* {bio && <Typography variant="body2">{bio}</Typography>} */
}
//  <hr />
{
  /* {location && (
   <Fragment>
     <LocationOn color="primary" /> <span>{location}</span>
     <hr />
   </Fragment>
 )} */
}
{
  /* {website && (
   <Fragment>
     <LinkIcon color="primary" />
     <a href={website} target="_blank" rel="noopener noreferrer">
       {"  "}
       {website}
     </a>
     <hr />
   </Fragment>
 )} */
}
