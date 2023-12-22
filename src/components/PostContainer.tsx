import React, {FC, useCallback, useEffect, useState} from 'react';
import {initialPosts, postAPI} from "../servises/PostServise";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";
import MyModal from "./MyModal/MyModal";

const PostContainer: FC = () => {
    const [limit, setLimit] = useState(100)
    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(limit)
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [updatePost, {}] = postAPI.useUpdatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()
    const [modal, setModal] = useState(false);

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }
    const handleRemove = (post: IPost) => {
        deletePost(post);
    }
    const handleCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('click');
        setModal(true);
        const title = prompt() || "New Post"
        await createPost({title, body: title} as IPost)
    };

    return (
        <div>

            <button onClick = {() => setModal(true)} style = {{marginTop: "30px"}}>
                modal
            </button>
            <MyModal visible={modal} setVisible={setModal}>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Content"/>
                <select name="" id="">
                    <option value="">
                        Task
                    </option>
                    <option value="">
                        Random thought
                    </option>
                    <option value="">
                        idea
                    </option>
                </select>
            </MyModal>


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