import React, {FC, useCallback, useState} from 'react';
import {postAPI} from "../servises/PostServise";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer: FC = () => {
    const [limit, setLimit] = useState(100)
    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(limit)
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [updatePost, {}] = postAPI.useUpdatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()
    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }
    const handleRemove = (post: IPost) => {
        deletePost(post);
    }
    const handleCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('click');
        const title = prompt() || "New Post"
        await createPost({title, body: title} as IPost)
    };

    return (
        <div>
            <div className="post__list">
                <button onClick={handleCreate}>New Post</button>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>{JSON.stringify(error, null, 2 )}</h1>}
                {posts && posts.map(post =>
                  <PostItem
                      key={post.id}
                      post={post}
                      update={handleUpdate}
                      remove={handleRemove}
                  />
                )}
            </div>
        </div>
    );
};

export default PostContainer;