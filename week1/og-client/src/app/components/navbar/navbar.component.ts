import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(@Inject('auth') private authService: AuthService) { }
  public userName = '';
  public title = 'COJ';

  ngOnInit() {

  }
  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

}
