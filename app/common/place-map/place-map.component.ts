import {Component, OnInit, Input, Inject, ElementRef} from 'angular2/core';
import {NgStyle} from 'angular2/common';

let tpl = require('./place-map.template.html');
let style = require('./place-map.css');

@Component({
  selector: 'place-map',
  template: tpl,
  styles: [style],
  directives: [NgStyle]
})

export class PlaceMapComponent implements OnInit {
  @Input()
  private place:string;
  @Input()
  private isHeader:boolean;

  private region:string;
  private markerPosition:any = {};
  private mapImage:any;
  private element:ElementRef;

  constructor(@Inject(ElementRef) element) {
    this.element = element;
  }

  ngOnInit():void {
    let img = new Image();
    let mapImage = this.isHeader ? this.element.nativeElement.querySelector('.map+.map') :
      this.element.nativeElement.querySelector('.map');

    img.onload = () => {
      this.mapImage = mapImage;

      if (!this.isHeader) {
        this.drawMarker(this.place, this.mapImage);
      }
    };

    img.src = mapImage.src;
  }

  ngOnChanges(changes) {
    if (!this.isHeader) {
      return;
    }

    if (this.mapImage && changes.place.currentValue) {
      this.drawMarker(changes.place.currentValue, this.mapImage);
    }
  }

  drawMarker(place, mapImage):void {
    let stepTop;
    let stepRight;
    let widthOfMap = mapImage.offsetWidth;
    let heightOfMap = mapImage.offsetHeight;
    let greenwich = widthOfMap * 0.437;
    let equator = heightOfMap * 0.545;

    if (place.lat > 0) {
      stepTop = equator / 75;
    } else {
      stepTop = (heightOfMap - equator) / 75;
    }

    if (place.lng < 0) {
      stepRight = greenwich / 130;
    } else {
      stepRight = (widthOfMap - greenwich) / 158;
    }

    let markerTop = equator - place.lat * stepTop - 5 + 'px';
    let markerLeft = place.lng * stepRight + greenwich - 6 + mapImage.offsetLeft + 'px';

    this.markerPosition = {top: markerTop, left: markerLeft};
    this.region = place.region.toLowerCase();
  }
}
