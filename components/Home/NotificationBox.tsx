"use client"


import {ShowToast, ToastType} from "@/components/Home/SingleEventBox";
import {useContext, useEffect, useState} from "react";
import {NotificationContext} from "@/components/Home/ViewContext";

type NotificationType = {
    id: number
    status: string
    userID: number
    eventID: number
    notificationType: string
    message: string
}

export default function NotificationBox() {

    const [notifications, setNotifications] = useState<NotificationType[]>([])
    const notificationContext = useContext(NotificationContext)
    const fetchNotifications = () => {
        console.log("Triggered Notification Fetch")
        fetch("http://localhost:8080/notification/GetAll", {
            mode: "cors",
            credentials: "include",
            method: "GET"
        }).then(res => {
            if (res.status === 200) {
                console.log("Received Notifications Successfully")
                return res.json()
            } else if (res.status === 401) {
                ShowToast("Unauthorized, login please.", ToastType.Error)
                throw new Error("Unauthorized for notifications")
            }
        }).then((res: NotificationType[]) => {
            setNotifications(res)
        }).catch(e => {
            console.log("Err:", e)
        })
    }

    useEffect(() => {
        fetchNotifications()
    }, []);
    useEffect(() => {
        fetchNotifications()
    }, [notificationContext.value]);

    return <div className={"bg-white font-content ring-2 rounded-lg w-72 z-99"}>
        <div className={"p-2"} >
            Notification Box
        </div>
        <div className={"mt-2 p-2"}>
            {notifications.map((res, index) => {
                return <div key={index} className={"mt-4 hover:bg-amber-300 flex flex-row justify-start items-center gap-4 p-2 ring-2 rounded-md bg-amber-100 ring-offset-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/>
                    </svg>
                    {res.message}</div>
            })}
        </div>
    </div>
}