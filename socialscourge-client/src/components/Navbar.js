import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Material-ui
// import { AppBar, Button, Typography, Toolbar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export class Navbar extends Component {
    render() {
        return (
                <div>
                    <AppBar
                        direction='column'
                        justify='center'
                        align-items='center'
                        position='fixed'
                    >
                        <Toolbar className='nav-container'>
                            <Typography variant='h6'>
                                <Button color='inherit' component={ Link } to='/'>Home</Button>
                                <Button color='inherit' component={ Link } to='login'>Login</Button>
                                <Button color='inherit' component={ Link } to='/signup'>Signup</Button>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
        )
    }
}

export default Navbar