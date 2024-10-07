import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
declare var require: any;

interface Client {
  name: string;
  companies: Company[];
}

interface Company {
  name: string;
}

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
  clientName: string = '';
  permittedModules: any[] = [];

  clients: Client[] = [
    {
      name: 'Cencosud',
      companies: [
        { name: 'Paris' },
        { name: 'Santa Isabel' },
        { name: 'Shopping Centers' }
      ]
    },
    {
      name: 'Antofagasta Minerals',
      companies: [
        { name: 'Minera los Pelambres' },
        { name: 'Minera Centinela' },
        { name: 'Minera Escondida' },
        { name: 'Minera El Tesoro' },
        { name: 'Minera Zaldívar' },
        { name: 'Minera Andina' }
      ]
    }
  ];

  selectedCompany: string | null = null;
  selectByDefault: boolean = false;

  constructor(private authService: AuthService, private translateService: TranslateService,
    private observer: BreakpointObserver, private router: Router) {
    const userLang = navigator.language || 'es';
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode)
    this.translateService.use(languageCode)
  }
  
  ngOnInit():void{
    this.permittedModules = JSON.parse(sessionStorage.getItem('modules') || '[]');
    const profile = JSON.parse(sessionStorage.getItem('profile') || ''); 
    const firstName = profile.firstName
    const lastName = profile.lastName
    this.name =  `${firstName} ${lastName}`
    this.clientName = sessionStorage.getItem('clientName') || '';
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
    this.router.navigate(['login']);
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

  onCompanySelect(companyName: string, event: Event): void {
    this.selectedCompany = companyName;
    this.selectByDefault = false;
    event.stopPropagation();
  }
  
  hasModule(module: string): boolean {
    return this.permittedModules.find(item => item.module === module)
  }
}





