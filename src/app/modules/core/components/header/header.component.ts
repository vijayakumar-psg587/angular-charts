import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerTitle: string;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.headerTitle = 'Angular - Charts';
  }

  get showAccount(): boolean {
    return true;
  }
}
