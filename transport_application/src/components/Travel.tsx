import { DirectionsRenderer } from "@react-google-maps/api"
import {Route} from '@/lib/google_maps/Route'
import { useEffect, useState } from "react"

interface ITravelProps {
  travel: Route
}

export const Travel = ({travel}:ITravelProps) => {

  const [travelState, setTravelState] = useState<google.maps.DirectionsResult>()

  useEffect(() => {
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
  },[])

  return (
   <DirectionsRenderer
              directions={travelState}
              options={{
              suppressMarkers:true,
              polylineOptions: {
                strokeColor: "#000",
                strokeOpacity: 0.5,
                strokeWeight: 5,
              }
    }}/> 
  )
 }
