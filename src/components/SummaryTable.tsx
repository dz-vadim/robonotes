import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faLightbulb, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { iconTypes, ITodo } from "../models/ITodo";

interface SummaryTableProps {
    todos: ITodo[];
}

const SummaryTable: FC<SummaryTableProps> = ({ todos }) => {
    const [summaryData, setSummaryData] = useState({
        activeTasks: 0,
        completedTasks: 0,
        activeRandomThought: 0,
        completedRandomThought: 0,
        activeIdea: 0,
        completedIdea: 0,
    });

    useEffect(() => {
        const resetSummary = () => {
            const newSummaryData = {
                ...summaryData, 
                activeTasks: 0,
                completedTasks: 0,
                activeRandomThought: 0,
                completedRandomThought: 0,
                activeIdea: 0,
                completedIdea: 0,
            };

            todos.forEach((todo) => {
                if (todo.status === "active") {
                    switch (todo.category) {
                        case iconTypes.Task:
                            newSummaryData.activeTasks++;
                            break;
                        case iconTypes.Random_thought:
                            newSummaryData.activeRandomThought++;
                            break;
                        case iconTypes.Idea:
                            newSummaryData.activeIdea++;
                            break;
                    }
                } else {
                    switch (todo.category) {
                        case iconTypes.Task:
                            newSummaryData.completedTasks++;
                            break;
                        case iconTypes.Random_thought:
                            newSummaryData.completedRandomThought++;
                            break;
                        case iconTypes.Idea:
                            newSummaryData.completedIdea++;
                            break;
                    }
                }
            });
            setSummaryData(newSummaryData);
        };

        resetSummary(); 
    }, [todos]);

    return (
        <>
            <h1 className="containerTitle">SUMMARY TABLE</h1>
            <table>
                <thead className="todo__headers">
                <tr>
                    <th className="TodoIcon"></th>
                    <th className="NoteCategory">Note Category</th>
                    <th className="Active">Active</th>
                    <th className="Completed">Completed</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="TodoIcon"><FontAwesomeIcon icon={faThumbtack} /></td>
                    <td className="NoteCategory">Task</td>
                    <td className="Active">{summaryData.activeTasks}</td>
                    <td className="Completed">{summaryData.completedTasks}</td>
                </tr>
                <tr>
                    <td className="TodoIcon"><FontAwesomeIcon icon={faBrain} /></td>
                    <td className="NoteCategory">Random thought</td>
                    <td className="Active">{summaryData.activeRandomThought}</td>
                    <td className="Completed">{summaryData.completedRandomThought}</td>
                </tr>
                <tr>
                    <td className="TodoIcon"><FontAwesomeIcon icon={faLightbulb} /></td>
                    <td className="NoteCategory">Idea</td>
                    <td className="Active">{summaryData.activeIdea}</td>
                    <td className="Completed">{summaryData.completedIdea}</td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default SummaryTable;
