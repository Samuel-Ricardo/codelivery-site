#!/bin/bash

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
fi

npm install

# npm start

npm run dev
