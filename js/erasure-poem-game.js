/**
 * Erasure Poem Game - Interactive Poetry Creation
 * Students create erasure poems from Frances Harper's "Bury Me in a Free Land" (1864)
 * Saves all student creations for class-wide comparison
 */

// Poem text - "Bury Me in a Free Land" by Frances Harper (Public Domain, 1864)
const erasureGamePoem = `Make me a grave where'er you will,
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
let erasureGameState = {
    currentScreen: 'intro', // intro, selection, explanation, results
    selectedWords: [],
    explanation: '',
    erasureText: ''
};

/**
 * Open the erasure poem game overlay
 */
function openErasureGame() {
    // Reset state
    erasureGameState = {
        currentScreen: 'intro',
        selectedWords: [],
        explanation: '',
        erasureText: ''
    };

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'erasure-game-overlay';
    overlay.className = 'game-overlay';
    overlay.innerHTML = `
        <div class="game-container">
            <button class="game-close" onclick="closeErasureGame()">&times;</button>
            <div id="erasure-game-content"></div>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    renderErasureGameScreen();
}

/**
 * Close the game overlay
 */
function closeErasureGame() {
    const overlay = document.getElementById('erasure-game-overlay');
    if (overlay) {
        overlay.remove();
    }
    document.body.style.overflow = '';
}

/**
 * Render current game screen
 */
function renderErasureGameScreen() {
    const content = document.getElementById('erasure-game-content');
    if (!content) return;

    let html = '';

    switch (erasureGameState.currentScreen) {
        case 'intro':
            html = renderIntroScreen();
            break;
        case 'selection':
            html = renderSelectionScreen();
            break;
        case 'explanation':
            html = renderExplanationScreen();
            break;
        case 'results':
            html = renderResultsScreen();
            break;
    }

    content.innerHTML = html;

    // Add event listeners for word selection if on selection screen
    if (erasureGameState.currentScreen === 'selection') {
        attachWordListeners();
    }
}

/**
 * Render intro screen
 */
function renderIntroScreen() {
    return `
        <div class="erasure-game-screen">
            <h1 class="game-title">🖍️ Erasure Poem Creator</h1>
            <p class="game-subtitle">Transform Frances Harper's Poetry Into Your Own</p>

            <div class="game-intro">
                <div class="info-card">
                    <h2>📜 What is Erasure Poetry?</h2>
                    <p>
                        Erasure poetry is a form of found poetry where you <strong>select specific words</strong>
                        from an existing text to create a new poem. By highlighting only certain words,
                        you create new meaning while revealing the rhetorical power hidden within the original.
                    </p>
                </div>

                <div class="info-card" style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(236, 72, 153, 0.1)); border-left: 4px solid var(--accent-color);">
                    <h2>✊ About "Bury Me in a Free Land"</h2>
                    <p>
                        Written by <strong>Frances Ellen Watkins Harper</strong> in 1864, this abolitionist poem
                        uses powerful rhetoric to condemn slavery. Harper was a pioneering Black poet, activist,
                        and suffragist—one of the first African American women published in the United States.
                    </p>
                </div>

                <div class="info-card">
                    <h2>🎯 Your Mission</h2>
                    <ol style="text-align: left; margin: var(--spacing-md) auto; max-width: 600px;">
                        <li><strong>Read</strong> Harper's full poem</li>
                        <li><strong>Click words</strong> that carry rhetorical power or emotional weight</li>
                        <li><strong>Create</strong> your own erasure poem from your selections</li>
                        <li><strong>Explain</strong> why you chose those specific words</li>
                        <li><strong>Compare</strong> your creation with other students' interpretations</li>
                    </ol>
                </div>
            </div>

            <button class="btn-primary-game" onclick="startErasureGame()">
                🚀 Start Creating Your Erasure Poem
            </button>
        </div>
    `;
}

/**
 * Render word selection screen
 */
