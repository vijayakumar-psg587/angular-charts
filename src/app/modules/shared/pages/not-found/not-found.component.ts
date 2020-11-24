import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {APP_CONST} from "../../constants/app.constants";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  data: any;
  no_data_found_message: string;
  display_vertical:boolean = true;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.data = 'no-data-found-icon';
    this.matIconRegistry.addSvgIcon(
      'no-data-found-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./../../../../../assets/icons/no-data-found.svg')
    );
    this.no_data_found_message = APP_CONST.MESSAGES.NO_DATA_FOUND;
  }
}
