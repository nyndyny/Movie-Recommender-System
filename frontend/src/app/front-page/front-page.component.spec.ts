import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageComponent } from './front-page.component';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check click for "Take a Chance" button', () => {
    spyOn(component, 'openRandomRecommendations');
    component.openRandomRecommendations();
    expect(component.openRandomRecommendations).toHaveBeenCalled();

  });

  it('should check click for "Choose by Genre" button', () => {
    spyOn(component, 'openGenreRecommendations');
    component.openGenreRecommendations();
    expect(component.openGenreRecommendations).toHaveBeenCalled();

  });
});
