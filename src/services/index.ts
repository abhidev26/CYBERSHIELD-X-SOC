import { alerts,events,incidents,threats } from "../data/demo";
const wait=<T,>(value:T)=>new Promise<T>(resolve=>setTimeout(()=>resolve(value),250));
export const authService={login:(credentials:{email:string;password:string})=>wait({token:"demo-session",profile:{email:credentials.email,role:"ANALYST"}})};
export const alertService={list:()=>wait(alerts),update:(id:string,status:string)=>wait({id,status})};
export const logService={list:()=>wait(events),get:(id:string)=>wait(events.find(item=>item.id===id))};
export const incidentService={list:()=>wait(incidents),update:(id:string,status:string)=>wait({id,status})};
export const threatService={list:()=>wait(threats)};
export const analyticsService={overview:()=>wait({events:24582,alerts:47,critical:8,incidents:19})};
export const socketService={connect:(onEvent:(value:unknown)=>void)=>{void onEvent;return{connected:false,mode:"simulation",disconnect:()=>undefined}}};
