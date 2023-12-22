import React, {FC, useCallback} from 'react';
import {IPost} from "../models/IPost";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import NoteToolBar from "./UI/NoteToolBar/NoteToolBar";

interface PostItemProps {
    post: IPost;
    update: (post: IPost) => void;
    remove: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({post, update, remove}) => {
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        remove(post)
    };
    const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
        const title = prompt() || "Updated"
        update({...post, title})
    };
    const handleArchive = (event: React.MouseEvent<HTMLButtonElement>) => {
        // update({...post, title})
    };
    return (
        <div className="post">
            {post.id}. {post.title}
            <button onClick={handleUpdate}>
                <FontAwesomeIcon icon={faPen}/>
            </button>
            <button onClick={handleArchive}>
                <FontAwesomeIcon icon={faArchive} />
            </button>
            <button onClick={handleRemove}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    );
};

export default PostItem;