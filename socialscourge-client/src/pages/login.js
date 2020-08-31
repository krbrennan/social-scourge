import React, { Component } from "react";
import "../App.css";
import AppIcon from "../images/plague.png";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Redux utils
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
// request
import axios from "axios";

const styles = {
  inputField: {
    // marginBottom: 10
  },
  heading: {
    margin: 30,
    textAlign: "center",
  },
  image: {
    height: "80px",
    width: "80px",
    margin: "0 auto",
    marginTop: 50,
  },
  customError: {
    color: "red",
    textAlign: "center",
  },
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  // componentDidUpdate(nextProps) {
  //   if (nextProps.UI.errors) {
  //     this.setState({ errors: nextProps.UI.errors });
  //   }
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div className="container login-form">
        <img src={AppIcon} alt="scourge" className={classes.image} />
        <Typography variant="h3" className={classes.heading}>
          Login
        </Typography>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <TextField
            helperText={errors.email}
            error={errors.email ? true : false}
            required
            label="Email"
            variant="filled"
            name="email"
            onChange={this.handleChange}
          />
          <TextField
            helperText={errors.password}
            error={errors.password ? true : false}
            className={classes.inputField}
            onChange={this.handleChange}
            required
            // value={this.state.password}
            type={this.state.showPassword ? "text" : "password"}
            label="Password"
            name="password"
            variant="filled"
            fullWidth
          />
          {errors && (
            <Typography variant="body2" className={classes.customError}>
              {errors}
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

// export default withStyles(styles)(login)
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));

// form
// axios to pass form data to be authenticated
//
