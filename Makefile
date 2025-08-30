CONFIG_FILE := local.yaml
BACKEND_CMD  := $(shell yq '.services.backend.command' $(CONFIG_FILE))
FRONTEND_CMD := $(shell yq '.services.frontend.command' $(CONFIG_FILE))

.PHONY: dev dev-backend dev-frontend 

.DEFAULT_GOAL := help

//open two different terminal windows and run these commands to start the backend and frontend servers

dev-backend: //run this command to start the backend server .... make dev-backend
	@echo "--> Executing command: $(BACKEND_CMD)"
	$(BACKEND_CMD)

dev-frontend: //run this command to start the frontend server .... make dev-frontend
	@echo "--> Executing command: $(FRONTEND_CMD)"
	$(FRONTEND_CMD)

// --Varun