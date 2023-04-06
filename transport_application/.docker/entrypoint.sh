#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env.local
fi

npm install

# npm start

npm run dev
