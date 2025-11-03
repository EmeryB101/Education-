/**
 * The AI Rhetorician - p5.js Game Engine
 * Twine-style narrative game about rhetorical analysis with AI
 */

// Game state
let gameState = {
    currentNode: null,
    visitedNodes: [],
    stats: {
        integrity: 0,
        understanding: 0,
        efficiency: 0
    },
    history: []
};

// Visual elements
let canvas;
let typewriterIndex = 0;
let typewriterSpeed = 2;
let displayText = "";
let fullText = "";
let choiceButtons = [];
let textY = 100;
let scrollOffset = 0;
let maxScroll = 0;

// Colors (matching CSS)
const colors = {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#f9fafb',
    text: '#1f2937',
    textLight: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
};

// Particle system for effects
let particles = [];

/**
 * p5.js setup function
 */
function setup() {
    // Create canvas
    const container = document.getElementById('game-canvas-container');
    const containerWidth = container.offsetWidth - 40;
    const containerHeight = Math.max(600, window.innerHeight * 0.7);

    canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent('game-canvas-container');

    // Initialize game
    gameState.currentNode = storyData.startNode;
    loadNode(gameState.currentNode);

    // Set text properties
    textFont('Arial');
    textSize(16);
    textAlign(LEFT, TOP);
}

/**
 * p5.js draw function - runs every frame
 */
function draw() {
    background(colors.background);

    // Update typewriter effect
    if (typewriterIndex < fullText.length) {
        typewriterIndex += typewriterSpeed;
        displayText = fullText.substring(0, Math.floor(typewriterIndex));
    }

    // Draw game UI
    drawHeader();
    drawStatsBar();
    drawStoryText();
    drawChoices();
    drawParticles();

    // Draw scroll indicator if needed
    if (maxScroll > 0) {
        drawScrollIndicator();
    }
}

/**
 * Load a story node
 */
function loadNode(nodeId) {
    const node = storyData.nodes[nodeId];

    if (!node) {
        console.error('Node not found:', nodeId);
        return;
    }

    // Update game state
    gameState.currentNode = nodeId;
    gameState.visitedNodes.push(nodeId);
    gameState.history.push(nodeId);

    // Reset typewriter
    fullText = node.text;
    displayText = "";
    typewriterIndex = 0;
    scrollOffset = 0;

    // Clear old choice buttons
    choiceButtons = [];

    // Check if this is an ending
    if (node.isEnding) {
        showEnding(node);
    }
}

/**
 * Draw header with game title
 */
function drawHeader() {
    fill(colors.primary);
    noStroke();
    rect(0, 0, width, 60);

    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text(storyData.title, width / 2, 30);

    textSize(16);
    textAlign(LEFT, TOP);
}

/**
 * Draw stats bar
 */
function drawStatsBar() {
    const barY = 70;
    const barHeight = 40;

    // Background
    fill(255);
    noStroke();
    rect(0, barY, width, barHeight);

    // Stats
    const statWidth = width / 3;
    const statLabels = ['Integrity', 'Understanding', 'Efficiency'];
    const statKeys = ['integrity', 'understanding', 'efficiency'];
    const statColors = [colors.primary, colors.success, colors.accent];

    for (let i = 0; i < 3; i++) {
        const x = i * statWidth + 20;
        const y = barY + 10;
        const statValue = Math.max(0, gameState.stats[statKeys[i]]);

        fill(colors.textLight);
        textSize(12);
        text(statLabels[i] + ': ' + statValue, x, y);

        // Stat bar
        const barWidth = statWidth - 40;
        const barFill = Math.min(barWidth, (statValue / 10) * barWidth);

        fill(240);
        rect(x, y + 15, barWidth, 8, 4);

        fill(statColors[i]);
        rect(x, y + 15, barFill, 8, 4);
    }
}

/**
 * Draw story text with typewriter effect
 */
function drawStoryText() {
    const textX = 40;
    textY = 130;
    const textWidth = width - 80;

    fill(colors.text);
    textSize(18);
    textAlign(LEFT, TOP);

    // Draw text with word wrap
    const words = displayText.split(' ');
    let line = '';
    let y = textY - scrollOffset;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = textWidth(testLine);

        if (testWidth > textWidth && line.length > 0) {
            text(line, textX, y);
            line = words[i] + ' ';
            y += 28;
        } else {
            line = testLine;
        }
    }
    text(line, textX, y);

    // Calculate max scroll
    const textHeight = y + 28 - textY;
    maxScroll = Math.max(0, textHeight - (height - 400));
}

/**
 * Draw choice buttons
 */
function drawChoices() {
    // Only show choices when text is fully displayed
    if (typewriterIndex < fullText.length) {
        return;
    }

    const node = storyData.nodes[gameState.currentNode];

    if (!node || !node.choices || node.choices.length === 0) {
        return;
    }

    const buttonY = height - 60 - (node.choices.length * 60);
    const buttonWidth = width - 80;
    const buttonHeight = 50;
    const buttonX = 40;

    choiceButtons = [];

    for (let i = 0; i < node.choices.length; i++) {
        const choice = node.choices[i];
        const y = buttonY + (i * 60);

        choiceButtons.push({
            x: buttonX,
            y: y,
            width: buttonWidth,
            height: buttonHeight,
            choice: choice
        });

        // Check if mouse is over button
        const isHovered = mouseX >= buttonX &&
            mouseX <= buttonX + buttonWidth &&
            mouseY >= y &&
            mouseY <= y + buttonHeight;

        // Draw button
        fill(isHovered ? colors.primaryDark : colors.primary);
        noStroke();
        rect(buttonX, y, buttonWidth, buttonHeight, 8);

        // Draw button text
        fill(255);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(choice.text, buttonX + buttonWidth / 2, y + buttonHeight / 2);

        // Hover effect
        if (isHovered) {
            cursor(HAND);
        }
    }

    // Reset text alignment
    textAlign(LEFT, TOP);
}

