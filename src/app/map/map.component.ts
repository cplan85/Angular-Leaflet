import 'leaflet.tilelayer.colorfilter';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import * as barcelona from '../../data/barris.json';

import * as greensites from '../../data/greenSites.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  public currentBarrio: string ="";
  public currentBarrioWeb: string ="";
  appGreenSites:any[] =[];

  constructor( public cRef: ChangeDetectorRef) {}

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

 

  highlightFeature = (e: any) => {
    const layer = e.target;
    console.log(e.target.feature.properties)


    layer.setStyle({
      weight: 5,
      color: 'rgb(76,70,33)',
      dashArray: '',
      fillOpacity: 0.7,
      fillColor: 'rgba(102,133,13, 0.5)',
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    this.currentBarrio = e.target.feature.properties.NOM;
    this.currentBarrioWeb = e.target.feature.properties.WEB1;
    console.log("highlight feature", e.target.feature.properties.NOM);
    this.cRef.detectChanges();
   

  };

  resetHighlight = (e: any) => {
    const layer = e.target;

    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: 'rgba(248,144,59, 0.5)',
    });
  };

  zoomToFeature = (e: any) => {
    this.map.fitBounds(e.target!.getBounds());
  };

  onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature,
    });
  
  };

  style = (feature: any) => {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: 'rgba(248,144,59, 0.5)',
      // fillColor: 'rgba(248,144,59, 0.5)',
    };
  };

  onMapReady(map: any) {
    console.log("on Map Readya afeae")

    let greenSites = Object.entries(greensites);

    greenSites.forEach((object: any) => {
      return L.marker(
        [
          parseFloat(object.geo_epgs_4326_x),
          parseFloat(object.geo_epgs_4326_y),
        ],
        { icon: this.angularIcon }
      ).addTo(map).bindPopup(`This is ${object.addresses_district_name}
        Address: ${object.addresses_road_name}, ${object.addresses_start_street_number}
        `);
    } );
  }

  getGreenSites() {

    let greenSites = Object.entries(greensites);

    console.log(greenSites, "Green Sites" )
     return greenSites.forEach((object: any) => {
      const finalObj = object[1];

      console.log(typeof finalObj.geo_epgs_4326_x, "objects" )
      if(typeof finalObj.geo_epgs_4326_x === "string") {
      return this.layers.push(L.marker(
        [
          parseFloat(finalObj.geo_epgs_4326_x),
          parseFloat(finalObj.geo_epgs_4326_y),
        ],
        { icon: this.angularIcon }
      ).bindPopup(`This is ${finalObj.addresses_district_name}
        Address: ${finalObj.addresses_road_name}, ${finalObj.addresses_start_street_number}
        `) )
      } return null;
    } );
  }

  
  createMarker() {
   return L.marker([42.3947, 2.181], { icon: this.angularIcon }).bindPopup(
      'Custom Angular Marker from Create Marker'
    )
  }

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
    layer3: L.geoJSON(barcelona as any, {
      style: this.style,
      // onEachFeature: onEachFeature,
    }),
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
      //TURN OFF ON DEFAULT
      // L.geoJSON(barcelona as any, {
      //   style: this.style,
      //   // onEachFeature: onEachFeature,
      // }),
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
    this.createMarker(),
    
   // this.getGreenSites()
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
      Barrios: L.geoJSON(barcelona as any, {
        style: this.style,
        onEachFeature: this.onEachFeature,
      }),
      LayerToModify: L.layerGroup(this.appGreenSites)
      
    },
  };

  //BEgin GEOJSON LOGIC
  getColor(d: number) {
    return d > 70
      ? '#800026'
      : d > 60
      ? '#BD0026'
      : d > 50
      ? '#E31A1C'
      : d > 30
      ? '#FC4E2A'
      : d > 20
      ? '#FD8D3C'
      : d > 10
      ? '#FEB24C'
      : d > 0
      ? '#FED976'
      : '#FFEDA0';
  }

  private initMap(): void {}

  ngAfterViewInit(): void {
    this.getGreenSites();
    this.onMapReady(this.map);
  }
}
