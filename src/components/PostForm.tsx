import React, { FC, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import {IPost} from "../models/IPost";
import {postAPI} from "../servises/PostServise";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostFormProps {
    create: (post: Post) => void;
}

const PostForm: FC<PostFormProps> = ({ create }) => {
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [modal, setModal] = useState(false);

    const handleCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('click');
        setModal(true);
        // const title = prompt() || "New Post"
        const newPost : { title: string; body: string } = {
                title : 'qwerty',
                body: "afe"
        }
        await createPost(newPost as IPost)
    };
    // const addNewPost = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const newPost: Post = {
    //         ...post,
    //         id: Date.now(),
    //     };
    //     create(newPost);
    //     // setPost({ title: "", body: "" });
    // };

    return (
        <form>
            <MyInput
                type="text"
                placeholder="Post name"
                // value={post.title}
                // onChange={(e) => setPost({...post, title: e.target.value})}
            />
            <MyInput
                type="text"
                placeholder="Description"
                // value={post.body}
                // onChange={(e) => setPost({...post, body: e.target.value})}
            />
            <MyButton onClick={handleCreate}>Create post</MyButton>
        </form>
    );
};

export default PostForm;
