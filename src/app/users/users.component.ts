import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // ------------pagination-------------
  users: Array<any>;
  private page: number = 0;
  public TotalPages: Array<number>;
  // ---------------------------------
  constructor(private _serviceUser: UserService, private _router: Router, private _route: ActivatedRoute) {
    this.users = new Array<any>()
  }
  // --------------pagination method
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.C_Get_Users()

    this.usersUrl(i, '/users') // optional
  }

  // all user method call in ngOnInit
  ngOnInit(): void {
    this.C_Get_Users()
  }
  // get all user from service
  C_Get_Users() {
    this._serviceUser.S_Get_Users(this.page).subscribe(res => {
      // user data
      this.users = res['data']
      // this length of page
      this.TotalPages = new Array(res['total_pages'])
    })
  }
  // Get Current User from service
  C_Get_Current_User(userObj) {
    this._router.navigate(['user', userObj.id])
  }

  usersUrl(paraNum, path) {
    this._route.queryParams.subscribe(
      parameters => this.page = parameters['page'] ? parameters['page'] : 1
    )
    this._router.navigate([`${path}`], { queryParams: { page: paraNum } })
  }
}
