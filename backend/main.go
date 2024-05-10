package main

import (
	"backend/connection"
	"backend/movies"
	"backend/router"
)

func main() {

	connection.OpenConn()
	movies.AddMovieTable()
	// Creates Movies DB
	router.PrepareRouter(true).Run()
}
