import React, {FC, useState} from 'react';
import {ITodo} from "../models/ITodo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArchive,
    faBrain,
    faLightbulb,
    faPen,
    faTrash,
    faThumbtack,
    faNoteSticky
} from "@fortawesome/free-solid-svg-icons";
import MyModal from "./MyModal/MyModal";
import TodoForm from "./TodoForm";

interface TodoItemProps {
    todo: ITodo;
    update: (todo: ITodo) => void;
    changeStatus: (todo: ITodo) => void;
    remove: (todo: ITodo) => void;
}

const TodoItem: FC<TodoItemProps> = ({todo, update, changeStatus, remove}) => {
    const [modal, setModal] = useState(false);
    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        remove(todo)
    };
    const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("setModal(true)");
        setModal(true)
        // update({...todo, category, name, content})
    };

    const handleChangeStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
        const status = (todo.status === "complete") ? "active" : "complete"
        update({...todo, status})
    };

    enum iconTypes {
        Task = "Task",
        Random_thought = "Random thought",
        Idea = "Idea",
    }


    const todoIcon = (todo: ITodo) => {
        switch (todo.category) {
            case iconTypes.Task:
                return  <FontAwesomeIcon icon={faThumbtack}/>
            case iconTypes.Random_thought:
                return  <FontAwesomeIcon icon={faBrain}/>
            case iconTypes.Idea:
                return  <FontAwesomeIcon icon={faLightbulb}/>
            default:
                return <FontAwesomeIcon icon={faNoteSticky}/>
        }
    }
    return (
        <div className="todo">
            <div>
                <MyModal visible={modal} setVisible={setModal}>
                    <TodoForm todo={todo}/>
                </MyModal>
                <div>
                    {todoIcon(todo)}
                </div>
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