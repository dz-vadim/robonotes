import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {ITodo} from "../models/ITodo";
const demoUrl = 'https://my-json-server.typicode.com/dz-vadim/db-placeholder/'
const jsonServerUrl = 'http://localhost:5000/'
export const todoAPI = createApi({
    tagTypes: ['Todo'],
    reducerPath: 'todoAPI',
    baseQuery: fetchBaseQuery({ baseUrl: demoUrl }),
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




