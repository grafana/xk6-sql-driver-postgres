WORKFLOW        ?= .github/workflows/k6-ci.yml
K6_CI_REF       := $(shell grep -oE 'grafana/k6-ci/[^@[:space:]]+@[A-Za-z0-9._/-]+' $(WORKFLOW) | head -n1 | cut -d@ -f2)
LINT_CONFIG_URL := https://raw.githubusercontent.com/grafana/k6-ci/$(K6_CI_REF)/.golangci.yml
LINT_CONFIG     ?= .golangci.yml

all: lint test build example

$(LINT_CONFIG): $(WORKFLOW)
	curl -fsSL $(LINT_CONFIG_URL) -o $@

lint: $(LINT_CONFIG)
	go run github.com/golangci/golangci-lint/v2/cmd/golangci-lint@$$(head -n1 $(LINT_CONFIG) | tr -d '# ') \
	  run --config=$(LINT_CONFIG) ./...

test: *.go testdata/*.js
	go test -count 1 ./...

build: k6

k6: *.go go.mod go.sum
	xk6 build --with github.com/grafana/xk6-sql@latest --with github.com/grafana/xk6-sql-driver-postgres=.

example: k6
	./k6 run examples/example.js

.PHONY: lint test all example
