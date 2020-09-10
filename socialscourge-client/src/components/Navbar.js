import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Material-ui
// import { AppBar, Button, Typography, Toolbar } from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { logoutUser } from "../redux/actions/userActions";

// Components
import CreatePost from "./CreatePost.js";

export class Navbar extends Component {
  constructor() {
    super();
  }

  handleLogoutClick = (event) => {
    this.props.logoutUser();
  };

  render() {
    const {
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
            <Typography variant="h6">
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>

              {authenticated ? (
                <Fragment>
                  <Button
                    color="inherit"
                    onClick={this.handleLogoutClick}
                    to="/"
                  >
                    Logout
                  </Button>
                  <CreatePost />
                </Fragment>
              ) : (
                <Button color="inherit" component={Link} to="login">
                  Login
                </Button>
              )}
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
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

export default connect(mapStateToProps, mapActionsToProps)(Navbar);

// export default Navbar;
