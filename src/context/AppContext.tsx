import { createContext,useContext,useState,type ReactNode } from "react";
type AppState={simulation:boolean;compact:boolean;setCompact:(value:boolean)=>void};
const AppContext=createContext<AppState|undefined>(undefined);
export function AppProvider({children}:{children:ReactNode}){const[compact,setCompact]=useState(true);return <AppContext.Provider value={{simulation:true,compact,setCompact}}>{children}</AppContext.Provider>}
export function useApp(){const value=useContext(AppContext);if(!value)throw new Error("useApp must be inside AppProvider");return value}
