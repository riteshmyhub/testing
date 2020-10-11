import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../service/blogs.service';
import { Blogs } from '../model/blogs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  popup_info: boolean = false;//model

  localform: FormGroup;
  blogs: Blogs[];
  updateID = null;
  constructor(private _serviceBlogs: BlogsService, private FB: FormBuilder, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.localform = this.FB.group({
      title: ["", [Validators.required]]
    })
    this.C_Get_Blogs()
  }

  submitForm() {
    let output = this.localform.value
    console.log(output);
    this.C_Post_Blogs(output)
    this.localform.reset()
  }
  // ______get Blogs______________
  C_Get_Blogs() {
    this._serviceBlogs.S_Get_Blogs().subscribe(res => {
      this.blogs = res
    })
  }
  // _________post blogs_________
  C_Post_Blogs(userObj: Blogs) {
    if (this.updateID == null) {
      this._serviceBlogs.S_Post_Blogs(userObj).subscribe(res => {
        this.C_Get_Blogs()
      })
    } else {
      // _________Update blogs_________
      userObj.id = this.updateID;
      this._serviceBlogs.S_Update_blogs(userObj).subscribe(res => {
        this.C_Get_Blogs()
        this.updateID = null
      })
    }

  }
  // take id for ngFor=>blog() for update 
  editBlog(BlogID: number) {
    this._serviceBlogs.trackByIdBlogs(BlogID).subscribe(res => {
      this.updateID = BlogID;
      this.localform.controls["title"].setValue(res.title)
    })
  }
  // _________delete blogs_________
  C_delete_Blogs(BlogID) {
    if (this.popup_info) {

    }
  }
  openDialog(BlogID) {
    let dialogRef = this._dialog.open(DialogComponent, {
      width: '450px',
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result) {
        this._serviceBlogs.S_Delete_Blogs(BlogID).subscribe(res => {
          this.C_Get_Blogs()
        })
      }
    })
  }

}
