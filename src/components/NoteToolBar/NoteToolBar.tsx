import React, {FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ITodo} from "../../models/ITodo";
import TodoForm from "../TodoForm/TodoForm";
import MyModal from "../MyModal/MyModal";
import {todoAPI} from "../../services/TodoService";
import classes from "./NoteToolBar.module.css"
interface NoteToolBarProps {
    todo: ITodo;
}
const NoteToolBar: FC<NoteToolBarProps> = ({todo}) => {
    const [modal, setModal] = useState(false);
    const [updateTodo, {}] = todoAPI.useUpdateTodoMutation()
    const [deleteTodo, {}] = todoAPI.useDeleteTodoMutation()
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        deleteTodo(todo)
    };
    const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("setModal(true)");
        setModal(true)
    };

    const handleChangeStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
        const status = (todo.status === "complete") ? "active" : "complete"
        updateTodo({...todo, status})
    };

    return (
        <div className={classes.nav}>
            <MyModal visible={modal} setVisible={setModal}>
                <TodoForm todo={todo}/>
            </MyModal>
            {todo.status === "active" &&
                <button className={classes.btn} onClick={handleUpdate}>
                    <FontAwesomeIcon icon={faPen}/>
                </button>
            }
            <button className={classes.btn} onClick={handleChangeStatus}>
                <FontAwesomeIcon icon={faArchive}/>
            </button>
            <button className={classes.btn} onClick={handleRemove}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </div>
    );
};

export default NoteToolBar;