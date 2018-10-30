import { Injectable } from '@angular/core';
import {UserDTO} from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  selectedUser: UserDTO = new UserDTO();
}
