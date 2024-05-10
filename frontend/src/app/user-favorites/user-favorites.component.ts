import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Movie, UserFavorites, allMovies } from 'src/schema/movie';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { NgForm, ReactiveFormsModule , FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-user-favorites',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,	NgSelectModule, CommonModule],
  templateUrl: './user-favorites.component.html',
  styleUrl: './user-favorites.component.scss'
})
export class UserFavoritesComponent {
  @Input() allMovies: Movie[] = allMovies;
  @Input() favorites: Movie[] = []
  @Input() column1Movies: Movie[] = []
  @Input() column2Movies: Movie[] = []
  @Input() column3Movies: Movie[] = []
  @Input() column4Movies: Movie[] = []
  @Input() column5Movies: Movie[] = []
  @Input() favoriteMovies: Movie[] = []
  col1Movie: Movie | null = null
  usersFavorites: UserFavorites [] = []
  constructor(private http: HttpClient, private readonly _modalReference: ModalReference<UserFavorites>, private readonly _modalService: ModalService) {
    
  }

  ngOnInit() {
    this.getFavorites()
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (simpleChange['allMovies']) {
      this.allMovies = simpleChange['allMovies'].currentValue
    }
    if (simpleChange['favoriteMovies']) {
      this.favoriteMovies = simpleChange['favoriteMovies'].currentValue
    }
  }
  getFavorites() {
    let User = {
      UserName: localStorage.getItem('UserName')!
    }
    this.http.post('http://localhost:8080/user/favorites/get', JSON.stringify(User)).subscribe((moviesList: any)=> {
      if (200) {
        this.favoriteMovies.splice(0)
        for (let i = 0; i < moviesList.length; i++) {
          
          let movie: Movie = new Movie(moviesList[i].ID, moviesList[i].Title, moviesList[i].OriginalLanguage,
            moviesList[i].Overview,"https://image.tmdb.org/t/p/w500" + moviesList[i].PosterPath, moviesList[i].ReleaseDate,
            moviesList[i].RuntimeMinutes, moviesList[i].UserScore, moviesList[i].Accuracy,
            moviesList[i].UserEntries)

          this.favoriteMovies.push(movie)
            console.log(movie)
        }
        
        this.favoriteMovies = [...this.favoriteMovies]
        //alert("Successful Movie Addition to database");
        
      }
      }, (error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        }
        else if (error.status === 403) {
          alert('Forbidden Access to Resource');
        }
        else if (error.status === 409) {
          alert('Movie already exists. Please try another one.');
        }
        else if (error.status === 500) {
          alert('Server down.');
        }
        else if (error.status === 502) {
          alert('Bad gateway.');
        }
      }
      
    );
  }

  addFavorites() {

  }

  movieSelected() {
    console.log(this.favoriteMovies)
  }

  saveFavorites() {

    // send favorite movies
    this.usersFavorites.splice(0)
    let uname = localStorage.getItem('UserName')! 
    for (let i = 0; i < this.favoriteMovies.length; i++) {
      let uFave : UserFavorites = {
        UserName: uname,
        MovieID: this.favoriteMovies[i].ID
      }
      this.usersFavorites.push(uFave)
    }
    const options = { headers: { 'Content-Type': 'application/json' } };
      this.http.post('http://localhost:8080/user/favorites/add', JSON.stringify(this.usersFavorites),options).subscribe((favorites)=> {
        if (200) {
          alert("Favorites Added");
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
  }


}
