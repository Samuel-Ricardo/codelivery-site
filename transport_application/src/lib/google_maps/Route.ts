import { google } from "google-maps";

export class Route {
  public currentMaker: google.maps.Marker;
  public endMaker: google.maps.Marker;
  private directionRenderer: google.maps.DirectionsRenderer;

  constructor (options: {
    currentMakerOptions: google.maps.ReadonlyMarkerOptions;
    endMarkerOptions: google.maps.ReadonlyMarkerOptions;
  }){
    
    const {currentMakerOptions,endMarkerOptions} = options;

    this.currentMaker = new google.maps.Marker(currentMakerOptions);
    this.endMaker = new google.maps.Marker(endMarkerOptions) 

    const strokeColor = (this.currentMaker.getIcon() as google.maps.ReadonlySymbol).strokeColor;

    this.directionRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor,
        strokeOpacity: 0.5,
        strokeWeight: 5,
      }
    })
    this.directionRenderer.setMap(this.currentMaker.getMap() as google.maps.Map);
  }
}
