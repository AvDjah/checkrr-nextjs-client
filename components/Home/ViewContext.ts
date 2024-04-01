import {createContext, Dispatch, SetStateAction} from "react";


type tNotificationContext = {
    value: number
    triggerNotification: Dispatch<SetStateAction<number>> | undefined
}
export const NotificationContext = createContext<tNotificationContext>({
    triggerNotification: undefined,
    value: 0
})