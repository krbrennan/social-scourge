import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';

import axios from 'axios';
import { Typography } from '@material-ui/core';

const styles = {

}

class Profile extends Component {

    componentDidMount(){
       if(localStorage.getItem('FBIdToken')){
           this.setState({
               isLoggedIn: true
           })
       } else{
            this.setState({
                isLoggedIn: false
            })
       }
    }
    

    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            imgUrl: '',
            username: '',
            bio: ''
        }
    }

    render(){
        return(
            <div>
                { this.state.isLoggedIn ?
                    <div className='container'>
                        <Typography>
                            Logged In
                        </Typography>
                    </div>
                :
                    <div className='container'>
                        <Typography>
                            Not Logged in
                        </Typography>
                    </div>
                }
            </div>
        )
    }
}


export default withStyles(styles)(Profile);

// if localStorage.getItem('FBIdToken')
// show profile information
// else show a box to signin or signup