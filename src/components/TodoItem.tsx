import React, {FC} from 'react';
import {ITodo} from "../models/ITodo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import MyModal from "./MyModal/MyModal";
import TodoForm from "./TodoForm";

interface TodoItemProps {
    todo: ITodo;
    update: (todo: ITodo) => void;
    remove: (todo: ITodo) => void;
}

const TodoItem: FC<TodoItemProps> = ({todo, update, remove}) => {
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        remove(todo)
    };
    const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
        // update({...todo, category, name, content})
    };
    const handleChangeStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
        const status = (todo.status === "complete") ? "active" : "complete"
        update({...todo, status})
    };
    return (
        <div className="todo">
            <div>
                <div><FontAwesomeIcon icon={faPen}/></div>
                <div>{todo.name}</div>
                <div>{todo.createdDate}</div>
                <div>{todo.category}</div>
                <div>{todo.content}</div>
                <div>{todo.dates}</div>
            </div>
            <div>
                {todo.status === "active" &&
                    <button onClick={handleUpdate}>
                        <FontAwesomeIcon icon={faPen}/>
                    </button>
                }
                <button onClick={handleChangeStatus}>
                    <FontAwesomeIcon icon={faArchive}/>
                </button>
                <button onClick={handleRemove}>
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;