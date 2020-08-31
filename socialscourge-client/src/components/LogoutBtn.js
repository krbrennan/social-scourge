import React, { Component } from "react";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

import Button from "@material-ui/core/Button";

export class LogoutBtn extends Component {
  constructor() {
    super();
  }

  handleLogoutClick = (event) => {
    // event.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Button
        className="button"
        variant="contained"
        color="secondary"
        onClick={this.handleLogoutClick}
      >
        Logout
      </Button>
    );
  }
}

const mapActionsToProps = {
  logoutUser,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapActionsToProps)(LogoutBtn);
