import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {IPost} from "../models/IPost";

export const initialPosts = [
    { id: 1, title: 'Initial Post 1', body: 'This is the initial content of post 1' },
    { id: 2, title: 'Initial Post 2', body: 'This is the initial content of post 2' },
    { id: 3, title: 'Initial Post 2', body: 'This is the initial content of post 2' },
    { id: 4, title: 'Initial Post 2', body: 'This is the initial content of post 2' },
    { id: 5, title: 'Initial Post 2', body: 'This is the initial content of post 2' },
    { id: 6, title: 'Initial Post 2', body: 'This is the initial content of post 2' },
    { id: 7, title: 'Initial Post 2', body: 'This is the initial content of post 2' },
];

export const postAPI = createApi({

    tagTypes: ['Post'],
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPost[], number>({
            query: (limit: number = 7) => ({
                url: '/posts',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['Post']
        }),

        createPost: builder.mutation<IPost, IPost>({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        })
    }),
});
