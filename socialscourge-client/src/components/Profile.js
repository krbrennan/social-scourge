import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';

import axios from 'axios';
import { Typography } from '@material-ui/core';

const styles = {
    loggedInDiv: {
        height: 400,
        width: 400,
        background: 'yellow',
        margin: '0'
    },
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
        const { classes } = this.props;
        return(
            <div>
                { this.state.isLoggedIn ?
                    <div>
                        <div className={classes.loggedInDiv}>
                            <img />
                        </div>
                    </div>
                :
                    <div>
                        <div>

                        </div>
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