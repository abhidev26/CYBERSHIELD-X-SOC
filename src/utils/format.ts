export const formatNumber=(value:number)=>new Intl.NumberFormat("en-IN").format(value);
export const formatDateTime=(value:Date)=>value.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"});
