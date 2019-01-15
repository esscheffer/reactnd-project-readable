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
import {handleDeletePost, handleDownVotePost, handleUpVotePost} from "../actions/posts";
import {connect} from "react-redux";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Chip from "@material-ui/core/Chip";
import CardActionArea from "@material-ui/core/CardActionArea";
import Redirect from "react-router-dom/es/Redirect";
import Collapse from "@material-ui/core/Collapse";
import Vote from "./Vote";

const styles = theme => ({
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
    chip: {
        margin: theme.spacing.unit,
    },
});

class Post extends Component {
    state = {
        toPostDetails: false,
        detailsPage: this.props.detailsPage || false
    };

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
                        const {dispatch, post, onDeleteAction} = this.props;
                        dispatch(handleDeletePost(post));
                        if (onDeleteAction) {
                            onDeleteAction();
                        }
                    }
                },
                {
                    label: 'Cancel',
                    onClick: () => {
                    }
                }
            ]
        })
    };

    redirectPostDetails = () => {
        this.setState({toPostDetails: true});
    };

    render() {
        const {classes, post} = this.props;
        const {toPostDetails, detailsPage} = this.state;

        let disableTitleClick = false;
        if (this.props.titleClickable !== undefined && this.props.titleClickable !== null) {
            disableTitleClick = !this.props.titleClickable
        }

        if (post === null) {
            return <p>This post doesn't exist</p>
        }

        if (toPostDetails === true) {
            return <Redirect to={`/${post.category}/${post.id}`}/>
        }

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
                                    <Chip
                                        label={post.category}
                                        className={classes.chip}
                                        color="primary"/>
                                    {detailsPage ?
                                        <IconButton>
                                            <EditIcon onClick={this.props.editAction}/>
                                        </IconButton>
                                        : null}
                                    <IconButton onClick={this.deleteButtonClick}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            }
                            title={post.author}
                            subheader={new Date(post.timestamp).toLocaleString()}
                        />
                        <CardActionArea onClick={this.redirectPostDetails} disabled={disableTitleClick}>
                            <Typography variant="h5" component="h2" className={classes.title}>
                                {post.title}
                            </Typography>
                        </CardActionArea>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Vote handleUpVoteClick={this.handleUpVoteClick}
                              handleDownVoteClick={this.handleDownVoteClick}
                              voteScore={post.voteScore}/>
                        <div className={classes.cardActionRight}>
                            {post.commentCount}
                            <IconButton aria-label="Comments" disabled={true}>
                                <ModeCommentIcon/>
                            </IconButton>
                        </div>
                    </CardActions>
                    <Collapse in={detailsPage} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{post.body}</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        );
    }
}

export default connect()(withStyles(styles)(Post))
