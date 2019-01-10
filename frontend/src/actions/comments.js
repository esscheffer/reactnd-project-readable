import {hideLoading, showLoading} from "react-redux-loading";
import {createCommentServer, getPostComments, saveDownVoteComment, saveUpVoteComment} from "../utils/ApiUtils";

export const SET_COMMENTS = 'SET_COMMENTS';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

function setComments(comments) {
    return {
        type: SET_COMMENTS,
        comments
    }
}

function upVoteComment(comment) {
    return {
        type: UPVOTE_COMMENT,
        commentId: comment.id
    }
}

function downVoteComment(comment) {
    return {
        type: DOWNVOTE_COMMENT,
        commentId: comment.id
    }
}

function removeComment(comment) {
    return {
        type: REMOVE_COMMENT,
        commentId: comment.id
    }
}

function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function handleGetComments(postId) {
    return (dispatch) => {
        dispatch(showLoading());
        getPostComments(postId).then(comments => {
            dispatch(setComments(comments));
            dispatch(hideLoading());
        })
    }
}

export function handleUpVoteComment(comment) {
    return (dispatch) => {
        dispatch(upVoteComment(comment));

        return saveUpVoteComment(comment.id)
            .catch((e) => {
                console.warn('Error in handleUpVoteComment: ', e);
                dispatch(downVoteComment(comment));
                alert('The was an error up voting the comment. Try again.')
            })
    }
}

export function handleDownVoteComment(comment) {
    return (dispatch) => {
        dispatch(downVoteComment(comment));

        return saveDownVoteComment(comment.id)
            .catch((e) => {
                console.warn('Error in handleDownVoteComment: ', e);
                dispatch(upVoteComment(comment));
                alert('The was an error up voting the comment. Try again.')
            })
    }
}

export function handleCreateComment(comment) {
    return (dispatch) => {
        dispatch(addComment(comment));

        return createCommentServer(comment)
            .catch((e) => {
                console.warn('Error in handleCreatePost: ', e);
                dispatch(removeComment(comment));
                alert('The was an error creating the post. Try again.')
            })
    }
}