function renderSelectionScreen() {
    const words = erasureGamePoem.split(/(\s+|[\n\r])/g);

    // Create clickable words HTML
    const wordsHTML = words.map((word, index) => {
        if (word.match(/^\s*$/)) {
            return word.replace(/\n/g, '<br>');
        }

        const isSelected = erasureGameState.selectedWords.includes(index);
        const selectedClass = isSelected ? 'word-selected' : '';
        return `<span class="clickable-word ${selectedClass}" data-index="${index}">${word}</span>`;
    }).join('');

    // Get selected words count
    const selectedCount = erasureGameState.selectedWords.length;

    return `
        <div class="erasure-game-screen">
            <h1 class="game-title">🖍️ Select Words with Rhetorical Power</h1>
            <p class="game-subtitle">Click words to highlight them—your selections will form your erasure poem</p>

            <div class="selection-stats">
                <span class="stat-badge">📊 Words Selected: <strong>${selectedCount}</strong></span>
                <button class="btn-secondary-small" onclick="clearAllSelections()">🔄 Clear All</button>
            </div>

            <div class="two-column-layout">
                <div class="column">
                    <h3 class="column-title">📄 Full Poem (Click Words)</h3>
                    <div class="poem-interactive" id="poem-text">
                        ${wordsHTML}
                    </div>
                </div>

                <div class="column sticky-column">
                    <h3 class="column-title">✨ Your Erasure Poem</h3>
                    <div class="erasure-preview" id="erasure-preview">
                        ${getErasurePreview()}
                    </div>

                    <div class="preview-info">
                        <p style="font-size: var(--font-size-sm); color: var(--text-secondary); margin-top: var(--spacing-md);">
                            💡 <em>Tip: Select words that stand out emotionally, rhythmically, or rhetorically.
                            Your erasure poem doesn't need to be grammatically complete—focus on impact!</em>
                        </p>
                    </div>
                </div>
            </div>

            <div class="game-actions">
                <button class="btn-secondary-game" onclick="erasureGameState.currentScreen = 'intro'; renderErasureGameScreen();">
                    ← Back
                </button>
                <button class="btn-primary-game" onclick="continueToExplanation()" ${selectedCount === 0 ? 'disabled' : ''}>
                    Continue to Explanation →
                </button>
            </div>
        </div>
    `;
}

/**
 * Render explanation screen
 */
function renderExplanationScreen() {
    return `
        <div class="erasure-game-screen">
            <h1 class="game-title">💭 Explain Your Choices</h1>
            <p class="game-subtitle">Why did you select these specific words?</p>

            <div class="explanation-layout">
                <div class="your-poem-display">
                    <h3>✨ Your Erasure Poem</h3>
                    <div class="final-erasure-poem">
                        ${erasureGameState.erasureText}
                    </div>
                    <p class="word-count">
                        📊 <strong>${erasureGameState.selectedWords.length} words</strong> selected from the original
                    </p>
                </div>

                <div class="explanation-input">
                    <h3>🎯 Why These Words?</h3>
                    <p style="color: var(--text-secondary); margin-bottom: var(--spacing-md);">
                        Explain your rhetorical analysis. What makes these words powerful?
                        What themes or emotions do they convey?
                    </p>
                    <textarea
                        id="erasure-explanation"
                        class="explanation-textarea"
                        placeholder="Example: I selected 'grave,' 'slaves,' and 'free' because they form the core opposition of the poem—the speaker's wish for freedom even in death. The repetition of 'I could not rest' emphasizes the impossibility of peace under slavery..."
                        rows="8"
                        onkeyup="updateExplanation(this.value)"
                    >${erasureGameState.explanation}</textarea>
                    <p class="char-count" id="char-count">
                        ${erasureGameState.explanation.length} characters
                    </p>
                </div>
            </div>

            <div class="game-actions">
                <button class="btn-secondary-game" onclick="backToSelection()">
                    ← Edit Word Selection
                </button>
                <button class="btn-primary-game" onclick="saveAndShowResults()" ${erasureGameState.explanation.trim().length < 50 ? 'disabled' : ''}>
                    Save & See Results 🎉
                </button>
            </div>

            ${erasureGameState.explanation.trim().length < 50 ?
                '<p class="validation-hint">⚠️ Please write at least 50 characters to continue (thoughtful analysis required!)</p>' :
                ''}
        </div>
    `;
}

/**
 * Render results screen with all saved erasure poems
 */
