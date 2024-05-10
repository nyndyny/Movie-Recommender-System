package router

import (
	"backend/movies"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var Router = gin.Default()

// This engine powers serve persistently keeping it running
func PrepareRouter(test bool) *gin.Engine {

	// Only allow origins from the frontend, to avoid malicious attacks
	var config = cors.DefaultConfig()

	// Only allow origins from the frontend, to avoid malicious attacks
	config.AllowOrigins = []string{"http://localhost:4200"}

	// Router should use configurations and origins just set
	Router.Use(cors.New(config))

	//repos := actions.New(test)
	//Router.GET("/ping", actions.Ping)

	//Router.POST("/movies/create", movies.AddMovieTest)
	Router.GET("/movies/get", movies.GetMoviesTest)
	//Router.POST("/movie/add", movies.AddDBMovie)
	//Router.POST("/genre/add", movies.AddDBGenre)
	//Router.POST("/company/add", movies.AddDBCompany)
	Router.GET("/random/movie/get", movies.GetRandomMovie)
	Router.GET("/random/movies/get", movies.GetRandomMovies)
	Router.POST("/movies/bygenre/get", movies.GetMoviesByGenre)
	Router.POST("/movies/byquiz/get", movies.GetMoviesByQuiz)
	Router.POST("/movies/byquiz/rating", movies.UserFeedback)

	Router.POST("/user/score", movies.UserScoresMovie)
	Router.GET("/movies/get/all", movies.GetAllMovies)
	Router.GET("/movies/get/hundred", movies.GetHundredMovies)
	Router.POST("/user/create", movies.SignUpUser)
	Router.POST("/user/login", movies.LoginUser)
	Router.GET("/user/get", movies.GetCurrentUser)
	Router.POST("user/favorites/get", movies.GetUsersFavorites)
	Router.POST("user/favorites/add", movies.AddUsersFavorites)
	return Router
}
