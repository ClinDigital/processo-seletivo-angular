import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes.enum';

@Component({
  selector: 'app-secure-area',
  templateUrl: './secure-area.component.html',
  styleUrls: ['./secure-area.component.scss']
})
export class SecureAreaComponent implements OnInit {

  constructor(
    private route: Router,
  ) {}

  logout(){
    localStorage.removeItem('token');
    this.route.navigate([RoutesEnum.HOME]);
  }

  sessionHome() {
    this.route.navigate([RoutesEnum.SESSION_LIST]);
  }

  ngOnInit() {}

}
