import React, {FC, useState} from 'react';
import moment from "moment";
import {ITodo} from "../models/ITodo";
import {todoAPI} from "../servises/TodoServise";
interface TodoFormProps {
    todo?: ITodo;
}
const TodoForm: FC<TodoFormProps> = ({todo}) => {

    const [createTodo, {}] = todoAPI.useCreateTodoMutation()
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Task');
    const [createdDate, setCreatedDate] = useState(moment().format('MMMM D, YYYY'));

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };
    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCreatedDate(moment().format('MMMM D, YYYY'))
        const status = "active";

        await createTodo({
            name,
            createdDate,
            category,
            content,
            dates: "",
            status,
        } as ITodo);
        setName('');
        setContent('');
    };

    return (

        <form onSubmit={handleCreate}>
            <input
                type="text"
                placeholder="Name"
                required
                value={todo? todo.name: name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Content"
                required
                value={todo? todo.content: content}
                onChange={(e) => setContent(e.target.value)}
            />
            <select name="category" id="" onChange={handleCategoryChange}>
                    <option value="Task"> Task</option>
                    <option value="Random thought"> Random thought</option>
                    <option value="Idea"> Idea</option>
            </select>
            <button type="submit">Save</button>
        </form>
    );
};

export default TodoForm;