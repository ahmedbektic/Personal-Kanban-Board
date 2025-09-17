#!/bin/bash

echo "Setting up Personal Kanban Board..."
echo

echo "Installing root dependencies..."
npm install

echo
echo "Installing client dependencies..."
cd client
npm install

echo
echo "Installing server dependencies..."
cd ../server
npm install

echo
echo "Setup complete!"
echo
echo "To start the application:"
echo "  Development: npm run dev"
echo "  Client only: npm run client"
echo "  Server only: npm run server"
echo
