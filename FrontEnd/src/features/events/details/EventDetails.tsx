import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/store/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import EventDetailsSidebar from "./EventDetailsSidebar";
import EventDetailsCard from "./EventDetailsCard";

export default observer (function EventDetails () {
    const {eventStore} = useStore();
    const {selectedEvent, loadEvent} = eventStore;
    const {id} = useParams();

    useEffect(() => {
        if(id) loadEvent(id);
    }, [id, loadEvent])

    if(!selectedEvent) return;

    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                        <EventDetailsCard />
                </div>

                <div className="col-lg-6">
                <div className="d-flex justify-content-center">
                    <EventDetailsSidebar />
                </div>
                </div>
            </div>
        </>
    )
})

// justify-content-center