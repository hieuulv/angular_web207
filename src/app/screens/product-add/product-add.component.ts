import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CategoryService} from '../../services/category.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  cateId = "0";
  constructor(private productService: ProductService,
          private route : ActivatedRoute,
          private cateService : CategoryService,
          private router: Router) { }
  model = new FormGroup({
    'name': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
    'image': new FormControl('', [
        Validators.required,

      ]),
    'detail': new FormControl('', [
        Validators.required,
        Validators.maxLength(200)
      ]),
    'price': new FormControl('', [
        Validators.required
      ])

  });
  categories = [];
    ngOnInit() {
    this.cateId = this.route.snapshot.paramMap.get('id');
    this.cateService.getCategoryList()
    .subscribe((data) => {
      this.categories = data;
    });
  }

  get name() { return this.model.get('name'); }
  get image() { return this.model.get('image'); }
  get detail() { return this.model.get('detail'); }
  get price() { return this.model.get('price'); }
  // get cateid(){ return this.model.get('cateid'); }

  save(){
    if(this.model.valid){
      this.productService.addProduct(this.cateId,this.model.value)
            .subscribe(data => {
              console.log(data);
              this.model.value.name = ""
              this.model.value.image = ""
              this.model.value.detail = ""
              this.router.navigate(['cate-detail/'+this.cateId]);
            })
    }else{
      this.validateAllFormFields(this.model); //{7}
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

}