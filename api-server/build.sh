#!/bin/bash

# Build script for Raspberry Pi or any Linux system

echo "Building blog API server..."

# Download dependencies
go mod download

# Build for current architecture
go build -o blog-api main.go

echo "Build complete! Binary: ./blog-api"
echo ""
echo "To run: ./blog-api"
echo "To set port: PORT=3000 ./blog-api"
