import React, {Component} from 'react';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import uuidv4 from "uuid/v4";
import {handleCreateComment} from "../actions/comments";

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

class NewComment extends Component {
    state = {
        author: '',
        content: '',
    };

    handleChangeText = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {author, content} = this.state;
        const {dispatch, postId} = this.props;

        let comment = {
            id: uuidv4(),
            timestamp: Date.now(),
            body: content,
            author: author,
            parentId: postId,
        };

        dispatch(handleCreateComment(comment));

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
                            New Post
                        </Typography>
                        <TextField
                            id="post-author"
                            label="Author"
                            className={classes.textField}
                            value={this.state.author}
                            onChange={this.handleChangeText('author')}
                            margin="normal"
                            required={true}/>
                        <TextField
                            id="post-content"
                            label="Content"
                            required={true}
                            multiline
                            rows="6"
                            value={this.state.multiline}
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

export default connect()(withStyles(styles)(NewComment))
