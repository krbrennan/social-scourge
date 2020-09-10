import React, { Component } from "react";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

// MUI
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";

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
      <Tooltip title="Logout" placement="left">
        <IconButton id="imageInput" onClick={this.handleLogoutClick}>
          <ExitToAppIcon color="primary">Logout</ExitToAppIcon>
        </IconButton>
      </Tooltip>
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
