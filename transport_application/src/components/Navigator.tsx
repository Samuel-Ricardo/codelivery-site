import { Position, IRouteResponse } from "@types"
import {getRandomColor} from '@/util/index'
import { getCurrentPosition } from "@/lib/google_maps/geolocation"
import { Grid } from "@mui/material"
import { GoogleMap, MarkerF } from "@react-google-maps/api"
import { Route } from "@/lib/google_maps/Route"
import { MutableRefObject, useCallback, useEffect, useState } from "react"
import { RouteAlredyExistsError } from "@/errors"
import { makeCarIcon, makeMarkerIcon } from "@/lib/google_maps/Vehicle"
import { enqueueSnackbar } from "notistack"
import { Travel } from "./Travel"
import { EVENTS } from "@/config"
import { Socket } from "socket.io-client"

interface INavigatorProps {
  isLoaded: boolean;
  socket: MutableRefObject<Socket>;
  selectedRouteId: string;
  selectedRoute?: IRouteResponse;
  finishRouteMessage: (id:number) => void;
  start: {
    should: boolean;
    set: Function;
  }  
}

export const Navigator = (props:INavigatorProps) => {

  const {
    isLoaded,
    socket,
    selectedRouteId, 
    selectedRoute,
    start,
    finishRouteMessage,
  } = props;

  const [travels, setTravels] = useState<{[id:string]:Route}>({})
  const [action, setAction] = useState<{action: "remove", travel: string}>()

  const [initialPosition, setInitialPosition] = useState<Position>({lng:0, lat:0})
  const syncInitialPosition = async () => setInitialPosition(await getCurrentPosition({enableHighAccuracy:true}));  


  const addRoute = () => {
    if(selectedRouteId in travels) throw new RouteAlredyExistsError();

    const color = getRandomColor()

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

    socket.current.emit(EVENTS.NEW_DIRECTION, {routeId: selectedRouteId})
  }

  
  const startTravel = () => {
   
    try{ addRoute() }
    
    catch(error) {
      return error instanceof RouteAlredyExistsError ?
        enqueueSnackbar(`${selectedRoute?.title} Alredy exists, wait for the trip to finish`, { variant: 'error' })
        : console.error(error)
    }

    finally{start.set(false)}
  
  }

  useEffect(() => {
    if(selectedRoute){
      setInitialPosition(selectedRoute?.startPosition)
      if (start.should) startTravel()
      return;
    }

    syncInitialPosition()
  }, [travels, isLoaded, selectedRoute, start])

  // console.log({
  //   props,
  //   travels,
  //   initialPosition,
  // })
 
  const updateTravel = (id:string,value:Route) => {
    travels[id] = value
    setTravels(travels)   
  }

  const removeTravel = (travelId:string) => {
    console.log({travelId,TRAVEL_FINISHSSSS:travels});
    const newTravels:{[id:string]:Route} = {};  

    Object
      .keys(travels)
      .forEach((id) => {
        if(id !== travelId) newTravels[id] = travels[id]
      })

    console.log({newTravels})
    setTravels(newTravels)
  }

  const finishTravel = (id:string) => {
    finishRouteMessage(Number(id))

    travels[id].delete();  
    removeTravel(id);
  }

  useEffect(() => {
    console.log({travels})
  } , [travels])

  useEffect(() => {
    if(action?.action === "remove") finishTravel(action.travel) 
  },[action] )

  return (
    <Grid item xs={12} sm={9}>
        <GoogleMap 
         zoom={10} 
         center={initialPosition} 
         mapContainerStyle={
           { width: window.innerWidth, height: window.innerHeight }
        }>  
    
        <MarkerF position={initialPosition}/>

          {
            travels?
              Object.keys(travels).map( id => (
                <Travel 
                  key={id}
                  id={id}
                  travel={travels[id]} 
                  socket={socket}
                  setAction = {setAction}
                  updateTravel={updateTravel}
                  removeTravel={removeTravel}
                  finishTravel={finishTravel}
                />
              ))
            : <></>
          }
  
        </GoogleMap>
      </Grid>
  )
}
