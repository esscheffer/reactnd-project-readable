import {SET_POSTS} from "../actions/posts";

export default function posts(state = {}, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                ...action.posts
            };
        default:
            return state;
    }
}