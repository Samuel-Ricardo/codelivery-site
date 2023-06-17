#!/bin/bash

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
fi

npm install --legacy-peer-deps

# npm start

npm run dev
