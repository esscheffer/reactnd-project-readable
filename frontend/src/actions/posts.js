import {saveDownVotePost, saveUpVotePost} from "../utils/ApiUtils";

export const SET_POSTS = 'SET_POSTS';
export const FETCHING_POSTS = 'FETCHING_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

export function setPosts(posts) {
    return {
        type: SET_POSTS,
        posts
    }
}

export function fetchingPosts() {
    return {
        type: FETCHING_POSTS
    }
}

function upVotePost(post) {
    return {
        type: UPVOTE_POST,
        postId: post.id
    }
}

function downVotePost(post) {
    return {
        type: DOWNVOTE_POST,
        postId: post.id
    }
}

export function handleUpVotePost(post) {
    return (dispatch) => {
        dispatch(upVotePost(post));

        return saveUpVotePost(post.id)
            .catch((e) => {
                console.warn('Error in handleUpVotePost: ', e);
                dispatch(downVotePost(post));
                alert('The was an error up voting the post. Try again.')
            })
    }
}

export function handleDownVotePost(post) {
    return (dispatch) => {
        dispatch(downVotePost(post));

        return saveDownVotePost(post.id)
            .catch((e) => {
                console.warn('Error in handleDownVotePost: ', e);
                dispatch(upVotePost(post));
                alert('The was an error up voting the post. Try again.')
            })
    }
}