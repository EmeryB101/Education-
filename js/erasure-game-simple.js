/**
 * SIMPLE Erasure Poem Game - Minimal Version That Works
 */

// The poem text
const POEM = `Make me a grave where'er you will,
In a lowly plain, or a lofty hill;
Make it among earth's humblest graves,
But not in a land where men are slaves.

I could not rest if around my grave
I heard the steps of a trembling slave;
His shadow above my silent tomb
Would make it a place of fearful gloom.

I could not rest if I heard the tread
Of a coffle gang to the shambles led,
And the mother's shriek of wild despair
Rise like a curse on the trembling air.

I could not sleep if I saw the lash
Drinking her blood at each fearful gash,
And I saw her babes torn from her breast,
Like trembling doves from their parent nest.

I'd shudder and start if I heard the bay
Of bloodhounds seizing their human prey,
And I heard the captive plead in vain
As they bound afresh his galling chain.

If I saw young girls from their mother's arms
Bartered and sold for their youthful charms,
My eye would flash with a mournful flame,
My death-paled cheek grow red with shame.

I would sleep, dear friends, where bloated might
Can rob no man of his dearest right;
My rest shall be calm in any grave
Where none can call his brother a slave.

I ask no monument, proud and high,
To arrest the gaze of the passers-by;
All that my yearning spirit craves,
Is bury me not in a land of slaves.`;

// Game state
let selectedWords = [];
let explanation = '';

/**
 * MAIN FUNCTION - Opens the game
 */
function startErasureGame() {
    // Reset
    selectedWords = [];
    explanation = '';

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'erasure-overlay';
    overlay.innerHTML = `
        <style>
            #erasure-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 99999;
                overflow-y: auto;
                padding: 20px;
            }
            .erasure-close {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ef4444;
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 30px;
                cursor: pointer;
                z-index: 100000;
            }
            .erasure-content {
                max-width: 1200px;
                margin: 0 auto;
                background: #1a1a1a;
                padding: 40px;
                border-radius: 12px;
            }
            .erasure-title {
                color: #a855f7;
                font-size: 2.5rem;
                text-align: center;
                margin-bottom: 20px;
            }
            .erasure-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin: 30px 0;
            }
            .poem-box {
                background: white;
                color: black;
                padding: 20px;
                border-radius: 8px;
                line-height: 2;
                font-size: 1.1rem;
            }
            .word-click {
                cursor: pointer;
                padding: 2px 4px;
                border-radius: 3px;
                transition: all 0.2s;
            }
            .word-click:hover {
                background: rgba(168, 85, 247, 0.3);
            }
            .word-selected {
                background: #a855f7;
                color: white;
                font-weight: bold;
            }
            .preview-box {
                background: #2a2a2a;
                color: #a855f7;
                padding: 20px;
                border-radius: 8px;
                min-height: 200px;
                font-size: 1.3rem;
                line-height: 2;
            }
            .explain-box {
                width: 100%;
                padding: 15px;
                font-size: 1rem;
                border-radius: 8px;
                border: 2px solid #a855f7;
                background: #2a2a2a;
                color: white;
                margin: 20px 0;
            }
            .btn {
                background: linear-gradient(135deg, #a855f7, #06b6d4);
                color: white;
                border: none;
                padding: 15px 40px;
                font-size: 1.2rem;
                border-radius: 8px;
                cursor: pointer;
                margin: 10px;
            }
            .btn:hover {
                transform: scale(1.05);
            }
            .btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .results {
                color: white;
            }
            .poem-card {
                background: #2a2a2a;
                padding: 20px;
                margin: 15px 0;
                border-radius: 8px;
                border: 2px solid #a855f7;
            }
            h3 { color: #06b6d4; }
        </style>

        <button class="erasure-close" onclick="document.getElementById('erasure-overlay').remove()">×</button>

        <div class="erasure-content">
            <div id="game-screen"></div>
        </div>
    `;

    document.body.appendChild(overlay);
    showSelectionScreen();
}

/**
 * SCREEN 1: Word Selection
 */
function showSelectionScreen() {
    const words = POEM.split(/(\s+)/);
    const wordsHTML = words.map((word, index) => {
        if (word.trim() === '') return word.replace(/\n/g, '<br>');
        const selected = selectedWords.includes(index) ? 'word-selected' : '';
        return `<span class="word-click ${selected}" onclick="toggleWord(${index})">${word}</span>`;
    }).join('');

    const preview = selectedWords.length > 0
        ? selectedWords.map(i => words[i]).filter(w => w.trim()).join(' ')
        : '<em style="color: #666;">Click words to select them...</em>';

    document.getElementById('game-screen').innerHTML = `
        <h1 class="erasure-title">🖍️ Create Your Erasure Poem</h1>
        <p style="color: white; text-align: center; font-size: 1.1rem; margin-bottom: 30px;">
            Click words in Frances Harper's "Bury Me in a Free Land" (1864) that carry rhetorical power
        </p>

        <div class="erasure-grid">
            <div>
                <h3>Full Poem (Click Words)</h3>
                <div class="poem-box">${wordsHTML}</div>
                <button class="btn" onclick="selectedWords = []; showSelectionScreen();">Clear All</button>
            </div>

            <div>
                <h3>Your Erasure Poem</h3>
                <div class="preview-box" id="preview">${preview}</div>
                <p style="color: white; margin-top: 15px;">
                    Selected: <strong>${selectedWords.length}</strong> words
                </p>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button class="btn" onclick="showExplanationScreen()" ${selectedWords.length === 0 ? 'disabled' : ''}>
                Continue to Explanation →
            </button>
        </div>
    `;
}

