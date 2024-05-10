import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOverviewComponent } from './movie-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieOverviewComponent', () => {
  let component: MovieOverviewComponent;
  let fixture: ComponentFixture<MovieOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MovieOverviewComponent, FormsModule],
      providers: [
        { provide: MovieOverviewComponent, useValue: {} },
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
