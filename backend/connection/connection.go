package connection

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var Db *sql.DB
var Ctx context.Context

var JwtKey = []byte("secret_key_yall")

func OpenConn() {
	// Must have ENV file with connection properties
	godotenv.Load()

	// Capture connection properties.
	cfg := mysql.Config{
		User:                 os.Getenv("CINEMA_FUSION_DB_USERNAME"),
		Passwd:               os.Getenv("CINEMA_FUSION_DB_PASSWORD"),
		Net:                  "tcp",
		Addr:                 os.Getenv("CINEMA_FUSION_DB_ADDRESS"),
		DBName:               os.Getenv("CINEMA_FUSION_DB_NAME"),
		AllowNativePasswords: true,
	}
	// Get a database handle.
	var err error

	// Open the database connection
	Db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	//conn, err := Db.Conn(Ctx)

	//fmt.Println(conn)
	// Ping Database
	pingErr := Db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected to Database Successfully!")

}
