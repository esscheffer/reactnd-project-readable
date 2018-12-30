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

const styles = {
    card: {
        minWidth: '80%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    actions: {
        display: 'flex',
    },
    pos: {
        marginBottom: 12,
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
                                    <IconButton>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            }
                            title={post.author}
                            subheader={new Date(post.timestamp).toLocaleString()}
                        />
                        <Typography variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography component="p">
                            Coments: {post.commentCount}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton>
                            <ThumbUpIcon/>
                        </IconButton>

                        {post.voteScore}

                        <IconButton>
                            <ThumbDowjnIcon/>
                        </IconButton>

                        <IconButton className={classes.cardActionRight}
                                    aria-label="Show more">
                            <ModeCommentIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Post);
