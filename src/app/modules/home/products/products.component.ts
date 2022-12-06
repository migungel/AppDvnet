import { ServicesService } from './../../../core/services/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private service: ServicesService,
  ) {}

  contracts: Array<any> = [];
  contracts_agreement: Array<any> = [];

  ngOnInit(): void {
    this.service.verifyToken().subscribe(
      res => {
        this.dataPartner(res);
      }
    );
  }

  dataPartner(data: any){
    this.service.getData(data).subscribe(
      res => {
        //console.log(res);
        this.contracts = res;
      }
    );
  }

  select(value: string) {
    this.contracts_agreement = [];
    if (value) {
      //console.log(value);
      this.service.getProducts(value).subscribe(
        res => {
          if (res) {
            this.compare_products(res);
          }
        }
      );
    }
  }

  compare_products(products: any){
    this.service.getAllProducts().subscribe(
      res => {
        let product: any = {};
        for (const [key, value] of Object.entries(res)){
          product = {
            'type_product': key,
            'name': 'Sin servicio',
            'new_products': this.loadAllProductsByCompany(res[key], products),
          }
          for (let prod of products){
            let list: Array<any> = [];
            if ( key.toString() == prod.type_product ) {
              product.name = prod.name;
              for (let nproduct of res[prod.type_product]) {
                if ( prod.company_id == nproduct.company && parseInt(prod.value_serv) < parseInt(nproduct.valor) ) {
                  list.push(nproduct);
                }
              }
              product.new_products = list;
            }
            //let product = {
            //  'company_id': c.company_id,
            //  'type_service': c.type_service,
            //  'name': c.name,
            //  'date_start': c.date_start,
            //  'date_end': c.date_end,
            //  'company_id_serv': c.company_id_serv,
            //  'value_serv': c.value_serv,
            //  'medida': c.medida,
            //  'type_product': c.type_product,
            //}
          }
          this.contracts_agreement.push(product);
        }
      }
    );
  }

  loadAllProductsByCompany(res: any, products: any): Array<any> {
    let listAll: Array<any> = [];
    for (let nproduct of res) {
      if ( products && products[0].company_id == nproduct.company ) {
        listAll.push(nproduct);
      }
    }
    return listAll;
  }

}
