import {setCategories} from './categories'
import {getInitialData} from "../utils/ApiUtils";
import {setPosts} from "./posts";

export function handleInitialData() {
    return (dispatch) => {
        getInitialData().then(({categories, posts}) => {
            dispatch(setCategories(categories));
            dispatch(setPosts(posts))
        })
    }
}