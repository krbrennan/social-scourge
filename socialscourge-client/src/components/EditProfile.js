import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export class EditProfile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/editDetails"
      >
        Edit Details
      </Button>
    );
  }
}

export default EditProfile;
