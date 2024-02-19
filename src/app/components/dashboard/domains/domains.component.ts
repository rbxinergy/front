import { Component } from '@angular/core';
import { DomainsService } from 'src/app/shared/services/domains.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css'],
  standalone:true,
  imports:[
    CommonModule
  ]
  
})
export class ConfigsComponent {

  constructor(private domainService: DomainsService){}

  domains: any
  ngOnInit() {
    this.domainService.getDomains().subscribe((data: any) => {
      this.domains = data;
      console.log("Domains",this.domains)
    })
  }


}
