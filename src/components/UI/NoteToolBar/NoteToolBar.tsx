import React, {FC, useCallback, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArchive, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ITodo} from "../../../models/ITodo";
import TodoForm from "../../TodoForm";
import MyModal from "../../MyModal/MyModal";
interface NoteToolBarProps {
    todo: ITodo;
    update: (todo: ITodo) => void;
    changeStatus: (todo: ITodo) => void;
    remove: (todo: ITodo) => void;
}
const NoteToolBar: FC<NoteToolBarProps> = ({todo, update, changeStatus, remove}) => {
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

    return (
        <div>
            <MyModal visible={modal} setVisible={setModal}>
                <TodoForm todo={todo}/>
            </MyModal>
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
    );
};

export default NoteToolBar;