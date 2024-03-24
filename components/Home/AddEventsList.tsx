"use client"

import Button, {ButtonType} from "@/components/Home/Button";
import {useContext, useState} from "react";
import {CurrentView, EventBoxContext} from "@/components/Home/EventsBox";

enum Priority {
    Low = "Low", Medium = "Medium", High = "High"
}

const priority = [{name: Priority.High, color: "red"}, {name: Priority.Medium, color: "yellow"}, {
    name: Priority.Low,
    color: "green"
}]

const GetPriorityColor = (priority: Priority) => {
    if (priority === Priority.Medium) {
        return "yellow"
    } else if (priority === Priority.High) {
        return "red"
    } else {
        return "green"
    }
}

export default function AddEventListBox() {

    const eventBoxContext = useContext(EventBoxContext)

    const [prioritySelected, setPrioritySelected] = useState("green")

    const goBack = () => {
        if (eventBoxContext.updateView !== undefined) {
            eventBoxContext.updateView(CurrentView.Default)
        }
    }

    const addEventClick = () => {

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
                        <input
                            className={"rounded-xl block  outline-none bg-gray-100  text-md p-4"}/>
                        <label
                            className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                            Select Priority</label>
                        <div className={"flex flex-row items-center"}>
                            <select className={"p-4 text-xs  rounded-xl flex-grow"}
                                    onChange={(e) => setPrioritySelected(e.target.value)}>
                                {priority.map((value, index) => {
                                    return <option value={value.color} key={index}
                                                   className={"after:content-['*ss'] after:ml-0.5 after:text-red-500"}>{value.name.toString()}</option>
                                })}
                            </select>
                            <div className={"mx-2 h-10 rounded-xl w-4 ring-2 ring-offset-2 border-black"} style={ { background : prioritySelected, opacity : 1 }} ></div>
                        </div>
                        <label
                            className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                            Enter Description</label>
                        <textarea
                            className={"rounded-xl block  outline-none bg-gray-100  text-md p-4"}/>
                        <button onClick={addEventClick} className={"bg-amber-700 text-white p-2 rounded-xl mt-4 w-48"}>Add List</button>
                    </div>
                </div>
            </div>
        </div>
    )
}