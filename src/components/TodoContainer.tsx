import React, {FC, useCallback, useEffect, useState} from 'react';
import {todoAPI} from "../servises/TodoServise";
import TodoItem from "./TodoItem";
import {ITodo} from "../models/ITodo";
import MyModal from "./MyModal/MyModal";
import TodoForm from "./TodoForm";

const TodoContainer: FC = () => {
    const countOfParameters = 0;
    const {data: todos, error, isLoading} = todoAPI.useFetchAllTodosQuery(countOfParameters)
    const [updateTodo, {}] = todoAPI.useUpdateTodoMutation()
    const [deleteTodo, {}] = todoAPI.useDeleteTodoMutation()
    const [modal, setModal] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState("active");
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };
    const handleUpdate = (todo: ITodo) => {
        updateTodo(todo);
    }
    const handleRemove = (todo: ITodo) => {
        deleteTodo(todo);
    }

    return (
        <div>

            <button onClick={() => setModal(true)} style={{marginTop: "30px"}}>
                New Todo
            </button>
            <MyModal visible={modal} setVisible={setModal}>
                <TodoForm/>
            </MyModal>
            <select name="" id="" onChange={handleStatusChange}>
                <optgroup label="Tasks">
                    <option value="active">Active</option>
                    <option value="complete">Complete</option>
                </optgroup>
            </select>
            <h1>Active tasks</h1>
            <div className="todo__list">
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>{JSON.stringify(error, null, 2)}</h1>}
                {todos && todos.map(todo => {
                    if (todo.status === selectedStatus) {
                        return (<TodoItem
                            key={todo.id}
                                todo={todo}
                                update={handleUpdate}
                                remove={handleRemove}
                            />)
                        }

                    }
                )}
            </div>
        </div>
    );
};

export default TodoContainer;