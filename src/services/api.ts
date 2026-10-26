export const API_BASE_URL=import.meta.env["VITE_API_BASE_URL"]??"/api";
export async function apiRequest<T>(path:string,options:RequestInit={}){const response=await fetch(`${API_BASE_URL}${path}`,{...options,headers:{"Content-Type":"application/json",...options.headers}});if(!response.ok)throw new Error(`Request failed: ${response.status}`);return response.json() as Promise<T>}
