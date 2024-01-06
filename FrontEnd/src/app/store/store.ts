import { createContext, useContext } from "react";
import EventStore from "./eventStore";

// Definition av gränssnittet Store som innehåller en egenskap av typen EventStore
interface Store {
    eventStore: EventStore
}

// Skapar ett objekt 'store' av typen Store som initierar 'eventStore' med en ny instans av EventStore
export const store: Store = {
    eventStore: new EventStore()
}

// Skapar en React context med det tidigare skapade 'store'-objektet
export const StoreContext = createContext(store);

// En hook-funktion för att använda StoreContext inom React-komponenter
export function useStore (){
    return useContext(StoreContext);
}
