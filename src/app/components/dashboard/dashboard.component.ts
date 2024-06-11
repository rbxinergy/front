import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';



declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  name : string = ''
  initials: string = ''

  version: string = require( '../../../../package.json').version;
  constructor(private authService: AuthService, private translateService: TranslateService ) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode)
    this.translateService.use(languageCode)
  }
  
  ngOnInit():void{
    const profile = JSON.parse(sessionStorage.getItem('profile') || '') 
    const firstName = profile.firstName
    const lastName = profile.lastName
    this.name =  `${firstName} ${lastName}`
    console.log(this.name)
    this.initials = firstName.charAt(0) + lastName.charAt(0) 
  }
  
  logOut() {
    this.authService.logOut();
  }
}
