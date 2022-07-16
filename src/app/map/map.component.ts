import 'leaflet.tilelayer.colorfilter';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  myFilter = ['bright:99%', 'hue:226deg', 'saturate:150%'];
  options = {
    layers: [
      (L.tileLayer as any).colorFilter(
        'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          filter: this.myFilter,
        }
      ),
    ],
    zoom: 13,
    center: L.latLng(41.390205, 2.154007),
  };

  private initMap(): void {
    // this.map = L.map('map').setView([41.3947, 2.1698], 13);
    // var tiles = (L.tileLayer as any)
    //   .colorFilter(
    //     'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    //     {
    //       maxZoom: 19,
    //       attribution:
    //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //     }
    //   )
    //   .addTo(this.map);
  }
  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
