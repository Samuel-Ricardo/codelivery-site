import { GOOGLE_API_KEY } from "@/config"
import { mapping_style } from "@/styles/mapping_style"
import { useLoadScript } from "@react-google-maps/api"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { IRouteResponse } from "@types"
import { useSnackbar } from "notistack"
import { getConnection } from "@/api/connection"
import { getALL } from "@/api/routes"
import { Button, Grid, MenuItem, Select } from "@mui/material"
import { Navbar } from "./Navbar"
import {Navigator} from './Navigator'

export const MapView = () => {

  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_API_KEY() });

  const style = mapping_style()

  const [routes, setRoutes] = useState<IRouteResponse[]>([])
  const [routeIdSelected, setRouteIdSelected] = useState("")
  const [shouldStart,setShouldStart] = useState(false)
  
  const { enqueueSnackbar } = useSnackbar()

  const socket = useRef(getConnection());

  const finishRouteMessage = useCallback((id: number) => {

    enqueueSnackbar(`${routes[id].title} Finalized`, { variant: 'success' })  
  
  }, [enqueueSnackbar, routes])

  const startRoute = useCallback((event: FormEvent) => {
    event.preventDefault();
    setShouldStart(true)  
  },[])
 
  const syncRoutes = async () => setRoutes(await getALL())
  useEffect(() => {syncRoutes()}, [])

  if (!isLoaded) return <div>Loading...</div>

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
        socket={socket} 
        selectedRouteId={routeIdSelected}
        selectedRoute={routes.find(({_id}) => _id === routeIdSelected)}
        start={{should: shouldStart, set: setShouldStart}}
        finishRouteMessage={finishRouteMessage}
      />

    </Grid>
  )
}
