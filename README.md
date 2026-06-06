# Doom Clone Web

A simple retro-style Doom-inspired game using a raycasting engine in HTML5 and JavaScript.

## Features
- Real-time raycasting rendering.
- Movement and rotation controls.
- Retro atmosphere.

## How to Run

### Option 1: Bash Script (Linux/macOS)
Run the following command in your terminal:
```bash
./run_game.sh
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 2: Python Script
Run the following command:
```bash
python3 run_game.py
```
This will start the server and attempt to open your default web browser automatically.

### Option 3: Manual Startup
If you have Python installed, you can run:
```bash
python3 -m http.server 8000 --directory doom_clone
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Controls
- **W / Arrow Up**: Move Forward
- **S / Arrow Down**: Move Backward
- **A / Arrow Left**: Turn Left
- **D / Arrow Right**: Turn Right
