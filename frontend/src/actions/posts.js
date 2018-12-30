export const SET_POSTS = 'SET_POSTS';
export const FETCHING_POSTS = 'FETCHING_POSTS';

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