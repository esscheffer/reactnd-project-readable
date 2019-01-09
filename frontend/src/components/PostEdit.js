import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {handleEditPost} from "../actions/posts";

const styles = theme => ({
    card: {
        width: '100%',
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
        marginTop: 20
    },
    formClass: {
        width: '60%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginBottom: 20,
        width: '100%',
    },
    button: {
        margin: theme.spacing.unit
    },
    container: {
        marginBottom: 20
    },
    buttonsDiv: {
        textAlign: 'center'
    }
});

class PostEdit extends Component {
    state = {
        title: this.props.post.title,
        content: this.props.post.body
    };

    handleChangeText = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {title, content} = this.state;
        const {dispatch, post} = this.props;

        let postUpdate = {
            id: post.id,
            title: title,
            body: content,
        };

        let oldPost = {
            id: post.id,
            title: post.title,
            body: post.body
        };

        dispatch(handleEditPost(postUpdate, oldPost));

        this.props.handleClose();
    };

    render() {
        const {classes} = this.props;

        return (
            <Grid container
                  direction="column"
                  justify="space-between"
                  spacing={16}
                  className={classes.container}
                  alignItems="center">
                <form className={classes.formClass} onSubmit={this.handleSubmit}>
                    <Paper className={classes.card}>
                        <Typography variant="h5" component="h3">
                            Edit Post
                        </Typography>
                        <TextField
                            id="post-title"
                            label="Title"
                            className={classes.textField}
                            value={this.state.title}
                            onChange={this.handleChangeText('title')}
                            margin="normal"
                            required={true}/>
                        <TextField
                            id="post-content"
                            label="Content"
                            required={true}
                            multiline
                            rows="6"
                            value={this.state.content}
                            onChange={this.handleChangeText('content')}
                            className={classes.textField}
                            margin="normal"/>
                        <div className={classes.buttonsDiv}>
                            <Button variant="contained" color="primary" className={classes.button} type={'submit'}>
                                Save
                            </Button>
                            <Button variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    type={'button'}
                                    onClick={this.props.handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </Paper>
                </form>
            </Grid>
        );
    }
}

export default connect()(withStyles(styles)(PostEdit))