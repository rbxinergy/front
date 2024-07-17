import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';


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
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= false;
  isCollapsed = false;

  constructor(private authService: AuthService, private translateService: TranslateService, private observer: BreakpointObserver ) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode)
    this.translateService.use(languageCode)
  }
  
  ngOnInit():void{
    const profile = {firstName: 'Juan', lastName: 'Perez'} // JSON.parse(sessionStorage.getItem('profile') || ''); 
    const firstName = profile.firstName
    const lastName = profile.lastName
    this.name =  `${firstName} ${lastName}`
    console.log(this.name)
    this.initials = firstName.charAt(0) + lastName.charAt(0) 
    this.observer.observe(['(max-width: 900px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  
  logOut() {
    this.authService.logOut();
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
  
}





