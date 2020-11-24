import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {AngMaterialModule} from "../ang-material/ang-material.module";


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AngMaterialModule
  ]
})
export class SharedModule { }
