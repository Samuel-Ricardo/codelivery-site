import { mapping_style } from "@/styles/mapping_style"
import { Route } from "@types";
import { Map } from '@/lib/google_maps/Map'
import { useSnackbar } from "notistack";
import { useCallback, useRef, useState, useEffect, FormEvent } from "react";
import { connect, Socket } from "socket.io-client";
import { RouteResponse } from "@/@types/response/Route";
import { EVENTS } from "@/config/socket";
import { Loader } from "google-maps";
import { getCurrentPosition } from "@/lib/google_maps/geolocation";
import { sample, shuffle } from "lodash";
import { makeCarIcon, makeMarkerIcon } from "@/lib/google_maps/Vehicle";
import { route_colors } from "@/styles/theme/global";
import { RouteAlredyExistsError } from "@/errors";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import { Navbar } from "./Navbar";
import { GOOGLE_API_KEY } from "@/config/env";


export const Mapping = _ => {

  console.log({ TOMI: GOOGLE_API_KEY })

  //const  googleMapsLoader = new Loader(process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_API_KEY)

  const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL as string;
  const { NEW_POSITION, NEW_DIRECTION } = EVENTS;

  const style = mapping_style();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [routeIdSelected, setRouteIdSelected] = useState("");
  const mapRef = useRef<Map>();

  const socketIORef = useRef<Socket>();

  const { enqueueSnackbar } = useSnackbar();

  const finishRoute = useCallback(
    (route: Route) => {

      enqueueSnackbar(`${route.title} Finalized!`, { variant: 'success' })
      mapRef.current?.removeRoute(route._id)

    }, [enqueueSnackbar]
  )

  useEffect(() => {

    if (!socketIORef.current?.connected) {
      socketIORef.current = connect(API_URL)
      socketIORef.current.on("connect", () => console.log("Connected! :D"))
    }

    const handler = (data: RouteResponse) => {
      console.log({ data })

      mapRef.current?.moveCurrentMarker(data.routeId, { lat: data.position[0], lng: data.position[1] })

      const route = routes.find(route => route._id === data.routeId)

      if (route && data.finished) finishRoute(route);
    }

    socketIORef.current?.on(NEW_POSITION, handler)

    return () => socketIORef.current?.off(NEW_POSITION, handler);

  }, [finishRoute, routes, routeIdSelected])

  useEffect(() => {
    fetch(`${API_URL}/routes`)
      .then(data => data.json())
      .then(data => setRoutes(data))
  }, [])

  useEffect(() => {

    (async () => {

      const [, position] = await Promise.all([
        //googleMapsLoader.load(),
        getCurrentPosition({ enableHighAccuracy: true })
      ])

      const divMap = document.getElementById("map")
      mapRef.current = new Map(divMap, { zoom: 15, center: position })

    })()

  }, []);

  

  return (
    <Grid className={style.root} container>
      <Grid item xs={12} sm={3}>
        <Navbar />
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
              Iniciar uma corrida
            </Button>
          </div>

        </form>
      </Grid>

      <Grid item xs={12} sm={9}>
        <div id="map" className={style.map} />
      </Grid>

    </Grid>
  )
}
