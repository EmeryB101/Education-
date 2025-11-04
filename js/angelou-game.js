/**
 * Maya Angelou's Rhetorical Strategies Game
 * Match poems with their rhetorical strategies and themes
 */

const angelouGameData = {
    poems: [
        {
            id: 'still_i_rise',
            title: '"Still I Rise"',
            theme: 'Resilience & Defiance',
            strategies: ['Anaphora ("You may...")', 'Repetition ("I rise")', 'Rhetorical Questions'],
            primaryAppeal: 'Pathos & Ethos',
            description: 'Responds to oppression with triumphant repetition and defiant voice'
        },
        {
            id: 'phenomenal_woman',
            title: '"Phenomenal Woman"',
            theme: 'Self-Worth & Identity',
            strategies: ['Embodied Rhetoric', 'First-Person Authority', 'Refrain ("I\'m a woman")'],
            primaryAppeal: 'Ethos & Pathos',
            description: 'Redefines beauty and womanhood through bodily confidence and self-assertion'
        },
        {
            id: 'caged_bird',
            title: '"Caged Bird"',
            theme: 'Freedom vs. Oppression',
            strategies: ['Extended Metaphor', 'Contrast/Antithesis', 'Symbolism (bird = freedom)'],
            primaryAppeal: 'Pathos & Logos',
            description: 'Uses bird metaphor to illustrate racial oppression and the yearning for liberation'
        },
        {
            id: 'on_the_pulse',
            title: '"On the Pulse of Morning"',
            theme: 'Unity & Hope',
            strategies: ['Epideictic Rhetoric', 'Inclusive Pronouns ("we")', 'Natural Imagery'],
            primaryAppeal: 'Ethos & Pathos',
            description: 'Inaugural poem calling for national unity and new beginning through ceremonial language'
        },
        {
            id: 'alone',
            title: '"Alone"',
            theme: 'Community & Interconnection',
            strategies: ['Repetition ("Alone")', 'Universal Address', 'Imperative Mood'],
            primaryAppeal: 'Logos & Pathos',
            description: 'Argues that human survival depends on community and mutual support'
        },
        {
            id: 'i_know_why',
            title: '"I Know Why the Caged Bird Sings" (autobiography title poem)',
            theme: 'Voice & Silencing',
            strategies: ['Personal Narrative', 'Coming-of-Age Rhetoric', 'Testimony'],
            primaryAppeal: 'Ethos & Pathos',
            description: 'Establishes authority through lived experience of racism and trauma'
        }
    ],

    rhetoricalMoves: [
        {
            id: 'anaphora',
            name: 'Anaphora',
            definition: 'Repetition of words at the beginning of successive clauses',
            example: '"You may trod me in the very dirt / But still, like dust, I\'ll rise"'
        },
        {
            id: 'embodied',
            name: 'Embodied Rhetoric',
            definition: 'Using the physical body as a site of knowledge and authority',
            example: 'References to physical presence, movement, and bodily confidence'
        },
        {
            id: 'metaphor',
            name: 'Extended Metaphor',
            definition: 'Sustained comparison developed throughout the poem',
            example: 'The caged bird represents the oppressed; the free bird represents privilege'
        },
        {
            id: 'defiance',
            name: 'Defiant Voice',
            definition: 'Direct address to oppressor; refusal to be diminished',
            example: 'Speaking back to power with confidence and resistance'
        }
    ]
};

let angelouGameState = {
    currentRound: 0,
    score: 0,
    selectedPoem: null,
    selectedStrategy: null,
    attempts: 0
};

/**
 * Initialize the game
 */
function initAngelouGame() {
    angelouGameState = {
        currentRound: 0,
        score: 0,
        selectedPoem: null,
        selectedStrategy: null,
        attempts: 0
    };

    showAngelouIntro();
}

/**
 * Show game introduction
 */
