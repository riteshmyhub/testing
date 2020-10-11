import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './curd/blogs/blogs.component';
import { MainUserComponent } from './main-user/main-user.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: 'blogs', component: BlogsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: MainUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
