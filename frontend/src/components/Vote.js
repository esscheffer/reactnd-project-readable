import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const Vote = props => {
    return (
        <div>
            <IconButton onClick={props.handleUpVoteClick}>
                <ThumbUpIcon/>
            </IconButton>

            {props.voteScore}

            <IconButton onClick={props.handleDownVoteClick}>
                <ThumbDownIcon/>
            </IconButton>
        </div>
    );
};

export default Vote;
