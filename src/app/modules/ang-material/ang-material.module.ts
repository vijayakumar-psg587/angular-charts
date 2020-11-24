import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_MATERIAL_MODULES} from "./constants/material-module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MAT_MATERIAL_MODULES
  ],
  exports: [...MAT_MATERIAL_MODULES],
})
export class AngMaterialModule { }
