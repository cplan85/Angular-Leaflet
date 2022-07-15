import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  

  private initMap(): void {

  this.map = L.map("map").setView([41.3947, 2.1698], 13);



    var tiles = L.tileLayer("https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

   // this.map = L.map('map', {
  //    center: [ 39.8282, -98.5795 ],
  //    zoom: 3
  //  });
  }
  constructor() { }

  
  ngAfterViewInit(): void {
    this.initMap();
   }
}