import React, {FC, useEffect, useState} from 'react';
import moment, {parseZone} from "moment";
import {ITodo} from "../models/ITodo";
import {todoAPI} from "../services/TodoService";

interface TodoFormProps {
    todo?: ITodo;
}

const TodoForm: FC<TodoFormProps> = ({todo}) => {

    const [createTodo, {}] = todoAPI.useCreateTodoMutation();
    const [updateTodo, {}] = todoAPI.useUpdateTodoMutation();
    const [name, setName] = useState(todo?.name ?? ''); // Забезпечити початкове значення порожнім ланцюжком
    const [content, setContent] = useState(todo?.content ?? '');
    const [status, setStatus] = useState(todo?.status ?? 'active');
    const [category, setCategory] = useState(todo?.category ?? 'Task');
    const [createdDate, setCreatedDate] = useState(
        todo?.createdDate ?? moment().format('MMMM D, YYYY')
    );
    const [dates, setDates] = useState(todo?.dates ?? '');

    useEffect(() => {
        const parsedDates = extractDates(content);
        setDates(parsedDates.join(", "));
    }, [content]);
    const extractDates = (text: string): string[] => {
        const dateRegex = /\d{1,2}\/\d{1,2}\/\d{4}/g; // Регулярний вираз для дат у форматі М/Д/РРРР
        const matches = text.matchAll(dateRegex);
        return [...matches].map((match) => parseZone(match[0]).format("M/D/YYYY"));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        todo && await updateTodo({
            ...todo, ...{
                name,
                category,
                content,
                dates,
            }
        });
    };

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCreatedDate(moment().format('MMMM D, YYYY'))
        setStatus("active");
        setDates(parseZone().format('M/D/YYYY'))
        await createTodo({
            name,
            createdDate,
            category,
            content,
            dates,
            status,
        } as ITodo);
        setName('');
        setContent('');
    };

    return (

        <form onSubmit={todo ? handleUpdate : handleCreate}>
            <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={(e) => setDates(dates)}
            />
            <select name="category" id="" onChange={handleCategoryChange} defaultValue={todo?.category}>
                <optgroup label="Category">
                    <option value="Task"> Task</option>
                    <option value="Random thought"> Random thought</option>
                    <option value="Idea"> Idea</option>
                </optgroup>
            </select>
            <button type="submit">Save</button>
        </form>
    );
};

export default TodoForm;