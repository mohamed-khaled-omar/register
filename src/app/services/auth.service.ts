import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

   currentUser:BehaviorSubject<any>=new BehaviorSubject(null);

  baseServerUrl='https://localhost:44390/api/';

  jwtHelperService=new JwtHelperService(); 

  registerUser(user: any[])
  {
    return this.http.post(this.baseServerUrl+'User/CreateUser',
    {
       FirstName:user[0],
       LastName:user[1],
       Email:user[2],
       Mobile:user[3],
       Gender:user[4],
       Pwd:user[5]
    },
  {
    responseType:'text',
  });
 
  }
  loginUser(loginInfo: any[])
  {
    return this.http.post(this.baseServerUrl+'User/LoginUser',
    {
      
       Email:loginInfo[0],
       Pwd:loginInfo[1]
    },
  {
    responseType:'text',
  });
  }
  setToken(token:string)
     {
      localStorage.setItem("access_token",token);
      this.loadCurrentUser();
     }
     loadCurrentUser()
     {
      const token=localStorage.getItem("access_token");
      const userInfo =token != null ? this.jwtHelperService.decodeToken(token):null;
      console.log(userInfo);
    }
    isLoggedin():boolean
    {
      return localStorage.getItem("access_token") ?true :false;
    }
    
 removeToken()
 {
  localStorage.removeItem("access_token");
 }    
}

