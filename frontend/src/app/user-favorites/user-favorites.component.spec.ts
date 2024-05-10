import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UserFavoritesComponent } from './user-favorites.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserFavoritesComponent', () => {
  let component: UserFavoritesComponent;
  let fixture: ComponentFixture<UserFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, UserFavoritesComponent],
      providers: [
        { provide: UserFavoritesComponent, useValue: {} },
        { provide: ModalReference, useValue: {} },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check click for "Save Favorites" button', fakeAsync(() => {
    spyOn(component, 'saveFavorites');
    let saveFavsButton = fixture.debugElement.nativeElement.querySelector('#saveFavs');
    saveFavsButton.click();
    tick();
    expect(component.saveFavorites).toHaveBeenCalled();

  }));
});
