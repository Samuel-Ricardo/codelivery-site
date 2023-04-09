import { EVENTS, GOOGLE_API_KEY } from "@/config"
import { mapping_style } from "@/styles/mapping_style"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Map } from '@/lib/google_maps/Map'
import { RouteResponse, IRouteResponse, Position } from "@/@types"
import { useSnackbar } from "notistack"
import { getConnection } from "@/api/connection"
import { getALL } from "@/api/routes"
import { getCurrentPosition } from "@/lib/google_maps/geolocation"
import { Button, Grid, MenuItem, Select } from "@mui/material"
import { Navbar } from "./Navbar"
import {Navigator} from './Navigator'

export const MapView = () => {

 
  return (
    <Grid className={style.root} container>
      <Grid item xs={12} sm={3}>
        
        <Navbar/>
  
        <form onSubmit={startRoute} className={style.form}>
          <Select
            fullWidth
            displayEmpty
            value={routeIdSelected}
            onChange={event => setRouteIdSelected(event.target.value + "")} 
          > 
            <MenuItem value="">
              <em>Selecione uma corrida</em>
            </MenuItem>

            {
              routes.map((route, key) => (
                <MenuItem key={key} value={route._id}>
                  {route.title}
                </MenuItem>
              )) 
            }
          </Select>

          <div className={style.btnSubmitWrapper}>
            <Button type="submit" color="primary" variant="contained">
              Iniciar uma Corrida
            </Button>
          </div>

        </form>
      </Grid>

      <Navigator
        isLoaded={isLoaded}
        selectedRouteId={routeIdSelected}
        selectedRoute={routes.find(({_id}) => _id === routeIdSelected)}
          start={{should: shouldStart, set: setShouldStart}}
      />

    </Grid>
  )
}
