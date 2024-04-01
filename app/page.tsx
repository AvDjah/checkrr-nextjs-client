"use client"
import Bell from "@/components/Home/NotificationBell";
import EventsView from "@/components/Home/EventsView";
import {ToastContainer} from "react-toastify";
import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {ShowToast, ToastType} from "@/components/Home/SingleEventBox";
import {NotificationContext} from "@/components/Home/ViewContext";


let socket
export default function Home() {

    const notificationContext = useContext(NotificationContext)
    const [refreshNotification, triggerRefreshNotification] = useState(0)


    useEffect(() => {
        socketInitializer().then().catch(e => console.log("ws error:", e))
    }, [])

    const socketInitializer = async () => {
        const ws = new WebSocket("ws://localhost:8081/ws/2")
        ws.onopen = (msg) => {
            socket = ws
            console.log("open")
            ws.send("heelo from checkrr")
        }
        ws.onmessage = (msg) => {
            console.log("Received : ", msg)
            ShowToast(msg.data.toString(), ToastType.Success)
            triggerRefreshNotification(refreshNotification + 1)
        }
        ws.onclose = (msg) => {
            console.log("WS Closed")
        }
        ws.onerror = (err) => {
            console.log("ws error: ", err)
        }
    }

    return (
        <div>
            <NotificationContext.Provider value={{
                value: refreshNotification,
                triggerNotification: triggerRefreshNotification
            }}>
                <ToastContainer/>
                <Bell/>
                <div className={"flex flex-col mt-2"}>
                    <div className={"mt-10 transition-all ease-in duration-700"}>
                        <input
                            className={"text-3xl rounded-xl border-1 border-black focus:border-2 p-4 font-header outline-none"}/>
                    </div>
                    <div className={"mt-4"}>
                        <EventsView/>
                    </div>
                </div>
            </NotificationContext.Provider>
        </div>
    )
}