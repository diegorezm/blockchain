DATABASE = database.sqlite

setup: 
	if [ ! -f $(DATABASE) ]; then \
		echo "Creating database"; \
		touch $(DATABASE); \
	fi
	@echo "Installing dependencies"
	@cd internal/web && pnpm install
	@go mod tidy


build: sqlc api frontend
	@echo "Build complete"

run: build
	@./bin/blockchain

sqlc:
	@sqlc generate

frontend:
	@cd internal/web && pnpm build

api:
	@go build -o bin/blockchain cmd/blockchain/main.go

.PHONY: setup sqlc frontend api build run

