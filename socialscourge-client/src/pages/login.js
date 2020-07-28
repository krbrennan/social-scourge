import React, { Component } from 'react';
import '../App.css';
import AppIcon from '../images/plague.png';

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// request
import axios from 'axios';

const styles = {
    inputField: {
        // marginBottom: 10
    },
    heading: {
        marginTop: 10,
        textAlign: "center"
    },
    image: {
        height: "64px",
        width: "64px",
        margin: "0 auto"
    },
    customError: {
        color: 'red',
        margin: '1em 0',
        textAlign: "center"
    }
}

class login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        // send req to server and show errors, if successful then show errors
        axios.post('/signin', userData)
            .then((postData) => {
                // console.log(postData.data)
                localStorage.setItem('FBIdToken', `Bearer ${postData.data.token}`)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch((err) => {
                // console.log(err.response)
                this.setState({
                    errors: "Incorrect username or password.",
                    loading: false
                })
            })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <div className='container login-form'>
                <img src={AppIcon} alt='scourge' className={classes.image} />
                <Typography variant="h3" className={ classes.heading }>
                    Login
                </Typography>
            <form className='login-form' onSubmit={ this.handleSubmit }>
                <TextField 
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    required 
                    label='Email' 
                    variant='filled' 
                    name='email' 
                    onChange={this.handleChange}
                />
                <TextField 
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    className={classes.inputField}
                    onChange={this.handleChange} 
                    required 
                    // value={this.state.password} 
                    type={this.state.showPassword ? 'text' : 'password'} 
                    label='Password' 
                    name='password'
                    variant='filled'
                    fullWidth
                />
                {errors && (
                    <Typography variant='body2' className={classes.customError}>
                        { errors }
                    </Typography>
                )}
                <Button variant='contained' color='primary' type='submit'>Login</Button>
            </form>
            </div>
        )
    }
}

export default withStyles(styles)(login)

// form
// axios to pass form data to be authenticated
// 
