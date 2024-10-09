import { createContext, useState } from "react";
import Search from "../pages/Search";

export const PopUpContext = createContext(null);

export default function PopUpProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [query , setQuery]= useState([])
    


    return (
        <PopUpContext.Provider value={{ showModal, setShowModal , query , setQuery }}>
            {children}
            {query.length > 0 ?  <Search />  : ''}
        </PopUpContext.Provider>
    );
}
