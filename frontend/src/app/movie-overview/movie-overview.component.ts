import { Component, Input } from '@angular/core';
import { Movie, allMovies } from '../../schema/movie'
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrl: './movie-overview.component.scss',
  standalone: true,
  imports: [FormsModule, NgSelectModule, CommonModule],
})
export class MovieOverviewComponent {

  allMovies: Movie[] = allMovies;

  constructor(private http: HttpClient){

  }

  selectedMovies: Movie[] = []

  ngOnInit() {
    this.getAllMovies()
  }

  getAllMovies() {

    //console.log("ALL MOVIES LENGTH: " + allMovies.length)
    this.http.get('http://localhost:8080/movies/get/all').subscribe((moviesList: any)=> {
      if (200) {
    this.allMovies.splice(0)
        for (let i = 0; i < moviesList.length; i++) {
          
          let movie: Movie = new Movie(moviesList[i].ID, moviesList[i].Title, moviesList[i].OriginalLanguage,
            moviesList[i].Overview, moviesList[i].PosterPath, moviesList[i].ReleaseDate,
            moviesList[i].RuntimeMinutes, moviesList[i].UserScore, moviesList[i].Accuracy,
            moviesList[i].UserEntries)

          this.allMovies.push(movie)
        }
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

}
