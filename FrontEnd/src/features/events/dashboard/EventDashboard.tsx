import { useEffect } from 'react';
import { useStore } from '../../../app/store/store';
import EventList from './EventList';
import { observer } from 'mobx-react-lite';
import EventFiltersCard from './EventSort';


export default observer (function EventDashboard () {
    const {eventStore} = useStore();
    const {loadEvents, eventsRegistry} = eventStore;
  
    useEffect(() => {
      if(eventsRegistry.size === 0){
        loadEvents();
      }
     }, [loadEvents, eventsRegistry]); 

    return (
      <div className="row g-3 mb-3">

        <div className="col-lg-4"> 
            <EventFiltersCard />           
        </div>   

        <div className="col-lg-8">
            <EventList />
        </div>   

     </div>
    )
})