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

  myMainFilter = ['hue:324deg', 'saturate:250%'];
  myFilter = ['bright:99%', 'hue:226deg', 'saturate:150%'];
  options = {
    layers: [
      (L.tileLayer as any).colorFilter(
        'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          filter: this.myMainFilter,
        }
      ),
      (L.tileLayer as any).colorFilter(
        'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}',
        {
          maxZoom: 18,
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          filter: this.myMainFilter,
          ext: 'png',
          subdomains: 'abcd',
        }
      ),
    ],
    zoom: 13,
    center: L.latLng(41.390205, 2.154007),
  };

  private initMap(): void {}
  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
