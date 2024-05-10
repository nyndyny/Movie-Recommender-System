import { Component, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Genre, Movie, User, UserFavorites, allMovies } from '../schema/movie'
import { ProductionCompany } from '../schema/movie'
import { NgSelectComponent } from '@ng-select/ng-select';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { LoginAccountComponent } from './login-account/login-account.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { Router } from '@angular/router';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';
import { ProfileComponent } from './profile/profile.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie Site';
  name: string = ""
  currentDate: string = '';
  //allMovies: MovieTest[] = []
  selectedMovie: Movie | null = null;
  //@Input() allMovies: Movie[] = []
  constructor(private readonly _modalService: ModalService, private http: HttpClient, private router: Router) {
    
  }
  ngOnInit() {
    this.setCurrentDate();
    this.getAllMovies()

  }
  isSignedIn() {
    if (localStorage.getItem('UserName') != null) {

      if (localStorage.getItem('FirstName'))
        this.name = (localStorage.getItem('FirstName')!)

      return true;

    }

    else
      return false;
  }

  SignOut() {
    localStorage.clear()
    this.router.navigateByUrl("/")
  }
  ngOnChanges(simpleChange: SimpleChanges) {
    /*if (simpleChange['allMovies']) {
      this.allMovies = simpleChange['allMovies'].currentValue
    }*/
  }
  movieSelected() {
    //this.selectedMovie = movie
    //this.allMovies = [...this.allMovies]
    console.log("Selected")
    console.log(this.selectedMovie?.Title)
  }
  getHundredMovies() {
    
    this.http.get('http://localhost:8080/movies/get/hundred').subscribe((moviesList: any)=> {
      if (200) {
        allMovies.splice(0);
        for (let i = 0; i < moviesList.length; i++) {
          
          let movie: Movie = new Movie(moviesList[i].ID, moviesList[i].Title, moviesList[i].OriginalLanguage,
            moviesList[i].Overview,"https://image.tmdb.org/t/p/w500" + moviesList[i].PosterPath, moviesList[i].ReleaseDate,
            moviesList[i].RuntimeMinutes, moviesList[i].UserScore, moviesList[i].Accuracy,
            moviesList[i].UserEntries)

          allMovies.push(movie)
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

  getAllMovies() {
    
    this.http.get('http://localhost:8080/movies/get/all').subscribe((moviesList: any)=> {
      if (200) {
        allMovies.splice(0)
        for (let i = 0; i < moviesList.length; i++) {
          
          let movie: Movie = new Movie(moviesList[i].ID, moviesList[i].Title, moviesList[i].OriginalLanguage,
            moviesList[i].Overview,"https://image.tmdb.org/t/p/w500" + moviesList[i].PosterPath, moviesList[i].ReleaseDate,
            moviesList[i].RuntimeMinutes, moviesList[i].UserScore, moviesList[i].Accuracy,
            moviesList[i].UserEntries)

          if (movie.Title !== '')
          allMovies.push(movie)
        }
        console.log("ALL MOVIES LENGTH: " + allMovies.length)
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

  public openUserFavorites(): void {
    this._modalService.show<UserFavorites>(UserFavoritesComponent, {
      title: localStorage.getItem('FirstName') + '\'s Favorite Movies',
      type: 'default',
      mode: 'default',
    })
  }
  public openUserAccount(): void {

    this._modalService.show<User>(LoginAccountComponent, {
      title: 'Login / Create Account',
      type: 'default',
      mode: 'default',
    })

  }

  public openSearch(): void {

    this.getAllMovies()
    this._modalService.show<Movie>(MovieOverviewComponent, {
      title: 'CinemaFusion Search',
      type: 'default',
      mode: 'default',
      
    })
    

  }

  public openProfile(): void {

    this._modalService.show<User>(ProfileComponent, {
      title: localStorage.getItem('FirstName') + '\'s Profile',
      type: 'default',
      mode: 'default',
    })

  }

  setCurrentDate(): void {
    const today = new Date();
    this.currentDate = today.toDateString();
  }
  /*
  addMovie(f: NgForm) {

    let title = f.value.title
    let year = f.value.year
    let genre = f.value.genre
    let producer = f.value.producer

    console.log(title)

    let movieTest = {
      "Title": title,
      "Year": year,
      "Genre": genre,
      "Producer": producer
    };
  
    const options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/movies/create', JSON.stringify(movieTest),options).subscribe((res: any)=> {
      if (200) {
        alert("Successful Movie Addition to database");
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

  getMovies() {

    // Gets All Movies In Database, stores them in allMovies variable
    this.http.get('http://localhost:8080/movies/get').subscribe((data: any) =>{

      for (let i = 0; i < data.length; i++) {
          let m = new MovieTest(data[i].Title, data[i].Year, data[i].Genre, data[i].Producer)
          this.allMovies.push(m)

        }
      }
    )
  }

  addAllMovies() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    let movies: Movie[] = []
    //console.log("HELLO")
    fileInput.addEventListener('change', () => {
      //console.log("HELLO AGAIN")
      var file = fileInput.files![0];
      if (file) {
          const fileReader = new FileReader();
          fileReader.onload = async () => {
          const bookdata= fileReader.result as string;
          //console.log(bookdata.length)
          let allData = bookdata.split("\r\n")
        for (let i = 0; i < allData.length; i++) {

           await this.parseMovie(allData[i])
  
          //movies.push(m)
        }
        
        /*for (let g = 0; g < movies.length; g++) {
          let Movie =
          {
            "TitleType": movies[g].TitleType,
            "Title": movies[g].Title,
            "OriginalTitle": movies[g].OriginalTitle,
            "Year": movies[g].Year,
            "Runtime": movies[g].Runtime,
            "Genre": movies[g].Genre
          }
          this.http.post('http://localhost:8080/movie/add', JSON.stringify(Movie),options).subscribe((res: any)=> {
      if (200) {
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
        }*//*
          };
          fileReader.readAsText(file);
      }
    });
        
            let options = { headers: { 'Content-Type': 'application/json' } };

    
  }
*/
/*
  async parseMovie(mString: string) {
    let mJSONDetails = mString.split(';')

    for (let i = 0; i < mJSONDetails.length; i++) {
      console.log("DETAIL #" + i + ": " + mJSONDetails[i])
    }
    
    // Genres JSON is in this variable
    let JSONgenres = mJSONDetails[0];

    // Movie first details needs to be split here
    let movieDetails1 = mJSONDetails[1].split(',')
    //console.log("DETAILS: " + movieDetails1)
    // Companies JSON is in this variable
    let JSONcompanies = mJSONDetails[4]

    // Movie Second Details needs to be split here
    let movieDetails2 = mJSONDetails[5].split(',');
    let id = parseInt(movieDetails1[0])
    let language = movieDetails1[1]
    let overview = mJSONDetails[2]
    let posterpath = mJSONDetails[3]
    let releasedate = movieDetails2[0]
    let runtime = parseInt(movieDetails2[1])
    let title = movieDetails2[2]
    
    let dateString = new Date(releasedate).toISOString()
   let m = new Movie(id, title, language, overview,
    posterpath, dateString, runtime, 0, 0.00, 0)

    //console.log("DATE: " + dateString)
    JSONgenres = JSONgenres.replaceAll(/"/g, '')
    JSONgenres = JSONgenres.replaceAll(/'/g, '"')
    let allGenres: { id: number, name: string }[] = JSON.parse(JSONgenres)

    JSONcompanies = JSONcompanies.replaceAll(/"/g, '')
    JSONcompanies = JSONcompanies.replaceAll(/'/g, '"')
    let allCompanies: { id: number, name: string }[] = JSON.parse(JSONcompanies)
    
    let GenresList: Genre[] = []
    let CompaniesList: ProductionCompany[] = []
    for (let g = 0; g < allGenres.length; g++) {
      let newGenre = new Genre(allGenres[g].id, allGenres[g].name, id)
      GenresList.push(newGenre)
    }

    
    for (let c = 0; c < allCompanies.length; c++) {
      let newCompany = new ProductionCompany(allCompanies[c].id, allCompanies[c].name, id)
      CompaniesList.push(newCompany)
    }
    //console.log(CompaniesList)
    try {
      await this.addMovieToDB(m, GenresList, CompaniesList)
    
      await this.addGenresToDB(GenresList)
    await this.addCompaniesToDB(CompaniesList)

    }
    catch {
      
    }
    /*
    console.log("ID: " + id)
    console.log("TITLE: " + title)
    console.log("OVERVIEW: " + overview)
    console.log("Poster Path: " + posterpath)
    console.log("Runtime: " + runtime)
    console.log("LANGUAGE: " + language)
    console.log("RELEASE DATE: " + releasedate)
    console.log("GENRES: " + JSONgenres)
    console.log("COMPANIES: " + JSONcompanies)
    
  }*/
/*
 async addMovieToDB(movie: Movie, GenresList: Genre[], CompaniesList: ProductionCompany[]) {

    let newMovie = {
      "ID": movie.ID,
      "Title": movie.Title,
      "OriginalLanguage": movie.OriginalLanguage,
      "Overview": movie.Overview,
      "PosterPath": movie.PosterPath,
      "ReleaseDate": movie.ReleaseDate,
      "RuntimeMinutes": movie.RuntimeMinutes,
      "UserScore": movie.UserScore,
      "Accuracy": movie.Accuracy
    }
    let options = { headers: { 'Content-Type': 'application/json' } };
    this.http.post('http://localhost:8080/movie/add', JSON.stringify(newMovie),options).subscribe((res: any)=> {
      if (200) {
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

  async addGenresToDB(genres: Genre[]) {
    
    for (let i = 0; i < genres.length; i++) {
        
      let newGenre = {
        "GenreID": genres[i].GenreID,
        "GenreName": genres[i].GenreName,
        "MovieID": genres[i].MovieID,
      }
      let options = { headers: { 'Content-Type': 'application/json' } };
      this.http.post('http://localhost:8080/genre/add', JSON.stringify(newGenre),options).subscribe((res: any)=> {
        if (200) {
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

  async addCompaniesToDB(companies: ProductionCompany[]) {
      
    for (let i = 0; i < companies.length; i++) {
        
      let newCompany = {
        "CompanyID": companies[i].CompanyID,
        "CompanyName": companies[i].CompanyName,
        "MovieID": companies[i].MovieID,
      }
      let options = { headers: { 'Content-Type': 'application/json' } };
      this.http.post('http://localhost:8080/company/add', JSON.stringify(newCompany),options).subscribe((res: any)=> {
        if (200) {
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
  */
  getRandomMovie() {

    let options = { headers: { 'Content-Type': 'application/json' } };
      this.http.post('http://localhost:8080/random/movie/get',options).subscribe((res: any)=> {
        if (200) {
          console.log(res)
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