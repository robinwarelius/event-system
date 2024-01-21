import { makeAutoObservable, runInAction } from "mobx"
import { EventDto, EventResponse } from "../models/event";
import agent from "../api/agent";

// Definiera en klass för hantering av händelser (events).
export default class EventStore {
    response: EventResponse | null = null;
    eventsRegistry = new Map<string, EventDto>();
    selectedEvent: EventDto | undefined = undefined;
    editMode = false;

    // Konstruktor för att göra klassen observerbar med MobX.
    constructor() {
        makeAutoObservable(this)
    } 

    get eventsByDate(){
        return Array.from(this.eventsRegistry.values()).sort((a, b) =>
        Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedEvents () {
        return Object.entries(
            this.eventsByDate.reduce((events, event) => {
                const date = event.date;
                events[date] = events[date] ? [...events[date], event] : [event];
                return events;
            }, {} as {[key: string]: EventDto[]})
        )
    }

    loadEvents = async () => {
        try {
            this.response = await agent.Events.list();
            if(this.response.isSuccess){
                runInAction(() => {
                    this.response?.result.forEach((event) => {
                        const formattedDate = this.formatDate(event.date);
                        const formattedEvent = { ...event, date: formattedDate };
                        this.setEvent(formattedEvent);
                    })            
                });
            }
        } catch (error) {
            runInAction(() => {
                console.log(error);
            })
        }
    }

    private formatDate = (date: string) => {
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0];
    }

    loadEvent = async (id: string) => {
        let event = this.getEvent(id);
        if(event)
        {
            this.selectedEvent = event
            return event;
        } 
        else 
        {
            try {
                this.response = await agent.Events.details(id);
                runInAction(() => {
                    if(this.response?.isSuccess){
                        this.response.result.forEach((event) => {
                            this.setEvent(event);
                            this.selectedEvent = event;
                            return event;
                        })
                    }
                })
            } catch (error){
                runInAction(() => {
                    console.log(error);
                })
            }
        }
    }

    private setEvent = (event: EventDto) => {
        this.eventsRegistry.set(event.eventId, event)
    }

    private getEvent = (id: string) => {
       return this.eventsRegistry.get(id);
    }

    deleteEvent = async (id: string) => {
        try {
            await agent.Events.delete(id).then(reponse => {
                runInAction(() => {
                    if(reponse.isSuccess){
                        this.eventsRegistry.delete(id);                     
                    }
                })
            })
        }
        catch (error){
            runInAction(() => {
                console.log(error)
            })
        }
    }

    addEvent = async (event: EventDto) => {
        try {         
            await agent.Events.add(event);
            runInAction(() => {
                    this.setEvent(event)
                    this.selectedEvent = event;
            });
        } catch (error){
            runInAction(() => {
                console.log(error)
            });
            throw error; 
        }
    }

    updateEvent = async (event: EventDto) => {
        try {         
            const response = await agent.Events.update(event);
            runInAction(() => {
                if(response.isSuccess){
                    this.setEvent(event)
                    this.selectedEvent = event;
                    this.editMode = false;                
                }
            });
            return response; 
        } catch (error){
            runInAction(() => {
                console.log(error)
            });
            throw error;
        }
    }
}