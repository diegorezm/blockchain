setup:
	@cd internal/web && pnpm install
	@go mod tidy

frontend:
	@cd internal/web && pnpm build

api:
	@go build -o bin/blockchain cmd/blockchain/main.go

build: api frontend

run: build
	@./bin/blockchain
