import {number, object, string} from "zod";


export const eventSchema = object({
    eventName: string().regex(/^[a-zA-Z0-9\s-]+$/).min(3).max(20),
    startTime : string(),
    waitTime : number().int().max(60).min(0),
    timeUnit : string(),
    message : string().min(2).max(100),
    description : string(),
    priorityID : string(),
    eventListId : number().int()
});