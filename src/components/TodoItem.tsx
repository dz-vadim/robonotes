import React, {FC, useState} from 'react';
import {ITodo} from "../models/ITodo";
import MyModal from "./MyModal/MyModal";
import TodoForm from "./TodoForm/TodoForm";
import TodoIcon from "./UI/TodoIcon";
import NoteToolBar from "./NoteToolBar/NoteToolBar";

interface TodoItemProps {
    todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({todo}) => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <tr>
                <td
                    className="TodoIcon">
                    < TodoIcon
                        todo={todo}
                    />
                </td>
                <td className="Name">{todo.name}</td>
                <td className="Created">{todo.createdDate}</td>
                <td className="Category">{todo.category}</td>
                <td className="Content">{todo.content}</td>
                <td className="Dates">{todo.dates}</td>
                <td className="Tools"><NoteToolBar todo={todo}/></td>

            </tr>
                <MyModal visible={modal} setVisible={setModal}>
                    <TodoForm todo={todo}/>
                </MyModal>
        </>
    );
};

export default TodoItem;
