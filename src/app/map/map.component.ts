import 'leaflet.tilelayer.colorfilter';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  angularIcon = L.icon({
    iconUrl: './assets/angular-icon.svg',
    shadowUrl: './assets/leaf-shadow.png',
    //alt: 'Angular',

    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  myMainFilter = ['hue:324deg', 'saturate:250%'];
  myFilter = ['bright:99%', 'hue:226deg', 'saturate:150%'];

  baseLayers = {
    layer1: (L.tileLayer as any).colorFilter(
      'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
      {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        filter: this.myMainFilter,
      }
    ),
    layer2: (L.tileLayer as any).colorFilter(
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
  };
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

  layers = [
    L.circle([41.3947, 2.381], { radius: 5000 }),
    L.polygon([
      [41.3947, 2.281],
      [41.3947, 2.481],
      [42.3947, 2.481],
    ]),
    L.marker([41.3947, 2.181], { icon: this.angularIcon }).bindPopup(
      'Custom Angular Marker'
    ),
  ];

  layersControl = {
    baseLayers: {
      'Open Street Map': (L.tileLayer as any).colorFilter(
        'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        { maxZoom: 18, attribution: '...', filter: this.myMainFilter }
      ),
      'WaterColor Map 2': (L.tileLayer as any).colorFilter(
        'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
        { maxZoom: 18, attribution: '...', filter: this.myFilter }
      ),
    },
    overlays: {
      'Big Circle': L.circle([41.3947, 2.181], { radius: 5000 }),
      'Big Square': L.polygon([
        [41.4, 2.181],
        [41.4, 2.181],
        [41.7, 2.191],
        [41.7, 2.191],
      ]),
      labels: (L.tileLayer as any).colorFilter(
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
    },
  };

  private initMap(): void {}
  constructor() {}

  ngAfterViewInit(): void {}
}
