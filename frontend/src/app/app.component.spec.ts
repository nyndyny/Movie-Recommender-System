import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let h3: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h3 = fixture.nativeElement.querySelector('h3');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Movie Site'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Movie Site');
  });

  it('should render title CINEMA FUSION', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('CINEMA FUSION');
  });

  it('should check click for "Profile" button', () => {
    spyOn(component, 'openProfile');
    component.openProfile();
    expect(component.openProfile).toHaveBeenCalled();

  });

  it('should check click for "Favorites" button', () => {
    spyOn(component, 'openUserFavorites');
    component.openUserFavorites();
    expect(component.openUserFavorites).toHaveBeenCalled();

  });

  it('should check click for "Search Movie Info" button', () => {
    spyOn(component, 'openSearch');
    component.openSearch();
    expect(component.openSearch).toHaveBeenCalled();

  });

  it('should check click for "Sign Out" button', () => {
    spyOn(component, 'SignOut');
    component.SignOut();
    expect(component.SignOut).toHaveBeenCalled();

  });

  it('should check click for "Login/Create Account" button', () => {
    spyOn(component, 'openUserAccount');
    component.openUserAccount();
    expect(component.openUserAccount).toHaveBeenCalled();

  });

  it('should display current date', () => {
    expect(h3.textContent).toContain(component.currentDate);
  });
});
