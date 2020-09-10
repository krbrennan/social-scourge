import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { editProfile } from "../redux/actions/userActions";

import { connect } from "react-redux";
import { Tooltip } from "@material-ui/core";

const styles = {
  button: {
    borderRadius: "0",
  },
};

class EditProfile extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false,
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };

  handleChange = (props) => {
    this.setState({
      [props.target.name]: props.target.value,
    });
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  submitChanges = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
    };
    this.props.editProfile(userDetails);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Tooltip title="Edit Profile Details" placement="right">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary"></EditIcon>
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClone={this.state.handleClose}
          fullWidth
        >
          <DialogContent>
            <DialogContentText>Edit Profile Details</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Biography"
              type="text"
              name="bio"
              multiline
              rows="3"
              fullWidth
              defaultValue={this.state.bio}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Website"
              type="text"
              name="website"
              fullWidth
              defaultValue={this.state.website}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Location"
              type="text"
              name="location"
              fullWidth
              defaultValue={this.state.location}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitChanges} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editProfile })(
  withStyles(styles)(EditProfile)
);
