package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/diegorezm/blockchain/internal/web"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	_ "github.com/mattn/go-sqlite3"
)

func initDB() *sql.DB {
	db, err := sql.Open("sqlite3", "./database.sqlite")

	if err != nil {
		log.Fatal(err)
	}

	db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			password TEXT NOT NULL
		);
	`)
	return db
}

func main() {
	db := initDB()
	defer db.Close()

	env := os.Getenv("ENV")

	if env == "" {
		env = "development"
	}

	e := echo.New()

	if env == "development" {
		e.Debug = true
		e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
			Format: "${status} ${method} ${uri} ${latency_human}\n",
		}))
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	web.RegisterHandlers(e)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
