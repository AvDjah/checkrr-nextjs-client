import {useContext} from "react";
import {EventsViewContext} from "@/components/Home/EventsView";
import {EventList} from "@/app/types";


function OngoingList({list}: { list: EventList }) {
    return <div>
        <div>
            Ongoing List
            <hr className={"mt-2"}/>
        </div>
        <div className={"mt-2"}>
            {list.events.filter((val) => {
                const currentTime = new Date();
                const [inputHours, inputMinutes, inputSeconds] = val.startTime.split(':').map(Number);
                const [currentHours, currentMinutes, currentSeconds] = [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];

                if(!(inputHours > currentHours || (inputHours === currentHours && (inputMinutes > currentMinutes || (inputMinutes === currentMinutes && inputSeconds > currentSeconds))))){
                    return false
                }
                return true
            }).map((val, index) => {

                return <div key={index} className={"flex flex-row justify-start gap-2 items-center"} ><img className={"h-8 w-8"}
                                 src={"https://media.tenor.com/b7yWLAWnqwwAAAAi/waktu-informa.gif"}
                                 alt={"no img"}/>{val.eventName}</div>

            })}
        </div>
    </div>
}


export default function OngoingEvents() {

    const eventsViewContext = useContext(EventsViewContext)


    return <div className={"bg-white p-10 rounded-xl relative"}>
        <div className={"text-xl"}>
            Ongoing Events
        </div>
        <div className={"mt-2"}>
            {eventsViewContext.selectedEventList !== null ?
                <OngoingList list={eventsViewContext.selectedEventList}/> : "no ongoing events"}
        </div>
    </div>
}