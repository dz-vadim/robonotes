export interface ITodo{
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