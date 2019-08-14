import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./screens/home/home.component";
import {CateDetailComponent} 
from "./screens/cate-detail/cate-detail.component";
import {CategoryAddComponent} 
from "./screens/category-add/category-add.component";
import {CategoryEditComponent} 
from "./screens/category-edit/category-edit.component";			
import {ProductAddComponent} 
from "./screens/product-add/product-add.component";			
import {ProEditComponent} 
from "./screens/product-edit/product-edit.component";					


const routes: Routes = [
{
	path: "",
	component: HomeComponent
},
{
	path: "category/add",
	component: CategoryAddComponent
},
{
	path: "edit-cate/:id",
	component: CategoryEditComponent
},
{
	path: "cate-detail/:id",
	component: CateDetailComponent
},
{
	path: "add-product/:id",
	component: ProductAddComponent
},
{
	path: "cate/:id/edit-product/:postid",
	component: ProEditComponent
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }