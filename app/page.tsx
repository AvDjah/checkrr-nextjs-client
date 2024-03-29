// "use client"
import TitleBar from "@/components/Home/TitleBar";
import EventsBox from "@/components/Home/EventsBox";
import Bell from "@/components/Home/NotificationBell";
import {redirect} from "next/navigation";
import {EventList} from "@/app/types";
import {cookies} from "next/headers";
import SingleEventBox from "@/components/Home/SingleEventBox";
import EventsView from "@/components/Home/EventsView";

// import {useEffect} from "react";


async function getUserData() {
    try {
        const eventListRes = await fetch("http://localhost:8080/eventList/GetAllEvents", {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {Cookie: cookies().toString()},
        })
        if (eventListRes.status != 200) {
            console.log("EventList Cannot Be Retrieved")
            throw new Error("Can't")
        }
        const jsonData: EventList[] = await eventListRes.json()
        console.log(jsonData)
        return jsonData

    } catch (e) {
        console.log("Error Getting Init Data for Homepage", e)
        redirect("/login")
    }
}


export default async function Home() {

    // useEffect(() => {
    //     getUserData()
    // },[])
    const events = await getUserData()


    return (
        <div>
            <div className={"flex flex-col mt-2"}>
                <Bell/>
                <div className={"mt-10 transition-all ease-in duration-700"}>
                    <input
                        className={"text-3xl rounded-xl border-1 border-black focus:border-2 p-4 font-header outline-none"}/>
                </div>
                <div className={"mt-4"}>
                    <EventsView />
                </div>
            </div>
        </div>
    )
}