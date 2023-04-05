import { google } from "google-maps";
import { Route } from "./Route";

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
}
