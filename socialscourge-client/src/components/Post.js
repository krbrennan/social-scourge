import React, { Component } from "react";

import Link from "react-router-dom/Link";

// MUI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { Card } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

// DayJs
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    maxWidth: "90%",
  },
  media: {
    width: 150,
    backgroundRepeat: "no-repeat",
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
};
class Post extends Component {
  render() {
    const {
      classes,
      post: {
        username,
        createdAt,
        body,
        userImg,
        likeCount,
        commentCount,
        postId,
      },
    } = this.props;
    dayjs.extend(relativeTime);
    return (
      <Card spacing={16} className={classes.card}>
        <CardMedia
          className={classes.media}
          title="cardMedia Title"
          image={userImg}
          title="Profile Image"
          color="primary"
        />
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${username}`}>
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {body}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
