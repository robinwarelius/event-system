import { createContext, useContext } from "react";
import EventStore from "./eventStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

// Definition av gränssnittet Store som innehåller en egenskap av typen EventStore
interface Store {
    eventStore: EventStore
    userStore: UserStore
    commonStore: CommonStore
}

// Skapar ett objekt 'store' av typen Store som initierar 'eventStore' med en ny instans av EventStore
export const store: Store = {
    eventStore: new EventStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore()
}

// Skapar en React context med det tidigare skapade 'store'-objektet
export const StoreContext = createContext(store);

// En hook-funktion för att använda StoreContext inom React-komponenter
export function useStore (){
    return useContext(StoreContext);
}
