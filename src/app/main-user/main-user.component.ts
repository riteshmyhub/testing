import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent implements OnInit {
  mainUser: any = "";
  moredata: any = "";
  constructor(private _serviceUser: UserService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.Get_Single_User()
  }
  Get_Single_User() {
    // use paramMap for id 
    this.route.paramMap.subscribe((UserParameter: ParamMap) => {
      let id = parseInt(UserParameter.get("id"))

      // subscribe to UserService and put id in method(id)
      this._serviceUser.S_Get_Current_User(id).subscribe(singleUserRes => {
        this.mainUser = singleUserRes['data'],
          this.moredata = singleUserRes['ad']
      })
    })
  }
}
