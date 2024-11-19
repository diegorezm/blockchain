build: frontend
	@cd frontend && pnpm run build
	@go build -o bin/blockchain cmd/blockchain/main.go

run: build
	@./bin/blockchain