function showAngelouIntro() {
    const container = document.getElementById('angelou-game-content');
    if (!container) return;

    const html = `
        <div class="angelou-intro">
            <h3>🦜 Welcome to Maya Angelou's Rhetorical Strategies</h3>
            <p>Maya Angelou was a master of rhetorical technique. In this activity, you'll match her famous poems with their primary rhetorical strategies.</p>

            <div class="game-instructions">
                <h4>How to Play:</h4>
                <ol>
                    <li><strong>Read the poem title and theme</strong></li>
                    <li><strong>Identify the rhetorical strategy</strong> that best fits</li>
                    <li><strong>Make your match</strong> and see if you're correct!</li>
                    <li><strong>Learn from feedback</strong> about why each strategy matters</li>
                </ol>
            </div>

            <div class="game-modes">
                <h4>Choose Your Challenge:</h4>
                <button class="quiz-btn quiz-btn-primary" onclick="startAngelouGame('learn')">
                    📚 Learning Mode - See all poems and strategies
                </button>
                <button class="quiz-btn quiz-btn-primary" onclick="startAngelouGame('quiz')">
                    🎯 Quiz Mode - Match poems with strategies
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

/**
 * Start the game in specified mode
 */
function startAngelouGame(mode) {
    if (mode === 'learn') {
        showLearningMode();
    } else {
        showQuizMode();
    }
}

/**
 * Show learning mode - educational overview
 */
function showLearningMode() {
    const container = document.getElementById('angelou-game-content');
    if (!container) return;

    let html = `
        <div class="angelou-learning">
            <h3>📚 Maya Angelou's Rhetorical Toolkit</h3>
            <p>Explore how Maya Angelou uses these powerful strategies across her most famous poems.</p>

            <div class="angelou-poems-grid">
    `;

    angelouGameData.poems.forEach(poem => {
        html += `
            <div class="angelou-poem-card">
                <h4>${poem.title}</h4>
                <div class="poem-theme">
                    <strong>Theme:</strong> ${poem.theme}
                </div>
                <div class="poem-description">
                    ${poem.description}
                </div>
                <div class="poem-strategies">
                    <strong>Key Strategies:</strong>
                    <ul>
                        ${poem.strategies.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                <div class="poem-appeal">
                    <strong>Primary Appeals:</strong> ${poem.primaryAppeal}
                </div>
            </div>
        `;
    });

    html += `
            </div>

            <div class="rhetorical-reference">
                <h4>🎭 Key Rhetorical Terms</h4>
                <div class="terms-grid">
    `;

    angelouGameData.rhetoricalMoves.forEach(move => {
        html += `
            <div class="term-card">
                <h5>${move.name}</h5>
                <p><strong>Definition:</strong> ${move.definition}</p>
                <p class="term-example"><em>${move.example}</em></p>
            </div>
        `;
    });

    html += `
                </div>
            </div>

            <div class="game-actions">
                <button class="quiz-btn quiz-btn-primary" onclick="startAngelouGame('quiz')">
                    Ready to Test Your Knowledge! 🎯
                </button>
                <button class="quiz-btn quiz-btn-secondary" onclick="initAngelouGame()">
                    ← Back to Start
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

/**
 * Show quiz mode - interactive matching
 */
function showQuizMode() {
    if (angelouGameState.currentRound >= angelouGameData.poems.length) {
        showAngelouResults();
        return;
    }

    const container = document.getElementById('angelou-game-content');
    if (!container) return;

    const currentPoem = angelouGameData.poems[angelouGameState.currentRound];
    const progress = ((angelouGameState.currentRound) / angelouGameData.poems.length) * 100;

    let html = `
        <div class="angelou-quiz">
            <div class="quiz-progress">
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" style="width: ${progress}%"></div>
                </div>
                <p class="quiz-progress-text">Poem ${angelouGameState.currentRound + 1} of ${angelouGameData.poems.length} | Score: ${angelouGameState.score}</p>
            </div>

            <div class="current-poem-display">
                <h3>${currentPoem.title}</h3>
                <div class="poem-theme-badge">
                    📖 Theme: ${currentPoem.theme}
                </div>
                <p class="poem-context">${currentPoem.description}</p>
            </div>

            <div class="strategy-question">
                <h4>Which rhetorical strategy is MOST prominent in this poem?</h4>
                <div class="strategy-options">
    `;

    // Show strategy options (shuffled)
    const strategyOptions = [
        'Anaphora & Repetition',
        'Embodied Rhetoric',
        'Extended Metaphor',
        'Defiant Voice to Oppressor',
        'Inclusive Community Language',
        'Personal Testimony & Narrative'
    ];

    strategyOptions.forEach((strategy, index) => {
        html += `
            <button class="strategy-option-btn" onclick="checkAngelouAnswer('${currentPoem.id}', '${strategy}')">
                ${strategy}
            </button>
        `;
    });

    html += `
                </div>
            </div>

            <div id="angelou-feedback"></div>
        </div>
    `;

    container.innerHTML = html;
}

/**
 * Check the answer
 */
function checkAngelouAnswer(poemId, selectedStrategy) {
    const poem = angelouGameData.poems.find(p => p.id === poemId);
    const feedbackDiv = document.getElementById('angelou-feedback');

    angelouGameState.attempts++;

    // Determine correctness (simplified matching logic)
    const correctMatches = {
        'still_i_rise': 'Anaphora & Repetition',
        'phenomenal_woman': 'Embodied Rhetoric',
        'caged_bird': 'Extended Metaphor',
        'on_the_pulse': 'Inclusive Community Language',
        'alone': 'Inclusive Community Language',
        'i_know_why': 'Personal Testimony & Narrative'
    };

    const isCorrect = correctMatches[poemId] === selectedStrategy;

    if (isCorrect) {
        angelouGameState.score++;
        feedbackDiv.innerHTML = `
            <div class="feedback-box correct">
                <h4>✅ Excellent Analysis!</h4>
                <p><strong>${selectedStrategy}</strong> is indeed a key strategy in ${poem.title}.</p>
                <p><em>${poem.strategies.join(', ')}</em> all work together to create its powerful effect.</p>
                <button class="quiz-btn quiz-btn-primary" onclick="nextAngelouRound()">
                    Next Poem →
                </button>
            </div>
        `;
    } else {
        feedbackDiv.innerHTML = `
            <div class="feedback-box incorrect">
                <h4>💭 Not quite...</h4>
                <p>While ${poem.title} uses multiple strategies, <strong>${correctMatches[poemId]}</strong> is most prominent.</p>
                <p><em>Hint: ${poem.strategies[0]}</em></p>
                <button class="quiz-btn quiz-btn-secondary" onclick="checkAngelouAnswer('${poemId}', '${correctMatches[poemId]}')">
                    Try Again
                </button>
            </div>
        `;
    }
}

/**
 * Move to next round
 */
function nextAngelouRound() {
    angelouGameState.currentRound++;
    showQuizMode();
}

/**
 * Show final results
 */
function showAngelouResults() {
    const container = document.getElementById('angelou-game-content');
    if (!container) return;

    const percentage = Math.round((angelouGameState.score / angelouGameData.poems.length) * 100);
    let performance = '';

    if (percentage >= 90) {
        performance = '🌟 Rhetorical Master!';
    } else if (percentage >= 70) {
        performance = '🎓 Strong Analyst!';
    } else if (percentage >= 50) {
        performance = '📚 Good Foundation!';
    } else {
        performance = '🌱 Keep Learning!';
    }

    const html = `
        <div class="angelou-results">
            <h2>🦜 Your Results</h2>
            <div class="results-score">
                <div class="score-circle">
                    <div class="score-number">${angelouGameState.score}/${angelouGameData.poems.length}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <h3>${performance}</h3>
            </div>

            <div class="results-analysis">
                <h4>What This Means for Your AI Prompting:</h4>
                <div class="results-tips">
                    ${percentage >= 70 ? `
                        <p>✅ <strong>You're ready for advanced prompts!</strong> Try asking: <em>"Compare the use of anaphora in 'Still I Rise' with similar techniques in other resistance poetry."</em></p>
                    ` : `
                        <p>💡 <strong>Build your vocabulary first.</strong> Try asking: <em>"What is anaphora and can you identify examples in 'Still I Rise'?"</em></p>
                    `}
                    <p>📝 <strong>Next step:</strong> Go back to Learning Mode to review the strategies you found challenging.</p>
                    <p>🎮 <strong>Practice makes perfect:</strong> Try the Poetry Analysis Game to apply these concepts to actual poems!</p>
                </div>
            </div>

            <div class="game-actions">
                <button class="quiz-btn quiz-btn-primary" onclick="initAngelouGame()">
                    🔄 Play Again
                </button>
                <button class="quiz-btn quiz-btn-secondary" onclick="startAngelouGame('learn')">
                    📚 Review Strategies
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', function() {
    const angelouContainer = document.getElementById('angelou-game-content');
    if (angelouContainer) {
        initAngelouGame();
    }
});