/**
 * Handle mouse clicks
 */
function mousePressed() {
    // Check if any choice button was clicked
    for (let button of choiceButtons) {
        if (mouseX >= button.x &&
            mouseX <= button.x + button.width &&
            mouseY >= button.y &&
            mouseY <= button.y + button.height) {

            // Apply choice impact
            if (button.choice.impact) {
                for (let stat in button.choice.impact) {
                    gameState.stats[stat] += button.choice.impact[stat];
                }
            }

            // Create particles for feedback
            createParticleEffect(button.x + button.width / 2, button.y + button.height / 2);

            // Load next node
            loadNode(button.choice.nextNode);

            cursor(ARROW);
            return;
        }
    }

    // Click anywhere to speed up typewriter
    if (typewriterIndex < fullText.length) {
        typewriterIndex = fullText.length;
    }
}

/**
 * Handle mouse wheel for scrolling
 */
function mouseWheel(event) {
    if (maxScroll > 0) {
        scrollOffset = constrain(scrollOffset + event.delta * 0.5, 0, maxScroll);
        return false; // Prevent page scroll
    }
}

/**
 * Draw scroll indicator
 */
function drawScrollIndicator() {
    fill(colors.textLight);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('↕ Scroll to read more', width / 2, 115);
}

/**
 * Show ending screen
 */
function showEnding(node) {
    // Clear background
    background(colors.background);

    // Draw ending type indicator
    let endingColor = colors.primary;
    let endingEmoji = '🎓';

    if (node.endingType === 'best') {
        endingColor = colors.success;
        endingEmoji = '🌟';
    } else if (node.endingType === 'poor') {
        endingColor = colors.error;
        endingEmoji = '⚠️';
    } else if (node.endingType === 'moderate') {
        endingColor = colors.warning;
        endingEmoji = '📚';
    }

    // Draw ending banner
    fill(endingColor);
    noStroke();
    rect(0, 0, width, 80);

    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(endingEmoji + ' Game Complete!', width / 2, 40);

    // Draw stats summary
    fill(255);
    rect(40, 100, width - 80, 120, 8);

    fill(colors.text);
    textSize(20);
    text('Your Journey Stats', width / 2, 130);

    textSize(16);
    textAlign(LEFT, TOP);
    const statY = 160;
    const statX = 80;

    text('Integrity: ' + gameState.stats.integrity, statX, statY);
    text('Understanding: ' + gameState.stats.understanding, statX + 200, statY);
    text('Efficiency: ' + gameState.stats.efficiency, statX + 400, statY);

    textSize(14);
    text('Nodes visited: ' + gameState.visitedNodes.length, statX, statY + 30);

    // Replay button
    const buttonY = height - 100;
    const buttonWidth = 200;
    const buttonHeight = 50;
    const buttonX = (width - buttonWidth) / 2;

    const isHovered = mouseX >= buttonX &&
        mouseX <= buttonX + buttonWidth &&
        mouseY >= buttonY &&
        mouseY <= buttonY + buttonHeight;

    fill(isHovered ? colors.secondary : colors.secondary);
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 8);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Play Again', width / 2, buttonY + 25);

    if (isHovered) {
        cursor(HAND);
    }

    // Handle replay click
    if (mouseIsPressed && isHovered) {
        resetGame();
    }
}

/**
 * Reset game to beginning
 */
function resetGame() {
    gameState = {
        currentNode: null,
        visitedNodes: [],
        stats: {
            integrity: 0,
            understanding: 0,
            efficiency: 0
        },
        history: []
    };

    particles = [];
    typewriterIndex = 0;
    displayText = "";
    fullText = "";
    choiceButtons = [];
    scrollOffset = 0;

    gameState.currentNode = storyData.startNode;
    loadNode(gameState.currentNode);

    cursor(ARROW);
}

/**
 * Create particle effect
 */
function createParticleEffect(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: x,
            y: y,
            vx: random(-3, 3),
            vy: random(-5, -1),
            life: 60,
            color: color(random([colors.primary, colors.secondary, colors.accent]))
        });
    }
}

/**
 * Update and draw particles
 */
function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // Gravity
        p.life--;

        // Draw
        const alpha = map(p.life, 0, 60, 0, 255);
        fill(red(p.color), green(p.color), blue(p.color), alpha);
        noStroke();
        circle(p.x, p.y, 6);

        // Remove dead particles
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

/**
 * Handle window resize
 */
function windowResized() {
    const container = document.getElementById('game-canvas-container');
    if (container) {
        const containerWidth = container.offsetWidth - 40;
        const containerHeight = Math.max(600, window.innerHeight * 0.7);
        resizeCanvas(containerWidth, containerHeight);
    }
}

// Prevent context menu on canvas
document.addEventListener('contextmenu', event => {
    if (event.target.closest('#game-canvas-container')) {
        event.preventDefault();
    }
});
