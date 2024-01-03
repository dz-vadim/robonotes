import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MongoClient } from "mongodb";
import {ITodo} from "../models/ITodo";

const uri = "mongodb+srv://user:UNmeZwGsyksGH9Gy@todos.80yourq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const connectToMongoDB = async () => {
    await client.connect();
};

export const todoAPI = createApi({
    reducerPath: "todoAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        fetchAllTodos: builder.query({
            queryFn: async () => {
                await connectToMongoDB();
                const todosCollection = client.db("robonotes").collection("todos");
                const todos = await todosCollection.find({}).toArray() as ITodo[];

                return {
                    data: todos,
                };
            },
        }),
        createTodo: builder.mutation({
            queryFn: async (todo) => {
                await connectToMongoDB();
                const todosCollection = client.db("robonotes").collection("todos");
                const result = await todosCollection.insertOne(todo);
                return {
                    data: result.insertedId, // Повертаємо об'єкт QueryReturnValue
                };
            },
        }),
        updateTodo: builder.mutation({
            queryFn: async (todo) => {
                await connectToMongoDB();
                const todosCollection = client.db("robonotes").collection("todos");
                const result = await todosCollection.updateOne({ _id: todo.id }, { $set: todo });
                return {
                    data: result.modifiedCount,
                }
            },
        }),
        deleteTodo: builder.mutation({
            queryFn: async (todoId) => {
                await connectToMongoDB();
                const todosCollection = client.db("robonotes").collection("todos");
                const result = await todosCollection.deleteOne({ _id: todoId });
                return {
                    data: result.deletedCount
                };
            },
        }),
    }),
});

