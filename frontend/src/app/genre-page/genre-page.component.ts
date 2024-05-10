import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { Genre, Movie } from 'src/schema/movie';
import { GenresPopupComponent } from '../genres-popup/genres-popup.component';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit {
  genreMovies: Movie[] = [];
  showPopup: boolean = false;
  loading: boolean = false;
  genresList: string[] = [
   'Action',  
   'Adventure', 
   'Animation',
   'Comedy', 
   'Crime', 
   'Documentary', 
   'Drama',  
   'Family',  
   'Fantasy', 
   'Foreign',  
   'History', 
   'Horror',
   'Music', 
   'Mystery', 
   'Romance',  
   'Science Fiction',
   'Thriller', 
   'TV Movie',
   'War', 
   'Western', 
  ];
  genresUrls: string[] = [

    "../../assets/action_genre.jpg",
    "../../assets/adventure_genre.jpg",
    "../../assets/animated_genre.jpg",
    "../../assets/comedy_genre.jpg",
    "../../assets/crime_genre.jpg",
    "../../assets/documentary_genre.jpg",
    "../../assets/drama_genre.jpg",
    "../../assets/family_genre.jpg",
    "../../assets/fantasy_genre.jpg",
    "../../assets/foreign_genre.jpg",
    "../../assets/history_genre.jpg",
    "../../assets/horror_genre_2.jpg",
    "../../assets/musical_genre.jpg",
    "../../assets/mystery_genre.jpg",
    "../../assets/romance_genre.jpg",
    "../../assets/science_fiction_genre.jpeg",
    "../../assets/thriller_genre.jpg",
    "../../assets/tv_movie_genre.jpg",
    "../../assets/war_genre.jpg",
    "../../assets/western_genre.jpg",
  ]
  selectedGenres: string[] = [];
  selectedGenreIndices: number[] = [];

  constructor(private http: HttpClient, private readonly _modalService: ModalService, private router: Router) {}

  ngOnInit(): void {}

  // Update hover colors based on selection or deselection
  genreSelected(index: number) {
    if (this.selectedGenreIndices.findIndex(ind => ind === index) != -1) {
      this.selectedGenreIndices = this.selectedGenreIndices.filter(x => x != index);
      let ele = document.getElementById("genreDiv-" + index) as HTMLDivElement

      if (ele) {
        ele.style.backgroundColor = 'rgba(255, 255, 255, .5)'
        ele.addEventListener('mouseover', () => {
          ele.style.backgroundColor = 'rgba(255, 255, 255, .8)';
      });

      
      ele.addEventListener('mouseout', () => {
        ele.style.backgroundColor = 'rgba(255, 255, 255, .5)'; 
    });

      }
    }

    else {
      this.selectedGenreIndices.push(index);
      let ele = document.getElementById("genreDiv-" + index) as HTMLDivElement
      ele.style.backgroundColor = 'rgba(255, 255, 255, 1)'

    }
  }
  fillGenres(): void {
    this.loading = true;
    console.log(this.selectedGenres);
    this.selectedGenres = this.selectedGenreIndices.map((m) => {

      return this.genresList[m]
    })
    
    const options = { headers: { 'Content-Type': 'application/json' } };

    this.http.post('http://localhost:8080/movies/bygenre/get', JSON.stringify(this.selectedGenres), options).subscribe(
      (moviesList: any) => {
        // Check if moviesList is not null or undefined
        console.log("Returned:")
        console.log(moviesList)
        if (moviesList && moviesList.length) {
          this.genreMovies = [];
          for (let i = 0; i < moviesList.length; i++) {
          const movie: Movie = new Movie(
            moviesList[i].ID,
            moviesList[i].Title,
            moviesList[i].OriginalLanguage,
            moviesList[i].Overview,
            'https://image.tmdb.org/t/p/w500' + moviesList[i].PosterPath,
            moviesList[i].ReleaseDate,
            moviesList[i].RuntimeMinutes,
            moviesList[i].UserScore,
            moviesList[i].Accuracy,
            moviesList[i].UserEntries
          );

          this.genreMovies.push(movie);
          } 
          this.openUserGenres()
        } else {
          console.error('Received null or empty moviesList:', moviesList);
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error('Error retrieving movies by genre:', error);
        if (error.status === 404) {
          alert('Resource not found.');
        } else if (error.status === 403) {
          alert('Forbidden Access to Resource');
        } else if (error.status === 409) {
          alert('Movie already exists. Please try another one.');
        } else if (error.status === 500) {
          alert('Server down.');
        } else if (error.status === 502) {
          alert('Bad gateway.');
        }
      }
    );
  }
  
  public openUserGenres(): void {
    this._modalService.show<Movie[]>(GenresPopupComponent, {
      title: 'Recommended Movies Based on User\'s Favorite Genres',
      type: 'default',
      mode: 'default',
      model: this.genreMovies
    })
  }

  backToMainPage() {
    this.router.navigate(['/']);
  }
}


