const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 480;

const MAP_SIZE = 16;
const TILE_SIZE = 64;
const FOV = Math.PI / 3;
const HALF_FOV = FOV / 2;
const NUM_RAYS = canvas.width;
const STEP_ANGLE = FOV / NUM_RAYS;

const map = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,
    1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,
    1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,
    1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const player = {
    x: 2 * TILE_SIZE,
    y: 2 * TILE_SIZE,
    angle: 0,
    speed: 3,
    turnSpeed: 0.05
};

const keys = {};

window.addEventListener('keydown', (e) => keys[e.code] = true);
window.addEventListener('keyup', (e) => keys[e.code] = false);

function movePlayer() {
    if (keys['ArrowLeft'] || keys['KeyA']) player.angle -= player.turnSpeed;
    if (keys['ArrowRight'] || keys['KeyD']) player.angle += player.turnSpeed;

    const dx = Math.cos(player.angle) * player.speed;
    const dy = Math.sin(player.angle) * player.speed;

    if (keys['KeyW'] || keys['ArrowUp']) {
        const newX = player.x + dx;
        const newY = player.y + dy;
        if (!isWall(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
        const newX = player.x - dx;
        const newY = player.y - dy;
        if (!isWall(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    }
}

function isWall(x, y) {
    const mapX = Math.floor(x / TILE_SIZE);
    const mapY = Math.floor(y / TILE_SIZE);
    return map[mapY * MAP_SIZE + mapX] === 1;
}

function castRays() {
    let rayAngle = player.angle - HALF_FOV;

    for (let i = 0; i < NUM_RAYS; i++) {
        let rayX = player.x;
        let rayY = player.y;

        const cosA = Math.cos(rayAngle);
        const sinA = Math.sin(rayAngle);

        let distance = 0;
        let hitWall = false;

        while (!hitWall && distance < 1000) {
            distance += 1;
            rayX = player.x + cosA * distance;
            rayY = player.y + sinA * distance;

            if (isWall(rayX, rayY)) {
                hitWall = true;
            }
        }

        // Correct for fish-eye effect
        const correctedDistance = distance * Math.cos(rayAngle - player.angle);
        const wallHeight = (TILE_SIZE * canvas.height) / correctedDistance;

        // Draw ceiling
        ctx.fillStyle = '#333';
        ctx.fillRect(i, 0, 1, (canvas.height - wallHeight) / 2);

        // Draw wall
        const color = 255 - (distance / 1000) * 255;
        ctx.fillStyle = `rgb(${color}, 0, 0)`;
        ctx.fillRect(i, (canvas.height - wallHeight) / 2, 1, wallHeight);

        // Draw floor
        ctx.fillStyle = '#666';
        ctx.fillRect(i, (canvas.height + wallHeight) / 2, 1, (canvas.height - wallHeight) / 2);

        rayAngle += STEP_ANGLE;
    }
}

function update() {
    movePlayer();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    castRays();
    requestAnimationFrame(update);
}

update();
