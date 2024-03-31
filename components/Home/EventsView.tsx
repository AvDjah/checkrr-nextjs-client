"use client"

import EventsBox from "@/components/Home/EventsBox";
import SingleEventBox, {ShowToast, ToastType} from "@/components/Home/SingleEventBox";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {EventList} from "@/app/types";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


type tEventsViewContext = {
    selectedEventList: EventList | null,
    changeSelectedEvent: Dispatch<SetStateAction<EventList | null>> | null
}

export const EventsViewContext = createContext<tEventsViewContext>({
    selectedEventList: null,
    changeSelectedEvent: null
})

let socket: WebSocket | undefined

export default function EventsView() {

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
            console.log("Received : ",msg)
            ShowToast(msg.data.toString(),ToastType.Success)
        }
        ws.onclose = (msg) => {
            console.log("WS Closed")
        }
        ws.onerror = (err) => {
            console.log("ws error: ",err)
        }
    }

    const [selectedEvent, setSelectedEvent] = useState<EventList | null>(null)
    const [toggle, setToggle] = useState(false)

    return (
        <div className={"flex flex-row justify-start gap-20 items-center"}>
            <ToastContainer />
            <EventsViewContext.Provider value={{
                selectedEventList: selectedEvent,
                changeSelectedEvent: setSelectedEvent
            }}>
                <EventsBox toggle={toggle}/>
                <SingleEventBox toggle={toggle} setToggle={setToggle}/>
                <button onClick={() => {
                    console.log(socket)
                    if(socket !== undefined){
                        socket.send("Heelo from checkrr")
                    }
                }} >Send Msg WS</button>
            </EventsViewContext.Provider>
        </div>
    )
}