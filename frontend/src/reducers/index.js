import {combineReducers} from "redux";
import categories from "./categories";
import posts from "./posts";
import {loadingBarReducer} from 'react-redux-loading'
import comments from "./comments";

export default combineReducers({
    categories, posts, comments, loadingBar: loadingBarReducer,
})