function renderResultsScreen() {
    const allPoems = getSavedErasurePoems();
    const yourPoem = allPoems[allPoems.length - 1]; // Most recent (just saved)

    return `
        <div class="erasure-game-screen">
            <h1 class="game-title">🎉 Your Erasure Poem is Complete!</h1>
            <p class="game-subtitle">See how your interpretation compares with others</p>

            <div class="results-layout">
                <!-- Your Poem Highlighted -->
                <div class="your-poem-result">
                    <h2 style="color: var(--neon-purple); margin-bottom: var(--spacing-md);">
                        ✨ Your Creation
                    </h2>
                    <div class="poem-card your-poem-card">
                        <div class="erasure-poem-text">
                            ${yourPoem.erasureText}
                        </div>
                        <div class="poem-meta">
                            <span>📊 ${yourPoem.wordCount} words selected</span>
                            <span>📅 ${formatTimestamp(yourPoem.timestamp)}</span>
                        </div>
                        <div class="poem-explanation">
                            <h4>💭 Your Analysis:</h4>
                            <p>${yourPoem.explanation}</p>
                        </div>
                    </div>
                </div>

                <!-- All Poems Gallery -->
                <div class="all-poems-gallery">
                    <h2 style="color: var(--neon-cyan); margin-bottom: var(--spacing-md);">
                        🌟 Class Interpretations (${allPoems.length} total)
                    </h2>
                    <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
                        Notice the diversity of interpretations! Each student found different rhetorical power in Harper's words.
                    </p>

                    <div class="poems-grid">
                        ${allPoems.map((poem, index) => `
                            <div class="poem-card ${index === allPoems.length - 1 ? 'highlight-yours' : ''}">
                                <div class="poem-number">#${allPoems.length - index}</div>
                                <div class="erasure-poem-text-small">
                                    ${poem.erasureText}
                                </div>
                                <div class="poem-meta-small">
                                    <span>📊 ${poem.wordCount} words</span>
                                    <span>📅 ${formatTimestamp(poem.timestamp)}</span>
                                </div>
                                <details class="poem-explanation-toggle">
                                    <summary>💭 Read Analysis</summary>
                                    <p>${poem.explanation}</p>
                                </details>
                            </div>
                        `).reverse().join('')}
                    </div>
                </div>
            </div>

            <div class="game-actions">
                <button class="btn-secondary-game" onclick="closeErasureGame()">
                    ← Back to Activities
                </button>
                <button class="btn-primary-game" onclick="createAnotherPoem()">
                    🔄 Create Another Erasure Poem
                </button>
            </div>
        </div>
    `;
}

/**
 * Get erasure preview text
 */
function getErasurePreview() {
    if (erasureGameState.selectedWords.length === 0) {
        return '<em style="color: var(--text-secondary);">Select words from the poem to see your erasure...</em>';
    }

    const words = erasureGamePoem.split(/(\s+|[\n\r])/g);
    const selectedText = erasureGameState.selectedWords
        .sort((a, b) => a - b)
        .map(index => words[index])
        .filter(word => word && !word.match(/^\s*$/))
        .join(' ');

    return selectedText;
}

/**
 * Attach event listeners to clickable words
 */
function attachWordListeners() {
    const words = document.querySelectorAll('.clickable-word');
    words.forEach(word => {
        word.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            toggleWordSelection(index);
        });
    });
}

/**
 * Toggle word selection
 */
function toggleWordSelection(index) {
    const selectedIndex = erasureGameState.selectedWords.indexOf(index);

    if (selectedIndex > -1) {
        // Deselect
        erasureGameState.selectedWords.splice(selectedIndex, 1);
    } else {
        // Select
        erasureGameState.selectedWords.push(index);
    }

    renderErasureGameScreen();
}

/**
 * Clear all selections
 */
function clearAllSelections() {
    erasureGameState.selectedWords = [];
    renderErasureGameScreen();
}

/**
 * Start the game (intro -> selection)
 */
function startErasureGame() {
    erasureGameState.currentScreen = 'selection';
    renderErasureGameScreen();
}

/**
 * Continue to explanation screen
 */
function continueToExplanation() {
    // Save the erasure text before moving to explanation
    erasureGameState.erasureText = getErasurePreview();
    erasureGameState.currentScreen = 'explanation';
    renderErasureGameScreen();
}

/**
 * Go back to selection from explanation
 */
function backToSelection() {
    erasureGameState.currentScreen = 'selection';
    renderErasureGameScreen();
}

/**
 * Update explanation text
 */
function updateExplanation(value) {
    erasureGameState.explanation = value;

    // Update character count
    const charCount = document.getElementById('char-count');
    if (charCount) {
        charCount.textContent = `${value.length} characters`;
    }

    // Re-render to update button state
    renderErasureGameScreen();
}

/**
 * Save erasure poem and show results
 */
function saveAndShowResults() {
    const poemData = {
        timestamp: Date.now(),
        selectedWords: erasureGameState.selectedWords,
        erasureText: erasureGameState.erasureText,
        explanation: erasureGameState.explanation,
        wordCount: erasureGameState.selectedWords.length
    };

    // Get existing poems
    const allPoems = getSavedErasurePoems();

    // Add new poem
    allPoems.push(poemData);

    // Save to localStorage
    localStorage.setItem('erasurePoems', JSON.stringify(allPoems));

    // Show results
    erasureGameState.currentScreen = 'results';
    renderErasureGameScreen();
}

/**
 * Get all saved erasure poems from localStorage
 */
function getSavedErasurePoems() {
    const saved = localStorage.getItem('erasurePoems');
    return saved ? JSON.parse(saved) : [];
}

/**
 * Format timestamp for display
 */
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;

    return date.toLocaleDateString();
}

/**
 * Create another erasure poem
 */
function createAnotherPoem() {
    erasureGameState = {
        currentScreen: 'intro',
        selectedWords: [],
        explanation: '',
        erasureText: ''
    };
    renderErasureGameScreen();
}