/**
 * SCREEN 2: Explanation
 */
function showExplanationScreen() {
    const words = POEM.split(/(\s+)/);
    const erasureText = selectedWords.map(i => words[i]).filter(w => w.trim()).join(' ');

    document.getElementById('game-screen').innerHTML = `
        <h1 class="erasure-title">💭 Explain Your Choices</h1>

        <div style="background: #2a2a2a; padding: 30px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Erasure Poem:</h3>
            <div style="color: #a855f7; font-size: 1.5rem; line-height: 2; margin: 20px 0;">
                ${erasureText}
            </div>
            <p style="color: white;"><strong>${selectedWords.length}</strong> words selected</p>
        </div>

        <h3>Why did you choose these words?</h3>
        <textarea class="explain-box" rows="6" id="explanation" placeholder="Explain your rhetorical analysis here...">${explanation}</textarea>

        <div style="text-align: center; margin-top: 30px;">
            <button class="btn" onclick="showSelectionScreen()">← Back to Selection</button>
            <button class="btn" onclick="savePoem()" id="save-btn">Save & See Results →</button>
        </div>
    `;

    // Update explanation as user types
    document.getElementById('explanation').addEventListener('input', function(e) {
        explanation = e.target.value;
        document.getElementById('save-btn').disabled = explanation.trim().length < 20;
    });
}

/**
 * SCREEN 3: Results
 */
function showResultsScreen() {
    const words = POEM.split(/(\s+)/);
    const erasureText = selectedWords.map(i => words[i]).filter(w => w.trim()).join(' ');

    // Get all saved poems
    const allPoems = JSON.parse(localStorage.getItem('erasurePoems') || '[]');

    document.getElementById('game-screen').innerHTML = `
        <h1 class="erasure-title">🎉 Your Erasure Poem Complete!</h1>

        <div class="poem-card" style="border-color: #fbbf24; background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(236, 72, 153, 0.2));">
            <h3 style="color: #fbbf24;">✨ Your Creation</h3>
            <div style="color: white; font-size: 1.5rem; line-height: 2; margin: 20px 0;">
                ${erasureText}
            </div>
            <p style="color: white;"><strong>${selectedWords.length}</strong> words selected</p>
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-top: 15px;">
                <h4 style="color: #06b6d4;">Your Analysis:</h4>
                <p style="color: white;">${explanation}</p>
            </div>
        </div>

        <h2 style="color: #06b6d4; margin-top: 40px;">🌟 All Class Poems (${allPoems.length} total)</h2>
        <div class="results">
            ${allPoems.slice().reverse().map((poem, index) => `
                <div class="poem-card">
                    <strong style="color: #a855f7;">Poem #${allPoems.length - index}</strong>
                    <div style="margin: 15px 0; font-size: 1.2rem; line-height: 1.8;">
                        ${poem.text}
                    </div>
                    <p style="font-size: 0.9rem; color: #888;">${poem.words} words • ${formatTime(poem.time)}</p>
                    <details style="margin-top: 10px;">
                        <summary style="cursor: pointer; color: #06b6d4;">Read Analysis</summary>
                        <p style="margin-top: 10px;">${poem.explanation}</p>
                    </details>
                </div>
            `).join('')}
        </div>

        <div style="text-align: center; margin-top: 30px;">
            <button class="btn" onclick="document.getElementById('erasure-overlay').remove()">Close</button>
            <button class="btn" onclick="startErasureGame()">Create Another Poem</button>
        </div>
    `;
}

/**
 * Toggle word selection
 */
function toggleWord(index) {
    const pos = selectedWords.indexOf(index);
    if (pos > -1) {
        selectedWords.splice(pos, 1);
    } else {
        selectedWords.push(index);
    }
    showSelectionScreen();
}

/**
 * Save poem
 */
function savePoem() {
    const words = POEM.split(/(\s+)/);
    const erasureText = selectedWords.map(i => words[i]).filter(w => w.trim()).join(' ');

    const poem = {
        text: erasureText,
        words: selectedWords.length,
        explanation: explanation,
        time: Date.now()
    };

    const allPoems = JSON.parse(localStorage.getItem('erasurePoems') || '[]');
    allPoems.push(poem);
    localStorage.setItem('erasurePoems', JSON.stringify(allPoems));

    showResultsScreen();
}

/**
 * Format timestamp
 */
function formatTime(timestamp) {
    const mins = Math.floor((Date.now() - timestamp) / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)} hours ago`;
    return new Date(timestamp).toLocaleDateString();
}

// Log when loaded
console.log('✅ Erasure Game Simple loaded successfully');
