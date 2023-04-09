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

  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_API_KEY() });

  const style = mapping_style()

  const [routes, setRoutes] = useState<IRouteResponse[]>([])
  const [routeIdSelected, setRouteIdSelected] = useState("")

  const [travels, setTraves] = useState<{[id:string]: IRouteResponse}>({})
  const [shouldStart,setShouldStart] = useState(false)

  const map = useRef<Map>();
  
  const { enqueueSnackbar } = useSnackbar()

  const Socket = getConnection();
  const { NEW_POSITION, NEW_DIRECTION } = EVENTS;


  const finishRoute = useCallback((route: IRouteResponse) => {
 
    enqueueSnackbar(`${route.title} Finalized`, { variant: 'success' })
    map.current?.removeRoute(route._id)
  
  }, [enqueueSnackbar])


  useEffect(() => {

    const handler = (data: RouteResponse) => {
      console.log({ data });

      map.current?.moveCurrentMarker(data.routeId, { lat: data.position[0], lng: data.position[1] })
      const route = routes.find(({ _id }) => _id === data.routeId)

      if (route && data.finished) finishRoute(route)
    }

    Socket.on(NEW_POSITION, handler)

  }, [finishRoute, routes, routeIdSelected])

  
  const startRoute = useCallback((event: FormEvent) => {
    event.preventDefault();
    setShouldStart(true)  
  },[])
 
  const syncRoutes = async () => setRoutes(await getALL())
  useEffect(() => {syncRoutes()}, [])




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
