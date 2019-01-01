import React, {Component} from 'react';
import {connect} from "react-redux";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import uuidv4 from "uuid/v4";
import {handleCreatePost} from "../actions/posts";

const styles = theme => ({
    card: {
        width: '100%',
        ...theme.mixins.gutters(),
        padding: theme.spacing.unit * 2,
        marginTop: 20
    },
    container: {
        width: '60%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginBottom: 20,
        width: '100%',
    },
});

class NewPost extends Component {
    state = {
        author: '',
        content: '',
        category: '',
        title: ''
    };

    handleChangeText = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {author, title, content, category} = this.state;
        const {dispatch} = this.props;

        let post = {
            id: uuidv4(),
            timestamp: Date.now(),
            title: title,
            body: content,
            author: author,
            category: category,
        };

        dispatch(handleCreatePost(post));
    };

    render() {
        const {classes, categories} = this.props;

        return (
            <Grid container
                  direction="column"
                  justify="space-between"
                  spacing={16}
                  style={{width: '100%'}}
                  alignItems="center">
                <form className={classes.container} onSubmit={this.handleSubmit}>
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
                            value={this.state.multiline}
                            onChange={this.handleChangeText('content')}
                            className={classes.textField}
                            margin="normal"/>
                        {categories.categoriesList ?
                            <TextField
                                id="select-category"
                                select
                                label="Category"
                                className={classes.textField}
                                value={this.state.category}
                                onChange={this.handleChangeText("category")}
                                required
                                SelectProps={{
                                    native: true,
                                }}
                                margin="normal">
                                <option value=""  />
                                {categories.categoriesList.categories.map(category => (
                                    <option key={category.name} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </TextField>
                            : null
                        }
                        <Button variant="contained" color="primary" className={classes.button} type={'submit'}>
                            Save
                        </Button>
                    </Paper>
                </form>
            </Grid>
        );
    }
}


function mapStateToProps({categories}) {
    return {
        categories
    };
}

export default connect(mapStateToProps)(withStyles(styles)(NewPost))
