import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateAccountComponent } from './create-account.component';
import { ModalModule, ModalReference } from '@developer-partners/ngx-modal-dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountComponent ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: CreateAccountComponent, useValue: {} },
        { provide: ModalReference, useValue: {} },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check click for "Cancel" button', fakeAsync(() => {
    spyOn(component, 'cancel');
    let cancelButton = fixture.debugElement.nativeElement.querySelector('#cancel');
    cancelButton.click();
    tick();
    expect(component.cancel).toHaveBeenCalled();

  }));

  it('should check click for "Sign Up" button', fakeAsync(() => {
    spyOn(component, 'signUpUser');
    let signUpButton = fixture.debugElement.nativeElement.querySelector('#signUp');
    signUpButton.click();
    tick();
    expect(component.signUpUser).toHaveBeenCalled();

  }));

  it('should check click for "Login" button', fakeAsync(() => {
    spyOn(component, 'LoginComp');
    let loginButton = fixture.debugElement.nativeElement.querySelector('#login');
    loginButton.click();
    tick();
    expect(component.LoginComp).toHaveBeenCalled();

  }));

});
