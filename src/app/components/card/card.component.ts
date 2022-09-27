import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() name: string = '';
  @Input() canton: string = '';
  @Input() direccion: string = '';
  @Input() estado: string = '';
  @Input() saldoPagar: string = '';
  @Input() ultraPuntos: string= '';

  constructor() { }

  ngOnInit(): void {
  }

}
