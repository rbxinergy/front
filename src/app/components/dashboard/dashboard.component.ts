import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  name : string = ''
  initials: string = ''

  version: string = require( '../../../../package.json').version;
  constructor(private authService: AuthService ) {
  }
  
  ngOnInit():void{
    const profile = JSON.parse(sessionStorage.getItem('profile') || '') 
    const firstName = profile.firstName
    const lastName = profile.lastName
    this.name =  `${firstName} ${lastName}`
    this.initials = firstName.charAt(0) + lastName.charAt(0) 
  }
  
  logOut() {
    this.authService.logOut();
  }
}
