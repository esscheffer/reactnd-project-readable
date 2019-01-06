import {DOWNVOTE_COMMENT, SET_COMMENTS, UPVOTE_COMMENT} from "../actions/comments";

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
        default:
            return state;
    }
}