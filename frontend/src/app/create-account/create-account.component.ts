import { Component } from '@angular/core';
import { ModalReference, ModalService } from '@developer-partners/ngx-modal-dialog';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginAccountComponent } from '../login-account/login-account.component';
import { LoginUser, NewUser } from 'src/schema/movie';

export interface newUser {

  fullName: string,
  username: string,
  password: string,

}
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  title="New User Site";

  constructor(private http: HttpClient, private readonly _modalReference: ModalReference<NewUser>, private readonly _modalService: ModalService) {}

  ngOnInit(){
  }

  createUser(f: NgForm){

    let newFirstName = f.value.firstname
    let newLastName = f.value.lastname
    let newUsername = f.value.username
    let newPassword = f.value.password
  
      let user = {
        "FirstName": newFirstName,
        "LastName": newLastName,
        "UserName": newUsername,
        "Password": newPassword
      };
    
      const options = { headers: { 'Content-Type': 'application/json' } };
      this.http.post('http://localhost:8080/user/create', JSON.stringify(user),options).subscribe((res: any)=> {
        if (200) {
          alert("User Added");
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

  getNewUsers() {

  }

  public newuser: NewUser = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Password: '',
  };

  public cancel(): void {

    this._modalReference.cancel();
  }

  public signUpUser(): void {

    this._modalReference.closeSuccess(this.newuser);
  }
  
  public LoginComp() {
    this._modalService.show<LoginUser>(LoginAccountComponent, {
      title: 'Become a CinemaFusion Member',
      mode: 'disableFullScreen',
      type: 'default',
    })
  }

}


