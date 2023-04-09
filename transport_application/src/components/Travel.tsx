import { DirectionsRenderer } from "@react-google-maps/api"
import {Route} from '@/lib/google_maps/Route'
import { useEffect, useState } from "react"

interface ITravelProps {
  travel: Route
}

export const Travel = ({travel}:ITravelProps) => {



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
