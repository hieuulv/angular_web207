import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Router, ActivatedRoute} from "@angular/router"
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: '../category-edit/category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  constructor(private cateService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }
    model = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    image: new FormControl('',[Validators.required])
  });

  get name() { return this.model.get('name'); }
  get image() { return this.model.get('image'); }

  ngOnInit() {
    let cateId = this.route.snapshot.params.id;
    this.cateService.getCategoryId(cateId)
    .subscribe(data => {
      console.log(data);
      this.model.setValue({
        id: data.id,
        name: data.name,
        image: data.image
      })
    });
  }

  save(){
    if(this.model.valid){
      this.cateService.updateCategory(this.model.value.id,this.model.value)
      .subscribe(data => {
        console.log(this.model.value.id);
        this.model.value.name = ""
        this.model.value.image = ""
        this.router.navigate(['/']);
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