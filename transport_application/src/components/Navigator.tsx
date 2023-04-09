import { Position, IRouteResponse } from "@types"
import {getRandomColor} from '@/util/index'
import { getCurrentPosition } from "@/lib/google_maps/geolocation"
import { Grid } from "@mui/material"
import { DirectionsRenderer, GoogleMap, MarkerF } from "@react-google-maps/api"
import { Route } from "@/lib/google_maps/Route"
import { FormEvent, useCallback, useEffect, useState } from "react"
import { RouteAlredyExistsError } from "@/errors"
import { makeCarIcon, makeMarkerIcon } from "@/lib/google_maps/Vehicle"
import { enqueueSnackbar } from "notistack"
import { Travel } from "./Travel"
import { getConnection } from "@/api/connection"
import { EVENTS } from "@/config"

interface INavigatorProps {
  isLoaded: boolean;
  selectedRouteId: string;
  selectedRoute?: IRouteResponse;
  start: {
    should: boolean;
    set: Function;
  }  
}

export const Navigator = (props:INavigatorProps) => {

  const {
    isLoaded, 
    selectedRouteId, 
    selectedRoute,
    start
  } = props;
  
  const color = getRandomColor()

  const [travels, setTravels] = useState<{[id:string]:Route}>({})

  const [initialPosition, setInitialPosition] = useState<Position>({lng:0, lat:0})
  const syncInitialPosition = async () => setInitialPosition(await getCurrentPosition({enableHighAccuracy:true}));  
 

  const addRoute = () => {
    if(selectedRouteId in travels) throw new RouteAlredyExistsError();

    travels[selectedRouteId] = new Route({
      currentMakerOptions: {
        position: selectedRoute?.startPosition,
        icon: makeCarIcon(color)
      },
      endMarkerOptions: {
      position: selectedRoute?.endPosition,
       icon: makeMarkerIcon(color)
     }
    })

    setTravels(travels)

    getConnection().emit(EVENTS.NEW_DIRECTION, {routeId: selectedRouteId})
    start.set(false)
  }

  
  const startTravel = useCallback(() => {
   
    try{ if (start.should) addRoute() }
    
    catch(error) {
      return error instanceof RouteAlredyExistsError ?
        enqueueSnackbar(`${selectedRoute?.title} Alredy exists, wait for the trip to finish`, { variant: 'error' })
        : console.error(error)
    }
  
  }, [selectedRouteId, isLoaded, start.should])

  useEffect(() => {
    if(selectedRoute){
      setInitialPosition(selectedRoute?.startPosition)
      startTravel()
      return;
    }

    syncInitialPosition()
  }, [isLoaded, selectedRoute, start.should])

console.log({
    props,
    travels,
    isLoaded,
    initialPosition,
  })
  
  return (
    <Grid item xs={12} sm={9}>
        <GoogleMap 
         zoom={10} 
         center={initialPosition} 
         mapContainerStyle={
           { width: window.innerWidth, height: window.innerHeight }
        }>  
      
          {
            travels?
              Object.keys(travels).map( id => (
                <Travel
                 travel={travels[id]} 
                />
              ))
            : <></>
          }
  
        </GoogleMap>
      </Grid>
  )
}
