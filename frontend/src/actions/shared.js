import {setCategories} from './categories'
import {getInitialData} from "../utils/ApiUtils";
import {fetchingPosts, setPosts} from "./posts";
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(fetchingPosts());
        dispatch(showLoading());
        getInitialData().then(({categories, posts}) => {
            dispatch(setCategories(categories));
            dispatch(setPosts(posts));
            dispatch(hideLoading());
        })
    }
}