.PHONY: build-local
build-local:
	docker compose -f docker/local/docker-compose.yml build

.PHONY: start-local
start-local:
	docker compose -f docker/local/docker-compose.yml up -d

.PHONY: stop-local
stop-local:
	docker compose -f docker/local/docker-compose.yml down

.PHONY: build-dev
build-dev:
	docker compose -f docker/development/docker-compose.yml build

.PHONY: start-dev
start-dev:
	docker compose -f docker/development/docker-compose.yml up -d

.PHONY: stop-dev
stop-dev:
	docker compose -f docker/development/docker-compose.yml down

.PHONY: build-prod
build-prod:
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-prod
start-prod:
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-prod
stop-prod:
	docker compose -f docker/production/docker-compose.yml down
