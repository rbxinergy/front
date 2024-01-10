import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetprofileService } from 'src/app/shared/services/getprofile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  // userProfile = new Array<any>();
  userProfile = new Object();
  
  constructor(private authService: AuthService, private getProfileService:GetprofileService ) {
    
  }
  ngOnInit():void{
    // this.getProfileService.getUserProfile().subscribe((data)=>{
    //   this.userProfile = data
    //   console.log(this.userProfile)
    //   console.log(Object.values(this.userProfile))
    // })
  }
  
  logOut() {
    this.authService.logOut();
    console.log('logout fue')
  }
}
