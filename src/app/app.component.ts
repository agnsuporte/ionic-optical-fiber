import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogged: boolean;

  public appPages = [
    { title: 'Projetos', url: '/project', icon: 'prism' },
    { title: 'Redes', url: '/app/network', icon: 'git-compare' },
  ];

  public labels = ['Alexandre Gomes'];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.isLogged = this.auth.isLoggedIn();
    this.auth.loggedUser.subscribe((data) => (this.isLogged = data));
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
