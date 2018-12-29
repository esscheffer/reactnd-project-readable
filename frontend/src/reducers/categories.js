import {SET_CATEGORIES} from "../actions/categories";

export default function categories(state = {}, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                ...action.categories
            };
        default:
            return state;
    }
}