import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.BaseURL;
  constructor(private http: HttpClient) { }
  // for fach all user 
  S_Get_Users(page:number) {
    return this.http.get(`${this.url}/api/users?page=${page}`)
  }
  // Get users's user
  S_Get_Current_User(ID: number) {
    return this.http.get(`${this.url}/api/users/${ID}`)
  }
}
