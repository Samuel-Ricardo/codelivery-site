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
