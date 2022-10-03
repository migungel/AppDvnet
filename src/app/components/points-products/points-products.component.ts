import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-points-products',
  templateUrl: './points-products.component.html',
  styleUrls: ['./points-products.component.scss']
})
export class PointsProductsComponent implements OnInit {

  @Input() id: string = '';
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() points: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
