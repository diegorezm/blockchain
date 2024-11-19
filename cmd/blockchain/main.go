package main

import (
	"fmt"
	"os"

	"github.com/diegorezm/blockchain/internal/web"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
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
