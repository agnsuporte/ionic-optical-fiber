import { Component, OnInit } from '@angular/core';

import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private util: UtilService) {}

  ngOnInit() {}

  onRegister(): void {
    this.util.showMessage({
      duration: 4000,
      color: 'warning',
      message: 'Indisponível no Momento',
      position: 'top'
    });
  }
}
