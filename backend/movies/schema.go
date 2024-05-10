package movies

// Test schema for movies
type MoviesTest struct {
	Title    string
	Year     uint64
	Genre    string
	Producer string
}

type AddMoviesTest struct {
	Title    string
	Year     uint64
	Genre    string
	Producer string
}

type GetMovieTest struct {
	Title string
}

type DeleteMoviesTest struct {
	Title string
}

type EditMoviesTest struct {
	Title    string
	Year     uint64
	Genre    string
	Producer string
}

type UserScore struct {
	MovieID    uint64
	MovieScore uint64
}

type Movie struct {
	ID               uint64
	Title            string
	OriginalLanguage string
	Overview         string
	PosterPath       string
	ReleaseDate      string
	RuntimeMinutes   uint64
	UserScore        uint64
	Accuracy         float64
	UserEntries      uint64
}

type Genre struct {
	GenreID   uint64
	GenreName string
	MovieID   uint64
}

type ProductionCompany struct {
	CompanyID   uint64
	CompanyName string
	MovieID     uint64
}

type UserGenres struct {
	Genre1 string
	Genre2 string
	Genre3 string
	Genre4 string
	Genre5 string
}

type SignUp struct {
	FirstName string
	LastName  string
	UserName  string
	Password  string
}

type GetUser struct {
	FirstName string
	LastName  string
	UserName  string
	Token     string
}
type Login struct {
	UserName string
	Password string
}
type Favorites struct {
	MovieID  uint
	UserName string
}
type GetFavorites struct {
	UserName string
}
type UserByToken struct {
	Token     string
	FirstName string
	LastName  string
	UserName  string
}

// type MoviesByGenre struct {
// 	UserGenre string
// }
type MoviesByGenre struct {
	UserGenre []string `json:"userGenre"`
}

type MoviesByQuiz struct {
	UserName string
	Weather  string
	Feelings string
	Gender   string
	Age      string
	Time     string
	When     string
}

type MovieFromAI struct {
	UserName         string
	Title            string
	OriginalLanguage string
	Plot             string
	ReleaseDate      string
	Genres           []string
	Runtime          uint64
}

type MovieRating struct {
	MovieID  uint64
	UserName string
	Rating   int64
}
