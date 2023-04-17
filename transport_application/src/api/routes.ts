import { GET_ALL_ROUTES } from "@/config/api/routes";
import { IRouteResponse } from '@types' 
 

console.log({PEDRO: GET_ALL_ROUTES});


export const getALL = 
  () => fetch(GET_ALL_ROUTES).then(data => data.json()) as Promise<IRouteResponse[]>
