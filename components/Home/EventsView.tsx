"use client"

import EventsBox, {CurrentView} from "@/components/Home/EventsBox";
import SingleEventBox from "@/components/Home/SingleEventBox";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {EventList, UserEvent} from "@/app/types";


type tEventsViewContext = {
    selectedEventList: EventList | null,
    changeSelectedEvent: Dispatch<SetStateAction<EventList | null>> | null
}

export const EventsViewContext = createContext<tEventsViewContext>({
    selectedEventList: null,
    changeSelectedEvent: null
})

export default function EventsView() {

    const [selectedEvent, setSelectedEvent] = useState<EventList | null>(null)


    return (
        <div className={"flex flex-row justify-start gap-20 items-center"}>
            <EventsViewContext.Provider value={{
                selectedEventList: selectedEvent,
                changeSelectedEvent: setSelectedEvent
            }}>
                <EventsBox/>
                <SingleEventBox/>
            </EventsViewContext.Provider>
        </div>
    )
}