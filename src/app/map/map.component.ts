import 'leaflet.tilelayer.colorfilter';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';
import { AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { Map } from 'leaflet';

import * as barcelona from '../../data/barris.json';

import * as greensites from '../../data/greenSites.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  public map!: Map;
  public currentBarrio: string = '';
  public currentBarrioWeb: string = '';
  appGreenSites: L.Layer[] = [];

  //TEST FILTERS
  //https://xtk93x.github.io/Leaflet.TileLayer.ColorFilter.updateFilter/

  constructor(public cRef: ChangeDetectorRef) {}

  angularIcon = L.icon({
    iconUrl: './assets/event-icon.svg',
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
    console.log(e.target.feature.properties, 'barrios individual');

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
    console.log('highlight feature', e.target.feature.properties.NOM);
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
    console.log(e.target!.getBounds());
    this.map.fitBounds(e.target!.getBounds());
  };

  onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature,
    });
  };

  onMapReady(map: Map) {
    console.log('ON MAP READY', map);
  }

  style = (feature: any) => {
    return {
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
      fillColor: 'rgba(248,144,59, 0.5)',
    };
  };

  greenSiteImg = '../../assets/greenSite_default.jpg';

  getGreenSites() {
    let greenSites = Object.entries(greensites);
    console.log(greenSites, 'green Sites');

    greenSites.forEach((object: any) => {
      const finalObj = object[1];

      if (typeof finalObj.geo_epgs_4326_x === 'string') {
        var content =
          '<div class="time-into-popup"><div class="time"><div class="date">' +
          'date' +
          '</div><div class="day">' +
          finalObj.name +
          '</div></div></div>' +
          '<div class="pict-into-popup"><img class="pict" src="' +
          this.greenSiteImg +
          '"></div>' +
          '<div class="comment-into-popup">' +
          finalObj.addresses_start_street_number +
          '</div>' +
          '<div class="likes-into-popup"><span class="likes-count"><i class="fa fa-heart likes-icon"></i>' +
          finalObj.addresses_district_name +
          '</span></div>';
        return this.appGreenSites.push(
          L.marker(
            [
              parseFloat(finalObj.geo_epgs_4326_x),
              parseFloat(finalObj.geo_epgs_4326_y),
            ],
            { icon: this.angularIcon }
          ).bindPopup(content)
        );
      }
      return null;
    });
    this.layersControl.overlays.GreenSites = L.layerGroup(this.appGreenSites);
  }

  createMarker() {
    return L.marker([42.3947, 2.181], { icon: this.angularIcon }).bindPopup(
      'Custom Angular Marker from Create Marker'
    );
  }

  myMainFilter = ['hue:324deg', 'saturate:250%'];
  myFilter = ['bright:99%', 'hue:226deg', 'saturate:150%'];

  baseLayer1 = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myMainFilter,
    }
  );

  baseLayer2 = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myFilter,
    }
  );

  baseLayer3 = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myFilter,
    }
  );

  myFilter4 = ['invert:100%','grayscale:62%','bright:120%','saturate:398%'];
  myFilter5 =   ['invert:100%','grayscale:6%','bright:149%','hue:216deg','saturate:354%'];
  myFilter6 = ['bright:93%','contrast:103%','hue:335deg','saturate:381%'];

  myFilter7 = ['grayscale:11%','bright:93%','contrast:103%','hue:309deg','saturate:381%'];
  //latest
  myFilter8 =  ['grayscale:11%','hue:307deg'];

  myFilter9 =  ['grayscale:11%','hue:332deg'];

  baseLayer4 = (L.tileLayer as any).colorFilter(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myFilter7,
    }
  );

  baseLayer5 = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    {
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      filter: this.myFilter8,
    }
  );

  tonerLayer = (L.tileLayer as any).colorFilter(
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}',
    {
      maxZoom: 18,
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      filter: this.myMainFilter,
      ext: 'png',
      subdomains: 'abcd',
    }
  );

  options = {
    layers: [this.baseLayer1, this.tonerLayer],
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
  ];

  layersControl = {
    baseLayers: {
      'Open Street Map': this.baseLayer1,
      'WaterColor Map 2': this.baseLayer2,
      'Toner Map': this.baseLayer3,
      'New Map': this.baseLayer4,
      'Latest Map': this.baseLayer5,
    },
    overlays: {
      'Big Circle': L.circle([41.3947, 2.181], { radius: 5000 }),
      'Big Square': L.polygon([
        [41.4, 2.181],
        [41.4, 2.181],
        [41.7, 2.191],
        [41.7, 2.191],
      ]),
      labels: this.tonerLayer,
      Barrios: L.geoJSON(barcelona as any, {
        style: this.style,
        onEachFeature: this.onEachFeature,
      }),
      GreenSites: L.layerGroup(this.appGreenSites),
    },
  };

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

  ngAfterViewInit(): void {
    this.getGreenSites();
    //this.onMapReady(this.map);
    console.log(this, 'this');
  }
}
