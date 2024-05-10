import { Component } from '@angular/core';
import { User } from 'src/schema/movie';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  allLogins: LoginTest[] = []
  firstName: string = ""
  lastName: string = ""
  userName: string = ""
  constructor(private http: HttpClient, private router: Router) {
    
  }

  ngOnInit(){
  }

  isSignedIn() {

    if (localStorage.getItem('UserName') != null) {

      if (localStorage.getItem('FirstName') && localStorage.getItem('LastName') && localStorage.getItem('UserName'))
        this.firstName = (localStorage.getItem('FirstName')!)
        this.lastName = (localStorage.getItem('LastName')!)
        this.userName = (localStorage.getItem('UserName')!)

      return true;

    }

    else
      return false;
    
  }
  loginUser(f: NgForm){

    let loginUsername = f.value.username
    let loginPassword = f.value.password

    let loginUser = {
      "UserName": loginUsername,
      "Password": loginPassword,
    }

    
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/user/login', JSON.stringify(loginUser),options).subscribe((res: any)=> {
      if (200) {
        localStorage.setItem('Token', res.Token)
        localStorage.setItem('UserName', res.UserName)
        localStorage.setItem('FirstName', res.FirstName)
        localStorage.setItem('LastName', res.LastName)
        this.router.navigateByUrl("/frontPage")
        /*
        this.http.get('http://localhost:8080/user/get').subscribe((currentUser: any)=> {
          if (200) {
            localStorage.setItem('user_token', currentUser.j)
          }
        })*/
      }
      }, (error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        }
        else if (error.status === 403) {
          alert('Forbidden Access to Resource');
        }
        else if (error.status === 409) {
          alert('Username already exists. Please try another one.');
        }
        else if (error.status === 500) {
          alert('Server down.');
        }
        else if (error.status === 502) {
          alert('Bad gateway.');
        }
      }
    );


  };

}

class LoginTest {
  LoginUsername: string;
  LoginPassword: string;

  constructor(loginUsername:string, loginPassword:string) {
    this.LoginUsername=loginUsername;
    this.LoginPassword=loginPassword;
  }

}
