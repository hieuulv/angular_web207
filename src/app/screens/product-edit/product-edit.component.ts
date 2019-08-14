import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { CategoryService } from "../../services/category.service";
import { Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"]
})
export class ProEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cateService: CategoryService
  ) {}

  postid = 0;
  id = 0;
  cates: any = [];

  ngOnInit() {
    this.postid = parseInt(this.route.snapshot.paramMap.get("postid"));
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.productService.getProductId(this.id, this.postid).subscribe(data => {
      this.model.setValue({
        id: data.id,
        name: data.name,
        image: data.image,
        price: data.price,
        detail: data.detail,
        createdAt: data.createdAt,
        categoryId: data.categoryId
      });
    });
    this.cateService.getCategoryList().subscribe(data => (this.cates = data));
  }

  model = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    image: new FormControl("", [Validators.required]),
    price: new FormControl("", [
      Validators.required,
      Validators.pattern("[1-9]{1,}")
    ]),
    detail: new FormControl("", [Validators.required]),
    createdAt: new FormControl("", [Validators.required]),
    categoryId: new FormControl()
  });

  get name() {
    return this.model.get("name");
  }

  get image() {
    return this.model.get("image");
  }

  get price() {
    return this.model.get("price");
  }

  get detail() {
    return this.model.get("detail");
  }

  get createdAt() {
    return this.model.get("createdAt");
  }

  save() {
    if (this.model.valid) {
      // console.log(this.model.value);
      if (this.id != this.model.value.categoryId) {
        this.id = this.model.value.categoryId;
        this.productService
          .removeProduct(this.id, this.model.value.id)
          .subscribe(() => {
            this.productService
              .addProduct(this.id, this.model.value)
              .subscribe(data => {
                console.log(this.model.value);
                this.model.value.name = "";
                this.model.value.image = "";
                this.model.value.price = "";
                this.model.value.detail = "";
                this.model.value.createdAt = "";
                this.router.navigate([`cate-detail/${this.id}`]);
              });
          });
      } else {
        this.productService
          .updateProduct(this.id, this.model.value.id, this.model.value)
          .subscribe(data => {
            console.log(this.model.value);
            this.model.value.name = "";
            this.model.value.image = "";
            this.model.value.price = "";
            this.model.value.detail = "";
            this.model.value.createdAt = "";
            this.router.navigate([`cate-detail/${this.id}`]);
          });
      }
    } else {
      this.validateAllFormFields(this.model); //{7}
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    Object.keys(formGroup.controls).forEach(field => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }
}