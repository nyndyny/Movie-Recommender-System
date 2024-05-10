import { Component } from '@angular/core';
import { Router } from '@angular/router'; //new
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { LoginAccountComponent } from '../login-account/login-account.component';
import { QuizComponent } from '../quiz/quiz.component'; //new
import { Movie } from '../../schema/movie'
import { HttpClient } from '@angular/common/http';

export interface User{
  username: string,
  password: string,
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  allMovies: Movie[] = []
  // constructor(private readonly _modalService: ModalService, private http: HttpClient) {

  // }
  constructor(private readonly _modalService: ModalService, private http: HttpClient, private router: Router) {}


  ngOnInit() {
    this.getHundredMovies()
  }

  openSearch(){

  }

  getHundredMovies() {
    
    this.http.get('http://localhost:8080/movies/get/hundred').subscribe((moviesList: any)=> {
      if (200) {
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
