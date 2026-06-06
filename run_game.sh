#!/bin/bash
echo "Starting Doom Clone local server at http://localhost:8000"
python3 -m http.server 8000 --directory doom_clone
