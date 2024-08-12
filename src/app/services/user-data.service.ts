import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: User;

  setuserData(data: User) {
    console.log("USER DATA:", data);
    this.userData = data;
  }

  getuserData(): User {
    console.log(this.userData);
    return this.userData;
  }
}
