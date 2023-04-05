import { google } from "google-maps";
import { Route } from "./Route";
import { RouteAlredyExistsError } from "@/errors";

export class Map {
  public map: google.maps.Map;
  private routes: {[id: string]: Route} = {};

 cosntructor(element: Element, options: google.maps.MapOptions){
    this.map = new google.maps.Map(element, options);
  } 

  moveCurrentMarker(id: string, position: google.maps.LatLngLiteral) {
    this.routes[id].currentMaker.setPosition(position)
  }

  removeRoute(id: string) {
    const route = this.routes[id];
    route.delete();
    delete this.routes[id];
  }

  addRoute(
    id: string,
    routeOptions: {
      currentMarkerOptions: google.maps.ReadonlyMarkerOptions;
      endMarkerOptions: google.maps.ReadonlyMarkerOptions;
    }
  ) {

    if (id in this.routes) throw new RouteAlredyExistsError();

    const {currentMarkerOptions, endMarkerOptions} = routeOptions;

    this.routes[id] = new Route({
      currentMakerOptions: {...currentMarkerOptions, map: this.map},
      endMarkerOptions: {...endMarkerOptions, map: this.map}
    })

    this.fitBounds();
  }

  private fitBounds() {
    const bounds = new google.maps.LatLngBounds();
    
    Object.keys(this.routes).forEach((id:string) => {
  
      const route = this.routes[id];

      bounds.extend(route.currentMaker.getPosition() as any);
      bounds.extend(route.endMarker.getPosition() as any);

    })
  
    this.map.fitBounds(bounds)
  }
}
