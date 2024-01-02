import React, {FC, useEffect, useState} from 'react';
import moment, {parseZone} from "moment";
import {ITodo} from "../../models/ITodo";
import {todoAPI} from "../../services/TodoService";
import MyInput from "../UI/input/MyInput";
import MyTextarea from "../UI/textarea/MyTextarea";
import classes from './TodoForm.module.css'
import MyButton from "../UI/button/MyButton";
import MySelect from "../UI/select/MySelect";
interface TodoFormProps {
    todo?: ITodo;
    modal?: boolean;
}

const TodoForm: FC<TodoFormProps> = ({todo, modal}) => {

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
        return [...matches].map((match) => moment(match[0]).format("M/D/YYYY"));
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
        modal = false;
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
            <MyInput
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <MyTextarea
                placeholder="Content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={(e) => setDates(dates)}/>
            <div className={classes.bottomWrapper}>
                <MySelect name="category" id="" onChange={handleCategoryChange} defaultValue={todo?.category}>
                    <optgroup label="Category">
                        <option value="Task"> Task</option>
                        <option value="Random thought"> Random thought</option>
                        <option value="Idea"> Idea</option>
                    </optgroup>
                </MySelect>
                <MyButton className={"submit"} type="submit">Save</MyButton>
            </div>
        </form>
    );
};

export default TodoForm;