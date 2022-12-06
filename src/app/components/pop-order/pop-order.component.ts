import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-order',
  templateUrl: './pop-order.component.html',
  styleUrls: ['./pop-order.component.scss']
})
export class PopOrderComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PopOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loadData(data);
  }

  order_id: string = '';
  order: string = '';
  type_id: string = '';
  type: string = '';
  date: string = '';
  date_execute: string = '';

  ngOnInit(): void {
  }

  loadData(data:any){
    this.order_id = data.order_id;
    this.order = data.order;
    this.type_id = data.type_id;
    this.type = data.type;
    this.date = data.date;
    let date_exe: string = data.date_execute;
    if (date_exe){
      //date_exe = date_exe.toString().split("T")[0] + " T:" + date_exe.toString().split("T")[1];
      date_exe = date_exe.replace("T"," ");
    }
    this.date_execute = date_exe;
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
