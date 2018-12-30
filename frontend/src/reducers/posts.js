import {DOWNVOTE_POST, FETCHING_POSTS, SET_POSTS, UPVOTE_POST} from "../actions/posts";

const INITIAL_STATE = {
    postsList: {posts: [], loading: false}
};

export default function posts(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                postsList: {posts: action.posts, loading: false}
            };
        case FETCHING_POSTS:
            return {
                ...state,
                postsList: {posts: [], loading: true}
            };
        case UPVOTE_POST:
            return {
                ...state,
                postsList: {
                    ...state.postsList,
                    posts: state.postsList.posts.map(
                        (post) => post.id === action.postId ? {
                            ...post, voteScore: post.voteScore + 1
                        } : post
                    )
                }
            };
        case DOWNVOTE_POST :
            return {
                ...state,
                postsList: {
                    ...state.postsList,
                    posts: state.postsList.posts.map(
                        (post) => post.id === action.postId ? {
                            ...post, voteScore: post.voteScore - 1
                        } : post
                    )
                }
            };
        default:
            return state;
    }
}