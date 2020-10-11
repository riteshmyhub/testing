import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogs } from '../model/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  Url = 'http://localhost:3000'
  constructor(private _http: HttpClient) { }

  trackByIdBlogs(Id: number) {
    return this._http.get<Blogs>(`${this.Url}/blogs/${Id}`)
  }

  // get blog
  S_Get_Blogs(): Observable<Blogs[]> {
    return this._http.get<Blogs[]>(`${this.Url}/blogs`)
  }
  // Post blog
  S_Post_Blogs(BlogObj: Blogs): Observable<Blogs[]> {
    return this._http.post<Blogs[]>(`${this.Url}/blogs`, BlogObj, this.HttpPassHeader())
  }
  // Update blog
  S_Update_blogs(BlogObj: Blogs): Observable<number> {
    return this._http.put<number>(`${this.Url}/blogs/${BlogObj.id}`, BlogObj, this.HttpPassHeader())
  }
  // Delete blogs
  S_Delete_Blogs(BlogObj: Blogs): Observable<number> {
    return this._http.delete<number>(`${this.Url}/blogs/${BlogObj}`, this.HttpPassHeader())
  }
  // PassHttpHerder
  HttpPassHeader() {
    let headersHttp = new HttpHeaders().set('content-type', 'application/json')
    let option = {
      headers: headersHttp
    };
    return option;
  }
}
