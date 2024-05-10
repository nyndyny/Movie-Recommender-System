import { ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';

import { LoginAccountComponent } from './login-account.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('LoginAccountComponent', () => {
  let component: LoginAccountComponent;
  let fixture: ComponentFixture<LoginAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAccountComponent ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: LoginAccountComponent, useValue: {} },
        { provide: ModalReference, useValue: {} },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAccountComponent);
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

  it('should check click for "Sign In" button', fakeAsync(() => {
    spyOn(component, 'saveData').and.callThrough();
    let signInButton = fixture.debugElement.nativeElement.querySelector('#signIn');
    signInButton.click();
    tick();
    expect(component.saveData).toHaveBeenCalled();

  }));

  it('should check click for "Create Account" button', fakeAsync(() => {
    spyOn(component, 'createAccount').and.callThrough();
    let createAcctButton = fixture.debugElement.nativeElement.querySelector('#create');
    createAcctButton.click();
    tick();
    expect(component.createAccount).toHaveBeenCalled();

  }));

});
