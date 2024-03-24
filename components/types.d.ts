export type EventList = {
    id: bigint
    name: string
    description: string
    events: UserEvent
    userId: bigint
    priorityId: bigint
    subscriptions: any
}

export type UserEvent = {
    id: bigint; // int64 maps to bigint in TypeScript
    eventName: string;
    startTime: Date; // time.Time can be represented by Date
    waitTime: Date;
    status: string;
    eventType: number;
    eventListId: bigint;
    value: number; // float64 can be represented by number
    description: string;
    categoryID: bigint;
    priorityID: bigint;
    userID: bigint;
    notification: any; // Assuming Notification is defined elsewhere
}

export type UserNotification = {

}
