import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  constructor() { }

  products = [
    {
      id: '1',
      name: 'producto 1',
      description: 'descripcion del producto numero 1',
      points: '100'
    },
    {
      id: '2',
      name: 'producto 2',
      description: 'descripcion del producto numero 2',
      points: '120'
    },
    {
      id: '3',
      name: 'producto 3',
      description: 'descripcion del producto numero 3',
      points: '210'
    },
    {
      id: '4',
      name: 'producto 4',
      description: 'descripcion del producto numero 4',
      points: '1000'
    }
  ]

  ngOnInit(): void {
  }

}
