import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { UserRecommendationsComponent } from '../user-recommendations/user-recommendations.component';
import { Genre, Movie } from 'src/schema/movie';
import { RandomUserMovieComponent } from '../random-user-movie/random-user-movie.component';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  currentDate: string = '';

  constructor(private router: Router,private readonly _modalService: ModalService) { }

  ngOnInit(): void {
    this.setCurrentDate();
  }
  
  isSignedIn() {
    if (localStorage.getItem('UserName') != null) 
      return true;

    else
      return false;
  }

  setCurrentDate(): void {
    const today = new Date();
    this.currentDate = today.toDateString();
  }

  public openRandomRecommendations(): void {
    this._modalService.show<Movie>(RandomUserMovieComponent, {
      title: 'Random Movie Recommendations',
      type: 'default',
      mode: 'default',
    })
  }

  public openGenreRecommendations(): void {
    
    this._modalService.show<Genre, Movie>(UserRecommendationsComponent, {
      title: 'Movie Recommendations by Genre',
      type: 'default',
      mode: 'default',

    })
  }
}

