export enum Status { 
    Inactive = "In review ",
    Active = "In progress", 
    Completed = "completed", 
    Cancelled = "cancelled", 
};

export interface Task {
    id: number,

    title: string,
    descriptionText: string,
    location: string,
    
    completionDate: Date,
    createdDate: Date,
    
    status: Status; 
}