import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomUserMovieComponent } from './random-user-movie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RandomUserMovieComponent', () => {
  let component: RandomUserMovieComponent;
  let fixture: ComponentFixture<RandomUserMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomUserMovieComponent ],
      imports: [HttpClientTestingModule, FormsModule, CommonModule, NgSelectModule],
      schemas: [ NO_ERRORS_SCHEMA ],
    
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomUserMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
