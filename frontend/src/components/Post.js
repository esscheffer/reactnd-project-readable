import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/es/colors/red";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDowjnIcon from '@material-ui/icons/ThumbDown';
import {handleDeletePost, handleDownVotePost, handleUpVotePost} from "../actions/posts";
import {connect} from "react-redux";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

const styles = {
    card: {
        minWidth: '80%',
    },
    title: {
        textAlign: 'center'
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    },
    cardActionRight: {
        marginLeft: 'auto',
    },
};

class Post extends Component {
    state = {};

    handleUpVoteClick = (e) => {
        e.preventDefault();
        const {dispatch, post} = this.props;
        dispatch(handleUpVotePost(post))
    };

    handleDownVoteClick = (e) => {
        e.preventDefault();
        const {dispatch, post} = this.props;
        dispatch(handleDownVotePost(post))
    };

    deleteButtonClick = () => {
        confirmAlert({
            title: 'Confirm delete',
            message: 'Are you sure you want to delete this post?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => {
                        const {dispatch, post} = this.props;
                        dispatch(handleDeletePost(post))
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {}
                }
            ]
        })
    };

    render() {
        const {classes, post} = this.props;
        return (
            <Grid item xs={12} className={classes.card}>
                <Card>
                    <CardContent>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Post" className={classes.avatar}>
                                    {post.author.substr(0, 2).toUpperCase()}
                                </Avatar>
                            }
                            action={
                                <div>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={this.deleteButtonClick}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            }
                            title={post.author}
                            subheader={new Date(post.timestamp).toLocaleString()}
                        />
                        <Typography variant="h5" component="h2" className={classes.title}>
                            {post.title}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton onClick={this.handleUpVoteClick}>
                            <ThumbUpIcon/>
                        </IconButton>

                        {post.voteScore}

                        <IconButton onClick={this.handleDownVoteClick}>
                            <ThumbDowjnIcon/>
                        </IconButton>

                        <div className={classes.cardActionRight}>
                            {post.commentCount}
                            <IconButton aria-label="Comments">
                                <ModeCommentIcon/>
                            </IconButton>
                        </div>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

function mapStateToProps(_, {post}) {
    return {
        post
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Post))
