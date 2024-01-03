import React, {FC, useState} from 'react';
import {todoAPI} from "../services/TodoService";
import TodoItem from "./TodoItem";
import MyModal from "./MyModal/MyModal";
import TodoForm from "./TodoForm/TodoForm";
import Loader from "./Loader/Loader";
import MyButton from "./UI/button/MyButton";
import MySelect from "./UI/select/MySelect";
import SummaryTable from "./SummaryTable";

const TodoContainer: FC = () => {
    const countOfParameters = 0;
    const {data: todos, error, isLoading} = todoAPI.useFetchAllTodosQuery(countOfParameters)

    const [modal, setModal] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState("active");
    const [title, setTitle] = useState("");
    const handleSelectStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
        setTitle(event.target.value)
    };
    return (
        <div>
            <div className="menu">
                <MyButton onClick={() => setModal(true)}>
                    Add Note
                </MyButton>
                <MySelect name="" id="" onChange={handleSelectStatus}>
                    <optgroup label="Tasks">
                        <option value="active">Active</option>
                        <option value="complete">Complete</option>
                    </optgroup>
                </MySelect>
            </div>
            <MyModal visible={modal} setVisible={setModal}>
                <TodoForm modal={modal}/>
            </MyModal>
            <div className="todo__list">
                {isLoading && <Loader/>}
                {error &&
                    <div>
                        <h1 className={"error"}>{JSON.stringify(error, null, 2)}</h1>
                        <h2 className={"error"}>
                            If you have FETCH_ERROR, try to start json-server:
                        </h2>
                        <p>
                            json-server --watch server/db.json --port 5000
                        </p>
                        <pre>
                            json-server was started to 5000 port. Open http://localhost:5000/todos to view todos
                            resources it in the browser
                        </pre>
                    </div>

                }
                {todos && <h1 className={"containerTitle"}>{(title + " tasks").toUpperCase()}</h1>}
                {todos &&
                    <table>
                        <thead className="todo__headers">
                        <tr>
                            <th className="TodoIcon"></th>
                            <th className="Name">Name</th>
                            <th className="Created">Created</th>
                            <th className="Category">Category</th>
                            <th className="Content">Content</th>
                            <th className="Dates">Dates</th>
                            <th className="Tools">Tools</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map(todo => {
                            if (todo.status === selectedStatus) {
                                return (<TodoItem
                                    key={todo.id}
                                    todo={todo}
                                />)
                            }
                        })}
                        </tbody>
                    </table>
                }
            </div>
            {todos && <SummaryTable todos={todos}/>}
        </div>
    );
};

export default TodoContainer;