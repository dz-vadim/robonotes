import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {ITodo} from "../models/ITodo";
const settings = {
    "url": "https://robonotes-5f3c.restdb.io/rest/todos",
}
const headers = {
    "content-type": "application/json",
    "x-apikey": "658ee86457af42c3d6bbc9ff",
    "cache-control": "no-cache"
}
export const todoAPI = createApi({

    tagTypes: ['Todo'],
    reducerPath: 'todoAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        fetchAllTodos: builder.query<ITodo[], number>({
            query: () => ({
                url: '/todos'
            }),
            providesTags: result => ['Todo']
        }),

        createTodo: builder.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: builder.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todo']
        }),
        deleteTodo: builder.mutation<ITodo, ITodo>({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo']
        }),
    }),
});
