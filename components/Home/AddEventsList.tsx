"use client"

import Button, {ButtonType} from "@/components/Home/Button";
import {useContext, useState} from "react";
import {CurrentView, EventBoxContext} from "@/components/Home/EventsBox";

export enum Priority {
    Low = "Low", Medium = "Medium", High = "High"
}

export const PrirorityColors = [{name: Priority.High, color: "red"}, {name: Priority.Medium, color: "gold"}, {
    name: Priority.Low,
    color: "green"
}]

export const GetPriorityColor = (priority: Priority) => {
    if (priority === Priority.Medium) {
        return "gold"
    } else if (priority === Priority.High) {
        return "red"
    } else {
        return "green"
    }
}

export function GetPriorityEnum(value: string) {
    if (value === "Low") {
        return Priority.Low
    } else if (value === "Medium") {
        return Priority.Medium
    } else {
        return Priority.High;
    }
}

export function GetPriorityEnumFromId(value: number | undefined) {

    if (value === undefined) {
        return Priority.Low
    }

    if (value === 1) {
        return Priority.Low
    } else if (value === 2) {
        return Priority.Medium
    } else {
        return Priority.High;
    }
}

export default function AddEventListBox() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [prioritySelected, setPrioritySelected] = useState(Priority.Low)

    const eventBoxContext = useContext(EventBoxContext)


    const goBack = () => {
        if (eventBoxContext.updateView !== undefined) {
            eventBoxContext.updateView(CurrentView.Default)
        }
    }

    const addEventClick = () => {

        fetch("http://localhost:8080/eventList/addEvent", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                name,
                description,
                priority: prioritySelected
            }),
            mode: "cors"
        }).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Error Inserting Event List")
                throw new Error("Error Inserting Event")
            }
        }).then(res => {
            console.log("Res: ", res)
            if (eventBoxContext.updateView) {
                eventBoxContext.updateView(CurrentView.Default)
            }
        }).catch(e => console.log("err: ", e))

    }


    return (
        <div className={"mt-2 mx-auto"}>
            <div className={"flex flex-row justify-start gap-4 items-center"}>
                <div className={"m-2"} onClick={goBack}>
                    <Button text={"Go Back"} type={ButtonType.danger}/>
                </div>
                <div>
                    Add Event Schedule
                </div>
            </div>
            <div className={"flex flex-row justify-center items-center mt-10"}>
                <div>
                    <div className={"flex flex-col flex-grow w-96"}>
                        <label
                            className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                            Schedule Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)}
                               className={"rounded-xl block  outline-none bg-gray-100  text-md p-4"}/>
                        <label
                            className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                            Select Priority</label>
                        <div className={"flex flex-row items-center"}>
                            <select value={prioritySelected} className={"p-4 text-xs  rounded-xl flex-grow"}
                                    onChange={(e) => setPrioritySelected(GetPriorityEnum(e.target.value))}>
                                {PrirorityColors.map((value, index) => {
                                    return <option value={value.name} key={index}
                                                   className={"after:content-['*ss'] after:ml-0.5 after:text-red-500"}>{value.name.toString()}</option>
                                })}
                            </select>
                            <div className={"mx-2 h-10 rounded-xl w-4 ring-2 ring-offset-2 border-black"}
                                 style={{background: GetPriorityColor(prioritySelected), opacity: 1}}></div>
                        </div>
                        <label
                            className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                            Enter Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)}
                                  className={"rounded-xl block  outline-none bg-gray-100  text-md p-4"}/>
                        <button onClick={addEventClick}
                                className={"bg-amber-700 text-white p-2 rounded-xl mt-4 w-48"}>Add List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}