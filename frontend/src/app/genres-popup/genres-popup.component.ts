import { Component, Input } from '@angular/core';
import { Movie } from 'src/schema/movie';
import { ModalReference } from "@developer-partners/ngx-modal-dialog";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-genres-popup',
  templateUrl: './genres-popup.component.html',
  styleUrl: './genres-popup.component.scss'
})
export class GenresPopupComponent {
  @Input() genres: Movie[] = []
  
  constructor(private http: HttpClient, private readonly _modalReference: ModalReference<Movie[], string[]>) {
    this.genres = this._modalReference.config.model!;
  }

  isSignedIn() {
    return localStorage.getItem('UserName') != null;
  }
  
  likeMovie(movie: Movie) {
    // Implement logic to handle liking the movie
    console.log('Liked:', movie.Title);
    // Sending movie ID and score 1 for like
    this.sendUserScore(movie.ID, 1);
  }

  dislikeMovie(movie: Movie) {
    // Implement logic to handle disliking the movie
    console.log('Disliked:', movie.Title);
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
      },
      (error) => {
        console.error('Error recording user response:', error);
        // Handle error appropriately (e.g., show error message to user)
      }
    );
  }

  
}
