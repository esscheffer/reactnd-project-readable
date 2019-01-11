import React, {Component} from 'react';
import red from "@material-ui/core/es/colors/red";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Vote from "./Vote";
import {handleDeleteComment, handleDownVoteComment, handleUpVoteComment} from "../actions/comments";
import {connect} from "react-redux";
import {confirmAlert} from "react-confirm-alert";

const styles = theme => ({
    card: {
        minWidth: '80%',
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

class Comment extends Component {
    state = {};

    handleUpVoteClick = (e) => {
        e.preventDefault();
        const {dispatch, comment} = this.props;
        dispatch(handleUpVoteComment(comment))
    };

    handleDownVoteClick = (e) => {
        e.preventDefault();
        const {dispatch, comment} = this.props;
        dispatch(handleDownVoteComment(comment))
    };

    deleteButtonClick = () => {
        confirmAlert({
            title: 'Confirm delete',
            message: 'Are you sure you want to delete this comment?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => {
                        const {dispatch, comment} = this.props;
                        dispatch(handleDeleteComment(comment));
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

    render() {
        const {classes, comment} = this.props;
        return (
            <Grid item xs={12} className={classes.card}>
                <Card>
                    <CardContent>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="Comment" className={classes.avatar}>
                                    {comment.author.substr(0, 2).toUpperCase()}
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
                            title={comment.author}
                            subheader={new Date(comment.timestamp).toLocaleString()}/>
                        <Typography variant="h5" component="h2">
                            {comment.body}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Vote handleUpVoteClick={this.handleUpVoteClick}
                              handleDownVoteClick={this.handleDownVoteClick}
                              voteScore={comment.voteScore}/>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default connect()(withStyles(styles)(Comment));
