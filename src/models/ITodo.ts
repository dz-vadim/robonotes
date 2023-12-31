import {WithId} from "mongodb";

export interface ITodo extends WithId<Document>{
    id: number;
    name: string;
    createdDate: string;
    category: string;
    content: string;
    dates: string;
    status: string;
}

export enum iconTypes {
    Task = "Task",
    Random_thought = "Random thought",
    Idea = "Idea",
}