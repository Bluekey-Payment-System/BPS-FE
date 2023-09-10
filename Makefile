.PHONY: build-dev
build-dev:
	docker compose -f docker-compose.dev.yaml build

.PHONY: start-dev
start-dev: ## Start the development docker container.
	docker compose -f docker-compose.dev.yaml up -d

.PHONY: stop-dev
stop-dev: ## Stop the development docker container.
	docker compose -f docker-compose.dev.yaml down