import { DirectionsRenderer, MarkerF } from "@react-google-maps/api"
import {Route} from '@/lib/google_maps/Route'
import { MutableRefObject, useEffect, useState } from "react"
import { RouteResponse } from "@/@types"
import { EVENTS } from "@/config"
import { Socket } from "socket.io-client"

interface ITravelProps {
  id:           string;
  travel:       Route;
  socket:       MutableRefObject<Socket>
  updateTravel: (id:string, value:Route) => void 
  removeTravel: (id:string) => void
  finishTravel: (id:string) => void
  setAction:    (state: {action: "remove", travel: string}) => any
}

export const Travel = ({
  id, 
  travel, 
  socket,
  setAction,
  updateTravel,
  finishTravel,
}:ITravelProps) => {

  const [travelState, setTravelState] = useState<google.maps.DirectionsResult>()
  const [routeState, setRouteState] = useState({...travel} as Route)

  const init = () => {
    new google.maps.DirectionsService().route(
      {
        origin: travel.currentMaker.getPosition() as google.maps.LatLng,
        destination: travel.endMarker.getPosition() as google.maps.LatLng,
        travelMode: google.maps.TravelMode.DRIVING,
      }, 
      (result, status) => {
       if(status === "OK") return setTravelState(result!)
       throw new Error(status)
      }
    )
  }

  const syncTravelState = (data: RouteResponse) => {
    //console.log({data})

    if(data.routeId !== id) return;

    travel.currentMaker.setPosition({
      lat: data.position[1],
      lng: data.position[0]
    })

    //updateTravel(id, travel)
    setRouteState({...travel} as Route)
    

    if (data.finished) {
      socket.current.off(EVENTS.NEW_POSITION, syncTravelState)
      console.log({id,travel, routeState, data})
      //finishTravel(id)
      setAction({action: "remove", travel: id})
    }
  }

  useEffect(() => {
    init()  
    socket.current.on(EVENTS.NEW_POSITION, syncTravelState)
  },[])

  return (<>

    <MarkerF 
      position={routeState.currentMaker.getPosition()!}
      icon={routeState.currentMaker.getIcon() as google.maps.Symbol}
    />

    <MarkerF 
      position={routeState.endMarker.getPosition()!}
      icon={routeState.endMarker.getIcon() as google.maps.Symbol}
    />


   <DirectionsRenderer
      directions={travelState}
      options={{
        markerOptions:{
          label: ":D",
          icon: routeState.currentMaker.getIcon()
        },
        suppressMarkers:true,
        polylineOptions: {
        strokeColor: routeState.strokeColor,
        strokeOpacity: 0.5,
        strokeWeight: 5,
      }
    }}/> 
  
  </>)
 }
