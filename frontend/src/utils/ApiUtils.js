const port = 3001;
export const baseurl = `http://localhost:${port}`;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
};

function getCategories() {
    return fetch(`${baseurl}/categories`, {headers}).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }).then((response) => response.json())
}

function getPosts() {
    return fetch(`${baseurl}/posts`, {headers}).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }).then((response) => response.json())
}

export function getInitialData() {
    return Promise.all([
        getCategories(),
        getPosts(),
    ]).then(([categories, posts]) => ({
        categories,
        posts,
    }))
}

function saveVotePost(postId, vote) {
    return fetch(`${baseurl}/posts/${postId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({option: vote}), // body data type must match "Content-Type" header
    }).then((response) => response.json())
}

export function saveUpVotePost(postId) {
    return saveVotePost(postId, "upVote")
}

export function saveDownVotePost(postId) {
    return saveVotePost(postId, "downVote")
}

export function deletePostServer(postId) {
    return fetch(`${baseurl}/posts/${postId}`, {
        method: "DELETE",
        headers,
    }).then((response) => response.json())
}

export function createPostServer(post) {
    return fetch(`${baseurl}/posts/`, {
        method: "POST",
        headers,
        body: JSON.stringify(post),
    }).then((response) => response.json())
}

export function editPostServer(post) {
    return fetch(`${baseurl}/posts/${post.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(post),
    }).then((response) => response.json())
}

export function getPostComments(postId) {
    return fetch(`${baseurl}/posts/${postId}/comments`, {headers}).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response
    }).then((response) => response.json())
}

function saveVoteComment(postId, vote) {
    return fetch(`${baseurl}/comments/${postId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({option: vote}),
    }).then((response) => response.json())
}

export function saveUpVoteComment(commentId) {
    return saveVoteComment(commentId, "upVote")
}

export function saveDownVoteComment(commentId) {
    return saveVoteComment(commentId, "downVote")
}

export function createCommentServer(comment) {
    return fetch(`${baseurl}/comments/`, {
        method: "POST",
        headers,
        body: JSON.stringify(comment),
    }).then((response) => response.json())
}