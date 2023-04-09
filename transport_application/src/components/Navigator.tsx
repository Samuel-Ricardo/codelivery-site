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
