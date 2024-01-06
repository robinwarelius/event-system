import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import EventListItem from "./EventListItem";

export default observer (function EventList (){
  const {eventStore} = useStore();
  const {groupedEvents} = eventStore;

   return (
    <>
      {groupedEvents.map(([group, events]) => (
          events.map(event => (
              <EventListItem key={group} event={event} />
          ))
      ))}
    </>
  )
})