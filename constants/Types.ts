export enum Status { 
    Active = "active", 
    Completed = "completed", 
    Cancelled = "cancelled", 
    Overdue = "overdue" 
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