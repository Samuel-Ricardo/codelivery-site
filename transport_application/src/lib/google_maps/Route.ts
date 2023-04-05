import { google } from "google-maps";

export class Route {
  public currentMaker: google.maps.Marker;
  public endMaker: google.maps.Marker;
  private directionRenderer: google.maps.DirectionsRenderer;

}
