export class Movie {
    ID: number;
    Title:  string;
    OriginalLanguage:  string;
    Overview:  string;
    PosterPath:  string;
    ReleaseDate:  string;
    RuntimeMinutes:  number;
    UserScore: number;
    Accuracy:  number;
    UserEntries: number;
  
    constructor(id: number, title: string, language: string, overview: string, 
      posterpath: string, releasedate: string, runtime: number, userscore: number, accuracy: number,
      entries: number) {
      this.ID = id;
      this.Title = title;
      this.OriginalLanguage = language;
      this.Overview = overview;
      this.PosterPath = posterpath;
      this.ReleaseDate = releasedate;
      this.RuntimeMinutes = runtime;
      this.UserScore = userscore;
      this.Accuracy = accuracy;
      this.UserEntries = entries;
    }
}

export interface User{
    
    FirstName: string;
    LastName: string;
    Username: string,
}

export interface NewUser{
    FirstName: string;
    LastName: string;
    UserName: string,
    Password: string,
}
export interface LoginUser{
    
    UserName: string,
    Password: string,
}
export interface User{
    
    username: string,
    password: string,
}



export interface UserFavorites {
    UserName: string
    MovieID: number

}
export class Genre {

    GenreID: number;
    GenreName: string;
    MovieID: number;

    constructor(gID: number, gName: string, movieID: number) {
        this.GenreID = gID;
        this.GenreName = gName;
        this.MovieID = movieID;
    }
}

export var allMovies: Movie[] = [];
export class ProductionCompany {

    CompanyID: number;
    CompanyName: string;
    MovieID: number;

    constructor(cID: number, cName: string, movieID: number) {
        this.CompanyID = cID;
        this.CompanyName = cName;
        this.MovieID = movieID;
    }
}