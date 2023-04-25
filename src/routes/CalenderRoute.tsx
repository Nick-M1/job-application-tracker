import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {EventContentArg} from "@fullcalendar/core";
import getApplicationDataByUserid from "../api/get-application-data-by-userid";
import {SortOptions} from "../constants/sort-constants";
import {useLoaderData} from "react-router-dom";

type EventInput = { title: string, start: Date }

export async function loader(): Promise<EventInput[]> {
    const { data, error } = await getApplicationDataByUserid(SortOptions.MOSTRECENT, '')

    if (error !== null || data === null)
        return []

    return data.map(item => ({
        title: item.title,    // @ts-ignore
        start: new Date(item.stage_1?.timestamp)
    }))
}

export function Component() {
    const eventsData = useLoaderData() as EventInput[]

    return (
        <div className='px-2 py-5 scrollbar smooth-transition'>
            <h1>Application Timetable</h1>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={eventsData}
                eventContent={renderEventContent}
            />
        </div>
    )
}

// a custom render function
function renderEventContent(eventInfo: EventContentArg) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}