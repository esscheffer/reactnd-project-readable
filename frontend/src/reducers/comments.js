import {ADD_COMMENT, DOWNVOTE_COMMENT, REMOVE_COMMENT, SET_COMMENTS, UPVOTE_COMMENT} from "../actions/comments";

export default function comments(state = {}, action) {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            };
        case UPVOTE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => comment.id === action.commentId ? {
                    ...comment, voteScore: comment.voteScore + 1
                } : comment)
            };
        case DOWNVOTE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => comment.id === action.commentId ? {
                    ...comment, voteScore: comment.voteScore - 1
                } : comment)
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.commentId)
            };
        case ADD_COMMENT:
            let newArray = state.comments.slice();
            newArray.push(action.comment);
            return {
                ...state,
                comments: newArray
            };
        default:
            return state;
    }
}