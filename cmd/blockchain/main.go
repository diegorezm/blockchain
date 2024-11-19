package main

import (
	"fmt"
	"os"

	"github.com/diegorezm/blockchain/frontend"
	_ "github.com/joho/godotenv/autoload"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "${status} ${method} ${uri} ${latency_human}\n",
	}))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	frontend.RegisterHandlers(e)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%s", port)))
}
