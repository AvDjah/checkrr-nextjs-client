export type EventList = {
    id: number
    name: string
    description: string
    events: UserEvent[]
    userId: number
    priorityId: number
    subscriptions: any
}

export type UserEvent = {
    id: number; // int64 maps to number in TypeScript
    eventName: string;
    startTime: string; // time.Time can be represented by Date
    waitTime: string;
    status: string;
    eventType: number;
    eventListId: number;
    value: number; // float64 can be represented by number
    description: string;
    categoryID: number;
    priorityID: number;
    userID: number;
    notification: any; // Assuming Notification is defined elsewhere
}

export type UserNotification = {

}

