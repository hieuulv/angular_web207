import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cate-detail',
  templateUrl: './cate-detail.component.html',
  styleUrls: ['./cate-detail.component.css']
})
export class CateDetailComponent implements OnInit {

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }
  cateId: String = "0";
  products = [];
  ngOnInit() {
    this.cateId = this.route.snapshot.paramMap.get('id');
    this.productService.getListProduct(this.cateId).subscribe((data)=>{
      this.products = data;
     
    });
  }

  removeProduct(product){
    if (confirm("Ban co muon xoa khong") == true) {
      this.productService.removeProduct(this.cateId, product.id)
        .subscribe((data) => {
          this.products = this.products.filter(
            (item) => item.id != product.id
          )
        });
      } else {
        
      }
    
  }

}
