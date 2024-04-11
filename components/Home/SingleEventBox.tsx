"use client"
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {EventsViewContext} from "@/components/Home/EventsView";
import Button, {ButtonType} from "@/components/Home/Button";
import {GetPriorityColor, GetPriorityEnum, Priority, PrirorityColors} from "@/components/Home/AddEventsList";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from "next/navigation";
import {EventList} from "@/app/types";
import dayjs from "dayjs";
import {DesktopTimePicker, LocalizationProvider, MobileTimePicker, StaticTimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {eventSchema} from "@/validation/validator";

export enum WaitTimeUnit {
    H = "Hour", M = "Minute", S = "Seconds"
}

export enum ToastType {
    Error, Success, Info
}

export function ShowToast(msg: string, type: ToastType) {

    if (type === ToastType.Error) {

        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    } else if (type === ToastType.Success) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    } else if (type == ToastType.Info) {
        toast(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        })
    }
}

export const TimeUnits = [{
    name: "Minutes", unit: WaitTimeUnit.M
}, {name: "Seconds", unit: WaitTimeUnit.S},
    {
        name: "Hours", unit: WaitTimeUnit.H
    }]

export function GetTimeEnum(val: string) {
    if (val === "Minutes") {
        return WaitTimeUnit.M
    } else if (val === "Hours") {
        return WaitTimeUnit.H
    } else {
        return WaitTimeUnit.S
    }
}


function AddEventBox(props: { setToggle: Dispatch<SetStateAction<boolean>>, selectedEvent: EventList }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [prioritySelected, setPrioritySelected] = useState(Priority.Low)
    const [startTime, setStartTime] = useState(dayjs(new Date()))
    const [waitTime, setWaitTime] = useState(0)
    const [timeUnit, setTimeUnit] = useState(WaitTimeUnit.M)
    const [message, setMessage] = useState("")

    const router = useRouter()

    const addEventClick = () => {

        console.log("Start: ", startTime, "\n Wait:", waitTime)
        let bodyData;
        try {
            const data = {
                eventName: name,
                startTime: startTime.unix().toString(),
                waitTime: waitTime,
                timeUnit: timeUnit,
                message: message,
                description,
                priorityID: prioritySelected,
                eventListId: props.selectedEvent.id,
            }
            eventSchema.parse(data)
            bodyData = data
        } catch (e) {
            console.log("err: ", e)
            ShowToast("Please enter correct values.", ToastType.Error)
            return
        }

        fetch("http://localhost:8080/event/addSingleEvent", {
            method: "POST",
            credentials: "include",
            mode: "cors",
            body: JSON.stringify(bodyData)
        }).then(res => {

            if (res.status === 201) {
                ShowToast("Created Successfully", ToastType.Success)
            } else if (res.status === 401) {
                ShowToast("Unauthorized. Redirecting now...", ToastType.Error)
                throw new Error("Unauthorized")
            } else {
                ShowToast("Error, Please Retry", ToastType.Error)
                throw new Error()
            }
            return res.json()
        }).then(res => {
            console.log("Success", res)
            props.setToggle(false)
        }).catch(e => {
            console.log("err:", e)
            props.setToggle(false)
        })
    }


    return (
        <div className={"relative p-4"}>
            <div onClick={() => {
                props.setToggle(false)
            }}
                 className={"absolute -top-3 -right-4 bg-black text-white cursor-pointer rounded-full hover:scale-110 active:bg-white active:text-black transition-all ease-in duration-75"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
            </div>
            <div>
                Add Event Details
            </div>
            <hr className={"my-2"}/>
            <div>
                <label
                    className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                    Schedule Name</label>
                <input value={name} onChange={(e) => {
                    setName(e.target.value)
                }}
                       className={"rounded-xl block  outline-none bg-gray-100  text-md p-4"}/>
                <label
                    className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                    Start Time</label>
                <div>
                    <DesktopTimePicker
                        value={startTime}
                        views={['hours', 'minutes', 'seconds']}
                        onChange={newValue => {
                            if (newValue !== null) {
                                console.log(newValue.unix())
                                setStartTime(newValue)
                            }
                        }}/>
                </div>
                <label
                    className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                    Enter Wait Time</label>
                <div className={"flex flex-row items-center gap-2 justify-start"}>
                    <input value={waitTime} onChange={e => setWaitTime(parseInt(e.target.value))} type={"number"}
                           className={"rounded-xl block  outline-none bg-gray-100  text-md p-4"}/>
                    <select value={timeUnit} className={"p-4 text-xs  rounded-xl flex-grow"}
                            onChange={(e) => setTimeUnit(GetTimeEnum(e.target.value))}>
                        {TimeUnits.map((value, index) => {
                            return <option value={value.name} key={index}
                                           className={"after:content-['*ss'] after:ml-0.5 after:text-red-500"}>{value.name.toString()}</option>
                        })}
                    </select>
                </div>
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
                <label
                    className={"p-1 text-gray-500 text-xs after:content-['*'] after:ml-0.5 after:text-red-500"}>Enter
                    Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)}
                          className={"rounded-xl block  outline-none bg-gray-100  text-md p-4"}/>
                <div className={"mt-2"}>
                    <Button type={ButtonType.success} text={"Add"} onClick={addEventClick}/>
                </div>
            </div>
        </div>
    )
}


export default function SingleEventBox({toggle, setToggle}: {
    toggle: boolean,
    setToggle: Dispatch<SetStateAction<boolean>>
}) {

    // const [toggle, setToggle] = useState(false)

    const eventViewContext = useContext(EventsViewContext)

    const selectedList = eventViewContext.selectedEventList

    return (
        <div className={"bg-white p-10 rounded-xl relative"}
             style={{display: eventViewContext.selectedEventList === null ? "none" : "block"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <div onClick={() => {
                    if (eventViewContext.changeSelectedEvent !== null) {
                        eventViewContext.changeSelectedEvent(null)
                    }
                }}
                     className={"absolute -top-2 -right-2 bg-black text-white cursor-pointer rounded-full hover:scale-110 active:bg-white active:text-black transition-all ease-in duration-75"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div>
                    Single Event Box
                    : {selectedList !== null ? selectedList.name : "None Selected"}
                </div>
                <div className={"mt-4 flex justify-start gap-4 "}>
                    <Button onClick={() => setToggle(true)} type={ButtonType.success} text={"Add Event"}/>
                    <Button type={ButtonType.purpo} text={"Filter"}/>
                </div>
                <hr className={"h-2 mt-4"}/>
                <div className={"mt-2"}>
                    <div>
                        <table className={"w-72"} >
                            <thead className={""} >
                            <tr className={"p-2"} >
                                <th className={"p-2"} >Name</th>
                                <th  className={"p-2"} >Time</th>
                                <th  className={"p-2"} >Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedList?.events.map((val, index) => {
                                return <tr key={index} className={" " + (index%2 === 1 ? "bg-blue-100" : " ")}>
                                    <td className={"p-2"}  >{val.eventName}</td>
                                    <td className={"p-2"} >{val.startTime}</td>
                                    <td className={"p-2"} ><button>View</button></td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {toggle && eventViewContext.selectedEventList !== null &&
                    <div
                        className={"shadow-2xl rounded-xl ring-2 ring-offset-2 fixed left-1/2 top-1/2 z-50 bg-white w-96"}
                        style={{
                            transform: "translate(-50%, -50%)"
                        }}>
                        <AddEventBox selectedEvent={eventViewContext.selectedEventList} setToggle={setToggle}/>
                    </div>
                }
            </LocalizationProvider>
        </div>
    )
}