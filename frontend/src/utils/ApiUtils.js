const port = 3001;
export const baseurl = `http://localhost:${port}`;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

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