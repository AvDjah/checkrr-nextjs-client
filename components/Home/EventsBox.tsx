"use client"
import Button, {ButtonType} from "@/components/Home/Button";
import {EventList} from "@/app/types";
import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import AddEventListBox, {
    GetPriorityColor,
    GetPriorityEnum,
    GetPriorityEnumFromId
} from "@/components/Home/AddEventsList";
import {EventsViewContext} from "@/components/Home/EventsView";

export type EventBoxContextType = {
    current: CurrentView
    updateView: Dispatch<SetStateAction<CurrentView>> | undefined
}

export enum CurrentView {
    Default, Add
}

const defaultEventBoxContext: EventBoxContextType = {
    current: CurrentView.Default,
    updateView: undefined
}
export const EventBoxContext = createContext(defaultEventBoxContext)


const ListItem = ({priorityId, name, description, eventList}: {
    priorityId: number,
    name: string,
    description: string,
    eventList: EventList
}) => {

    const eventsViewContext = useContext(EventsViewContext)


    return (<div className={"flex flex-col transition-all ease-in-out"}>
            <div
                className={"p-1 flex flex-row justify-between items-center transition-all ease-in hover:bg-blue-100 cursor-pointer rounded-2xl"}>
                <div className={"flex justify-start gap-4 items-center"}>
                    <div className={"h-8 w-4 rounded-xl"}
                         style={{background: GetPriorityColor(GetPriorityEnumFromId(priorityId))}}
                    ></div>
                    {name}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                </div>
                <div onClick={() => {
                    if (eventsViewContext.changeSelectedEvent !== null) {
                        eventsViewContext.changeSelectedEvent(eventList)
                    }
                }}>
                    <Button
                        type={ButtonType.purpo}
                        text={"View"}/>
                </div>
            </div>
        </div>
    )
}

export default function EventsBox({toggle}: { toggle?: boolean }) {

    const arr = [1, 1, 2, 231, 213, 4, 343, 314, 1, 23]
    const evenContext = useContext(EventBoxContext)
    const eventViewContext = useContext(EventsViewContext)


    const [eventBoxContext, setEventBoxContext] = useState(CurrentView.Default)
    const [events, setEvents] = useState<EventList[]>([])

    const addItemClick = () => {
        setEventBoxContext(CurrentView.Add)
    }


    const getUserEventList = () => {
        fetch("http://localhost:8080/eventList/GetAllEvents", {
            method: "GET",
            credentials: "include",
            mode: "cors",
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw new Error("Could not get user events")
            }
        }).then((res: EventList[]) => {
            console.log("Got User Event List", res)
            setEvents(res)

            if (eventViewContext.selectedEventList !== null) {
                const updatedEvent = res.find(val => val.id === eventViewContext.selectedEventList!.id);
                if (eventViewContext.changeSelectedEvent !== null && updatedEvent !== undefined) {
                    eventViewContext.changeSelectedEvent(updatedEvent)
                }
            }


        }).catch(e => console.log("err: ", e))
    }

    useEffect(() => {
        getUserEventList()
        console.log("Triggered")
    }, [eventBoxContext, toggle])

    return (
        <EventBoxContext.Provider value={{current: eventBoxContext, updateView: setEventBoxContext}}>
            <div className={"font-content"}>
                <div className={"text-lg"}>
                    Events
                </div>
                <div className={"bg-white mr-10 mt-2 p-4 rounded-xl border-2 border-black"}>
                    {eventBoxContext === CurrentView.Default ?
                        <>
                            <div className={"flex flex-row justify-start gap-4 mt-2"}>
                                <div onClick={addItemClick}><Button text={"Add List"} type={ButtonType.success}/></div>
                                <div><Button text={"Filter"} type={ButtonType.secondary}/></div>
                            </div>
                            <div className={"mt-2"}>
                                {events.map((val, index) => {
                                    return (
                                        <div key={index}>
                                            <ListItem eventList={val} priorityId={val.priorityId} name={val.name}
                                                      description={val.description}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </> : <AddEventListBox/>}
                </div>
            </div>
        </EventBoxContext.Provider>
    )
}