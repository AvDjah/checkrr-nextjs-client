"use client"
import Button, {ButtonType} from "@/components/Home/Button";
import {EventList} from "@/components/types";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import AddEventListBox from "@/components/Home/AddEventsList";

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

export default function EventsBox(props: { events: EventList[] }) {

    const arr = [1, 1, 2, 231, 213, 4, 343, 314, 1, 23]
    const [eventBoxContext, setEventBoxContext] = useState(CurrentView.Default)


    const addItemClick = () => {
        setEventBoxContext(CurrentView.Add)
    }


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
                                {props.events.map((val, index) => {
                                    return (
                                        <div key={index} className={"p-1"}> Child : <Button type={ButtonType.normal}
                                                                                            text={"View"}/>
                                            <Button type={ButtonType.danger} text={"Delete"}/> <Button
                                                text={"Something"}
                                                type={ButtonType.success}/>
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