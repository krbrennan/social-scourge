import React, { Component } from 'react';
import logo from '../images/plague.png';

import Link from 'react-router-dom/Link';

import axios from 'axios';

// Material-ui
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
    signupPage: {
        margin: '80px auto 0 auto',
        width: "auto",
        display: "flex",
        flexDirection: "column"
    },
    signupTop: {
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
    },
    img: {
        margin: '0 auto',
        marginBottom: 5
    },
    formContainer: {
        marginTop: 20,
        margin: '0 auto',
        display: "flex",
        flexDirection: "column"
    },
    formContainerItem: {
        // marginTop: 5
        width: 500
    },
    error: {
        color: 'red',
        margin: '1em 0',
        textAlign: 'center'
    },
    small: {
        textAlign: 'center',
        margin: '20px auto'
    }
}

export class signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            biography: '',
            country: '',
            state: '',
            website: '',
            errors: ''
        }
    }

    handleChange = (props) => {
        // console.log(props.target.value)
        // console.log(props.currentTarget.name)
        this.setState({
            [props.target.name]: props.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            username: this.state.username,
            bio: this.state.biography
        }

        axios.post('/signup', userData)
            .then((res) => {
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
                this.props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
                // console.log(err.response.data.message)
                this.setState({
                    errors: err.response.data.message
                })
            })
    }


    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <div className={classes.signupPage}>
                <div className={ classes.signupTop }>
                    <img src={ logo } className={ classes.img }/>
                    <Typography variant='h3'>
                        Signup
                    </Typography>
                </div>
                <form className={classes.formContainer} onSubmit={ this.handleSubmit }>
                    <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' required label='Required' name='email' defaultValue='Email' />
                    <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' required label='Required' name='username' defaultValue='Username' />
                    <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' required label='Required' name='password' defaultValue='Password' />
                    <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' required label='Required' name='confirmPassword' defaultValue='Confirm Password' />
                    {/* <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' multiline rows={4} label='Optional' name='biography' defaultValue='Biography' /> */}
                    {/* <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' required label='Required' name='country' defaultValue='Country' /> */}
                    {/* <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' required label='Optional' name='state' defaultValue='State' /> */}
                    {/* <TextField className={ classes.formContainerItem } onChange={ this.handleChange } variant='filled' required label='optional' name='website' defaultValue='Personal Website' /> */}
                    {/* <TextField className={ classes.formContainerItem } label='Optional' def/> */}
                    {errors && (
                        <Typography className={ classes.error } variant='body2'>
                            {errors}
                        </Typography>
                    )}
                    <Button variant='contained' color='primary' type='submit'>Submit</Button>
                    <small className={ classes.small }>
                        Already have an Account? Login <Link to='/login'>here</Link>
                    </small>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(signup)
// export default signup

// field elements:
// bio
// password
// confirm password
// email
// imgUrl (optional)
// location
// username
// any personal website links