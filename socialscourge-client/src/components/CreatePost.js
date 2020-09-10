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
import CircularProgress from "@material-ui/core/CircularProgress";

import { createPost } from "../redux/actions/dataActions";

import { connect } from "react-redux";
import { Tooltip } from "@material-ui/core";

const styles = {};

class CreatePost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleChange = (props) => {
    this.setState({
      [props.target.name]: props.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createPost({ body: this.state.body });
    this.handleClose();
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <Button onClick={this.handleOpen}>Create new Post</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle color="inherit">Create a new Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                name="body"
                id="CreatePost"
                label="What's on your mind?"
                fullWidth
                type="text"
                margin="dense"
                onChange={this.handleChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { createPost })(
  withStyles(styles)(CreatePost)
);