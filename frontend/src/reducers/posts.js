import {FETCHING_POSTS, SET_POSTS} from "../actions/posts";

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
        default:
            return state;
    }
}