import { Injectable } from '@angular/core';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: User;

  setuserData(data: User) {
    this.userData = data;
  }

  getuserData(): User {
    return this.userData;
  }
}
