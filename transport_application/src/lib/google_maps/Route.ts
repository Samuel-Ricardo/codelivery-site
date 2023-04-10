export class Route {
  public currentMaker: google.maps.Marker;
  public endMarker: google.maps.Marker;
  public directionRenderer: google.maps.DirectionsRenderer;
  public strokeColor: string | null | undefined

  constructor (options: {
    currentMakerOptions: google.maps.MarkerOptions;
    endMarkerOptions: google.maps.MarkerOptions;
  }){
    
    const {currentMakerOptions,endMarkerOptions} = options;

    this.currentMaker = new google.maps.Marker(currentMakerOptions);
    this.endMarker = new google.maps.Marker(endMarkerOptions) 

    this.strokeColor = (this.currentMaker.getIcon() as google.maps.Symbol).strokeColor;

    this.directionRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: this.strokeColor,
        strokeOpacity: 0.5,
        strokeWeight: 5,
      }
    })
    this.directionRenderer.setMap(this.currentMaker.getMap() as google.maps.Map);
  
    this.calculateRoute();  
  }

  private calculateRoute() {
    
    const currentPosition = this.currentMaker.getPosition() as google.maps.LatLng;

    const endPosition = this.endMarker.getPosition() as google.maps.LatLng;
  
    new google.maps.DirectionsService().route(
      {
        origin: currentPosition,
        destination: endPosition,
        travelMode: google.maps.TravelMode.DRIVING,
      },

      (result, status) => { 
        if (status === "OK") {
          this.directionRenderer.setDirections(result);
          return;
        }
        throw new Error(status);
      }
    );
  }

  delete() {
    this.currentMaker.setMap(null);
    this.endMarker.setMap(null);
    //this.directionsRenderer.setMap(null);
  }

}
