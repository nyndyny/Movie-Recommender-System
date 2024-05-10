import { Component } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NewUser } from 'src/schema/movie';
import { Router } from '@angular/router';

export interface User {
  username: string,
  password: string,
}
@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss']
})
export class LoginAccountComponent {

  title="Login Site";
  allLogins: LoginTest[] = []

  constructor(private http: HttpClient, private readonly _modalReference: ModalReference<User>, private readonly _modalService: ModalService,
    private router: Router) {
    
  }

  ngOnInit(){
  }

  isSignedIn() {
    
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

  getLogins() {

  }


  public user: User = {
    username: '',
    password: '',
  };


  public createAccount(): void {
    
    this._modalService.show<NewUser>(CreateAccountComponent, {
      title: 'Become a CinemaFusion Member',
      mode: 'disableFullScreen',
      type: 'default',
    })
  }

  public cancel(): void {

    this._modalReference.cancel();
  }

  public saveData(): void {

    this._modalReference.closeSuccess(this.user);
  }

}

class LoginTest {
  LoginUsername: string;
  LoginPassword: string;

  constructor(loginUsername:string, loginPassword:string) {
    this.LoginUsername=loginUsername;
    this.LoginPassword=loginPassword;
  }

}
