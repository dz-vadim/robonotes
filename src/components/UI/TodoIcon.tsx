import React, {FC} from 'react';
import {iconTypes, ITodo} from "../../models/ITodo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain, faLightbulb, faNoteSticky, faThumbtack} from "@fortawesome/free-solid-svg-icons";
interface TodoIconProps {
    todo: ITodo;
}

const TodoIcon:  FC<TodoIconProps> = ({todo})  => {
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
};

export default TodoIcon;