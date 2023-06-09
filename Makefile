.DEFAULT_GOAL := check

init: check_node_version
	@echo "Initialising the project"
	@npm ci

start:
	@echo "Starting project for development"
	@npm run dev

db_start:
	@echo "Starting local DB as a docker container..."
	@bash ./scripts/db_start.sh

db_stop:
	@echo "Stopping local DB as a docker container..."
	@bash ./scripts/db_stop.sh

check: pre_check build test
	@echo "✅"

check_node_version: 
	@bash ./scripts/check_node_version.sh

clean:
	@echo "Cleaning..."
	@npm run clean

clean_all:
	@echo "Clean all"
	@rm -Rf node_modules package-lock.json

test:
	@echo "Testing..."
	@npm run test

build_prod:
	@echo "Building..."
	@bash ./scripts/build_prod.sh

pre_check: check_node_version
	@npm run lint
	@npm run build

build_container_image: check
	@echo "Building docker image paystats-back..."
	@docker build -t paystats-back .
	@docker image ls paystats-back

back_start:
	@echo "Starting paystats-back docker container..."
	@bash ./scripts/back_start.sh

back_stop:
	@echo "Stopping paystats-back docker container..."
	@bash ./scripts/back_stop.sh