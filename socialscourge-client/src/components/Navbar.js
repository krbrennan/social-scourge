import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Material-ui
// import { AppBar, Button, Typography, Toolbar } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import { Tooltip } from "@material-ui/core";

import { logoutUser } from "../redux/actions/userActions";

// Components
import CreatePost from "./CreatePost.js";

const styles = {
  iconStyle: {
    color: "white",
  },
  navFragment: {
    display: "flex",
    alignItems: "center",
  },
};

export class Navbar extends Component {
  constructor() {
    super();
  }

  handleLogoutClick = (event) => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: { authenticated },
    } = this.props;
    return (
      <div>
        <AppBar
          direction="column"
          justify="center"
          align-items="center"
          position="fixed"
        >
          <Toolbar className="nav-container">
            <Typography className={classes.navFragment} variant="h6">
              <Tooltip title="Home" placement="bottom">
                <Button color="inherit" component={Link} to="/">
                  <HomeIcon />
                </Button>
              </Tooltip>

              {authenticated ? (
                <Fragment>
                  <Tooltip title="Logout" placement="bottom">
                    <Button
                      color="inherit"
                      onClick={this.handleLogoutClick}
                      to="/"
                    >
                      <ExitToAppIcon />
                    </Button>
                  </Tooltip>
                  <CreatePost />
                </Fragment>
              ) : (
                <Fragment>
                  <Button color="inherit" component={Link} to="login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Signup
                  </Button>
                </Fragment>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const mapActionsToProps = {
  logoutUser,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Navbar));

// export default Navbar;
