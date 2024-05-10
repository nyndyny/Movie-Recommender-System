import { HttpClient } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';
// import { ConsoleReporter } from 'jasmine';
import { Movie } from 'src/schema/movie';

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.scss']
})
export class UserRecommendationsComponent {

  @Input() genreMovies: Movie[] = []
  @Input() movie: Movie = this._modalReference.config.model!
  currentGenre: string = ''
  genresList: string[] = ['Animation',
  'Comedy',
  'Family',
  'Adventure',
  'Fantasy',
  'Romance',
  'Drama',
  'Action',
  'Crime',
  'Thriller',
  'Horror',
  'History',
  'Science Fiction',
  'Mystery',
  'Music',
  'Documentary',
  'Western',
  'War',
  'Foreign',
  'TV Movie']

  isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private readonly _modalReference: ModalReference<Movie>) {

    if (localStorage.getItem('UserName') != null)
      this.isLoggedIn = true;
  }
  
  isSignedIn() {
    return localStorage.getItem('UserName') != null;
  }

  ngOnInit() {
  }

  UpdateRecDB(movie: Movie, ratingValue: number) {
    const RatingJSON = {
      UserName: localStorage.getItem('UserName'),
      movieId: movie.ID,
      rating: ratingValue
    };
    console.log(RatingJSON)

    this.http.post('http://localhost:8080/movies/byquiz/rating', JSON.stringify(RatingJSON)).subscribe((moviesList: any)=> {
        if (200) {
          console.log('Rating added successfully!')
        }
      }, (error) => {
        if (error.status === 404) {
          alert('Resource not found.');
        }
        else if (error.status === 403) {
          alert('Forbidden Access to Resource');
        }
        else if (error.status === 500) {
          alert('Server down.');
        }
        else if (error.status === 502) {
          alert('Bad gateway.');
        }
      });
  }

  likeMovie(movie: Movie) {
    // Implement logic to handle liking the movie
    console.log('Liked:', movie.Title);

    // Adding rating into recommendation table
    this.UpdateRecDB(movie, 1);

    // Sending movie ID and score 1 for like
    this.sendUserScore(movie.ID, 1);
  }

  dislikeMovie(movie: Movie) {
    // Implement logic to handle disliking the movie
    console.log('Disliked:', movie.Title);

    // Adding rating into recommendation table
    this.UpdateRecDB(movie, -1);

    // Sending movie ID and score 0 for dislike
    this.sendUserScore(movie.ID, 0);
  }

  
  sendUserScore(movieId: number, score: number) {
    console.log("MOVIE ID: " + movieId)
    let userScore = { 
      "MovieID": movieId, 
      "MovieScore": score 
    };
    console.log('userScoreData:', userScore);
    
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/user/score', JSON.stringify(userScore), options).subscribe(
      (response: any) => {
        console.log('User score recorded successfully:', response);
        this._modalReference.closeSuccess()
      },
      (error) => {
        console.error('Error recording user response:', error);
        // Handle error appropriately (e.g., show error message to user)
      }
    );
  }

  addToFavorites(movie: Movie) {

  }
}
