import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserForm} from "../../interfaces/user/user-form";
import {User} from "../../interfaces/user/user";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseURL: string = 'https://instagram-clone-ui-1f83e-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.baseURL + 'users.json').pipe( map((data: any) => {
      let users: User[] = [];
      Object.keys(data).forEach(key => {
        let temp: User = {
          id: key,
          username: data[key].username,
          email: data[key].email,
          name: data[key].name,
          profile: data[key].profile,
          password: data[key].password
        }
        users.push(temp);
      })
      return users;
    } ))
  }

  createUser( user: UserForm): Observable<any> {
    user.posts = false;
    return this.http.post(this.baseURL + 'users.json', user);
  }

  isUser( username: string): Observable<any> {
    return this.getUsers().pipe( map((users: User[])=> {
      let index = users.findIndex( (user: User) => user.username === username)
      return index!==-1;
    }))
  }

  getUserWithUsername( username: string): Observable<any> {
    return this.getUsers().pipe(
      map((users: User[]) => users.find( ( user: User ) => username === user.username))
    );
  }

  getUserWithId( id: string): Observable<any> {
    return this.getUsers().pipe(
      map( (users: User[]) => users.find( (user: User ) => id === user.id))
    );
  }

  uploadProfilePic( userId: string, url: string): Observable<any> {
    return this.http.patch(`${this.baseURL}/users/${userId}.json`, { profile: url  });
  }

}
