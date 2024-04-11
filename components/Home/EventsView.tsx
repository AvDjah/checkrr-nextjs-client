"use client"

import EventsBox from "@/components/Home/EventsBox";
import SingleEventBox, {ShowToast, ToastType} from "@/components/Home/SingleEventBox";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {EventList} from "@/app/types";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OngoingEvents from "@/components/Home/OngoingEvents";


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


    const [selectedEvent, setSelectedEvent] = useState<EventList | null>(null)
    const [toggle, setToggle] = useState(false)

    return (
        <div className={"flex flex-row justify-start gap-20 items-center"}>
            <EventsViewContext.Provider value={{
                selectedEventList: selectedEvent,
                changeSelectedEvent: setSelectedEvent
            }}>
                <EventsBox toggle={toggle}/>
                <SingleEventBox toggle={toggle} setToggle={setToggle}/>
                <OngoingEvents />
                {/*<button onClick={() => {*/}
                {/*    console.log(socket)*/}
                {/*    if(socket !== undefined){*/}
                {/*        socket.send("Heelo from checkrr")*/}
                {/*    }*/}
                {/*}} >Send Msg WS</button>*/}
            </EventsViewContext.Provider>
        </div>
    )
}