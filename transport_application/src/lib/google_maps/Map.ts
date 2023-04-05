import { Route } from "./Route";

export class Map {
  public map: google.maps.Map;
  private routes: {[id: string]: Route} = {};

 cosntructor(element: Element, options: google.maps.MapOptions){
    this.map = new google.maps.Map(element, options);
  } 
}
