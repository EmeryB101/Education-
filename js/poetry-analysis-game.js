/**
 * Interactive Poetry Analysis Game: Agentic AI & Rhetorical Appeals
 * Users mark words as ethos, pathos, or logos, then compare with AI analysis
 */

// Game state
let currentPoemIndex = 0;
let currentStep = 1; // 1=intro, 2=analysis, 3=AI reveal, 4=lesson
let userAnalysis = {}; // { wordIndex: ['ethos', 'pathos', 'logos'] }
let totalAgreements = 0;
let totalPossible = 0;
let userUniqueInterpretations = 0;

// Poem data - Public domain persuasive poems by female authors
// Featuring diverse voices including African American poets
const poems = [
    {
        title: "Bury Me in a Free Land",
        author: "Frances Ellen Watkins Harper (1864)",
        context: "African American poet persuading against slavery and for human dignity",
        lines: [
            "Make me a grave where'er you will,",
            "In a lowly plain, or a lofty hill;",
            "Make it among earth's humblest graves,",
            "But not in a land where men are slaves.",
            "I could not rest if around my grave",
            "I heard the steps of a trembling slave;"
        ],
        aiAnalysis: {
            0: ['ethos'], // Make
            1: ['pathos'], // me
            3: ['pathos'], // grave
            6: ['ethos'], // will
            10: ['logos'], // plain
            14: ['logos'], // lofty
            15: ['logos'], // hill
            17: ['ethos'], // Make
            20: ['logos'], // earth's
            21: ['pathos'], // humblest
            22: ['pathos'], // graves
            28: ['logos'], // land
            30: ['pathos'], // men
            32: ['pathos', 'logos'], // slaves
            36: ['pathos'], // rest
            40: ['pathos'], // grave
            43: ['pathos'], // heard
            45: ['pathos'], // steps
            48: ['pathos'], // trembling
            49: ['pathos'] // slave
        },
        lesson: "Frances Ellen Watkins Harper was a leading African American abolitionist poet. Notice how her ethos comes from moral authority and pathos from the human dignity of enslaved people. <strong>Your analysis captured what AI cannot: historical and cultural context.</strong>"
    },
    {
        title: "The New Colossus",
        author: "Emma Lazarus (1883)",
        context: "Jewish American poet persuading America to welcome immigrants",
        lines: [
            "Give me your tired, your poor,",
            "Your huddled masses yearning to breathe free,",
            "The wretched refuse of your teeming shore.",
            "Send these, the homeless, tempest-tost to me,",
            "I lift my lamp beside the golden door!"
        ],
        // AI analysis: word index → appeals array
        aiAnalysis: {
            0: ['pathos'], // Give
            1: ['ethos'], // me
            2: ['pathos'], // your
            3: ['pathos'], // tired
            4: ['pathos'], // your
            5: ['pathos'], // poor
            7: ['ethos'], // Your
            8: ['pathos'], // huddled
            9: ['pathos'], // masses
            10: ['pathos'], // yearning
            12: ['pathos'], // breathe
            13: ['pathos'], // free
            15: ['pathos'], // The
            16: ['pathos'], // wretched
            17: ['pathos'], // refuse
            20: ['logos'], // teeming
            21: ['logos'], // shore
            23: ['ethos'], // Send
            25: ['pathos'], // the
            26: ['pathos'], // homeless
            27: ['pathos'], // tempest-tost
            29: ['ethos'], // me
            31: ['ethos'], // I
            32: ['ethos'], // lift
            34: ['pathos', 'logos'], // lamp (symbol of hope AND guidance)
            37: ['pathos', 'logos'] // golden (symbol + literal description)
        },
        lesson: "You analyzed first, then AI confirmed. This is <strong>agentic AI</strong> - you maintained authorship of the interpretation. You decided which words carried persuasive weight."
    },
    {
        title: "Remember",
        author: "Christina Rossetti (1862)",
        context: "Persuades the reader about how to grieve and remember after loss",
        lines: [
            "Remember me when I am gone away,",
            "Gone far away into the silent land;",
            "When you can no more hold me by the hand,",
            "Nor I half turn to go yet turning stay.",
            "Better by far you should forget and smile",
            "Than that you should remember and be sad."
        ],
        aiAnalysis: {
            0: ['ethos'], // Remember
            1: ['pathos'], // me
            4: ['pathos'], // gone
            5: ['pathos'], // away
            7: ['pathos'], // Gone
            10: ['pathos'], // the
            11: ['pathos', 'logos'], // silent
            12: ['logos'], // land
            17: ['pathos'], // hold
            18: ['pathos'], // me
            21: ['pathos'], // hand
            28: ['pathos'], // turning
            29: ['pathos'], // stay
            31: ['logos', 'ethos'], // Better
            34: ['ethos'], // you
            35: ['ethos'], // should
            36: ['pathos'], // forget
            38: ['pathos'], // smile
            42: ['ethos'], // should
            43: ['pathos'], // remember
            46: ['pathos'] // sad
        },
        lesson: "Notice how AI caught different nuances? <strong>Agentic AI = collaboration, not replacement.</strong> AI helps you see what you might have missed, but your interpretation came first."
    },
    {
        title: "The Cry of the Children",
        author: "Elizabeth Barrett Browning (1843)",
        context: "Persuades against child labor, advocating for social justice",
        lines: [
            "Do ye hear the children weeping, O my brothers,",
            "Ere the sorrow comes with years?",
            "They are leaning their young heads against their mothers,",
            "And that cannot stop their tears.",
            "The young lambs are bleating in the meadows,",
            "The young birds are chirping in the nest,",
            "The young fawns are playing with the shadows,",
            "But the young children, O my brothers,",
            "They are weeping bitterly!"
        ],
        aiAnalysis: {
            3: ['ethos'], // hear
            5: ['pathos'], // children
            6: ['pathos'], // weeping
            9: ['ethos'], // brothers
            12: ['pathos', 'logos'], // sorrow
            13: ['logos'], // comes
            15: ['logos'], // years
            18: ['pathos'], // leaning
            20: ['pathos'], // young
            21: ['pathos'], // heads
            24: ['pathos'], // mothers
            29: ['logos'], // stop
            31: ['pathos'], // tears
            33: ['pathos'], // The
            34: ['pathos'], // young
            35: ['logos'], // lambs
            37: ['logos'], // bleating
            40: ['logos'], // meadows
            42: ['pathos'], // The
            43: ['pathos'], // young
            44: ['logos'], // birds
            46: ['logos'], // chirping
            51: ['pathos'], // The
            52: ['pathos'], // young
            53: ['logos'], // fawns
            55: ['logos'], // playing
            60: ['pathos'], // the
            61: ['pathos'], // young
            62: ['pathos'], // children
            65: ['ethos'], // brothers
            68: ['pathos'], // weeping
            69: ['pathos'] // bitterly
        },
        lesson: "Your interpretation is valid even when different from AI. <strong>You controlled the analysis.</strong> Agentic AI means the AI assists your thinking rather than replacing it. You maintain intellectual ownership."
    }
];

/**
 * Initialize the game
 */
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('poetry-game')) {
        startGame();
    }
});

/**
 * Start the game
 */
function startGame() {
    currentPoemIndex = 0;
    currentStep = 1;
    userAnalysis = {};
    totalAgreements = 0;
    totalPossible = 0;
    userUniqueInterpretations = 0;
    loadStep();
}

/**
 * Load current step
 */
function loadStep() {
    const container = document.getElementById('game-content');
    const poem = poems[currentPoemIndex];

    let html = '';

    if (currentStep === 1) {
        // Introduction
        html = `
            <div class="game-step-intro">
                <h3>Poem ${currentPoemIndex + 1} of ${poems.length}: ${poem.title}</h3>
                <p class="poem-author">by ${poem.author}</p>
                <p class="poem-context">${poem.context}</p>

                <div class="instructions-box">
                    <h4>Your Task: Identify Rhetorical Appeals</h4>
                    <p>Click on words in the poem to mark them as rhetorical appeals. You can mark words multiple times for different appeals:</p>
                    <ul>
                        <li><span class="appeal-badge ethos-badge">Ethos</span> - Credibility, authority, ethical appeal</li>
                        <li><span class="appeal-badge pathos-badge">Pathos</span> - Emotion, values, feelings</li>
                        <li><span class="appeal-badge logos-badge">Logos</span> - Logic, reason, evidence</li>
                    </ul>
                    <p><strong>This is AGENTIC AI</strong> - You're doing the thinking! AI will help verify your analysis afterward.</p>
                </div>

                <div class="game-buttons">
                    <button class="game-btn" onclick="nextStep()">Start Analysis</button>
                </div>
            </div>
        `;
    } else if (currentStep === 2) {
        // User analysis phase
        html = `
            <div class="game-step-analysis">
                <h3>${poem.title} by ${poem.author}</h3>

                <div class="analysis-legend">
                    <span>Mark words: </span>
                    <span class="appeal-badge ethos-badge">Ethos</span>
                    <span class="appeal-badge pathos-badge">Pathos</span>
                    <span class="appeal-badge logos-badge">Logos</span>
                    <span class="hint">Click multiple times to mark different appeals</span>
                </div>

                <div class="poem-text" id="poem-container">
                    ${generatePoemHTML(poem, false)}
                </div>

                <div class="analysis-stats">
                    <div class="stat-item">
                        <span class="ethos-badge">Ethos:</span>
                        <span id="ethos-count">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="pathos-badge">Pathos:</span>
                        <span id="pathos-count">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="logos-badge">Logos:</span>
                        <span id="logos-count">0</span>
                    </div>
                </div>

                <div class="game-buttons">
                    <button class="game-btn" onclick="nextStep()">Done Analyzing - See AI Analysis</button>
                </div>
            </div>
        `;
    } else if (currentStep === 3) {
        // AI analysis reveal
        const comparison = compareAnalyses(poem);

        html = `
            <div class="game-step-reveal">
                <h3>AI Analysis Comparison</h3>

                <div class="comparison-container">
                    <div class="comparison-side">
                        <h4>Your Analysis</h4>
                        <div class="poem-text">
                            ${generatePoemHTML(poem, false, true)}
                        </div>
                    </div>

                    <div class="comparison-side">
                        <h4>AI Analysis</h4>
                        <div class="poem-text">
                            ${generatePoemHTML(poem, true)}
                        </div>
                    </div>
                </div>

                <div class="comparison-stats">
                    <div class="stat-box">
                        <h5>Agreement</h5>
                        <p class="stat-number">${comparison.agreements}</p>
                        <p class="stat-label">words where you matched AI</p>
                    </div>
                    <div class="stat-box">
                        <h5>Your Unique Insights</h5>
                        <p class="stat-number">${comparison.userUnique}</p>
                        <p class="stat-label">words you identified</p>
                    </div>
                    <div class="stat-box">
                        <h5>AI Suggestions</h5>
                        <p class="stat-number">${comparison.aiSuggestions}</p>
                        <p class="stat-label">additional words AI found</p>
                    </div>
                </div>

                <div class="game-buttons">
                    <button class="game-btn" onclick="nextStep()">See Lesson</button>
                </div>
            </div>
        `;
    } else if (currentStep === 4) {
        // Lesson
        html = `
            <div class="game-step-lesson">
                <h3>Agentic AI Lesson</h3>

                <div class="lesson-box">
                    <p>${poem.lesson}</p>
                </div>

                <div class="game-buttons">
                    ${currentPoemIndex < poems.length - 1 ?
                        '<button class="game-btn" onclick="nextPoem()">Next Poem</button>' :
                        '<button class="game-btn accent" onclick="showFinalSummary()">See Final Summary</button>'
                    }
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // Fade in animation
    setTimeout(() => {
        container.style.opacity = '1';
    }, 50);
}

/**
 * Generate poem HTML with clickable words
 */
function generatePoemHTML(poem, showAI, showUser = false) {
    let html = '';
    let wordIndex = 0;

    poem.lines.forEach((line, lineIndex) => {
        html += '<div class="poem-line">';

        const words = line.split(/(\s+|[,;.!?])/);
        words.forEach(token => {
            if (token.trim() && !/^[,;.!?]$/.test(token)) {
                const classes = [];

                if (showAI && poem.aiAnalysis[wordIndex]) {
                    poem.aiAnalysis[wordIndex].forEach(appeal => {
                        classes.push(`ai-${appeal}`);
                    });
                }

                if (showUser && userAnalysis[wordIndex]) {
                    userAnalysis[wordIndex].forEach(appeal => {
                        classes.push(`user-${appeal}`);
                    });
                }

                if (!showAI && !showUser) {
                    // Make clickable for user analysis
                    html += `<span class="poem-word ${classes.join(' ')}" data-index="${wordIndex}" data-word="${token}" onclick="showSelectionPanel(${wordIndex}, '${token.replace(/'/g, "\\'")}')">${token}</span>`;
                } else {
                    html += `<span class="poem-word ${classes.join(' ')}">${token}</span>`;
                }

                wordIndex++;
            } else {
                html += token;
            }
        });

        html += '</div>';
    });

    return html;
}

/**
 * Show selection panel for choosing appeal
 */
let currentSelectedWordIndex = null;

function showSelectionPanel(wordIndex, wordText) {
    currentSelectedWordIndex = wordIndex;

    // Remove any existing panel
    hideSelectionPanel();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'selection-overlay';
    overlay.onclick = hideSelectionPanel;

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'selection-panel';
    panel.onclick = (e) => e.stopPropagation(); // Prevent closing when clicking panel

    const currentAppeals = userAnalysis[wordIndex] || [];
    const hasEthos = currentAppeals.includes('ethos');
    const hasPathos = currentAppeals.includes('pathos');
    const hasLogos = currentAppeals.includes('logos');

    panel.innerHTML = `
        <h4>Choose Rhetorical Appeal</h4>
        <div class="selected-word-display">"${wordText}"</div>
        <div class="selection-buttons">
            <button class="selection-btn ethos-btn" onclick="selectAppeal(${wordIndex}, 'ethos')">
                ${hasEthos ? '✓ ' : ''}Ethos - Credibility & Authority
            </button>
            <button class="selection-btn pathos-btn" onclick="selectAppeal(${wordIndex}, 'pathos')">
                ${hasPathos ? '✓ ' : ''}Pathos - Emotion & Values
            </button>
            <button class="selection-btn logos-btn" onclick="selectAppeal(${wordIndex}, 'logos')">
                ${hasLogos ? '✓ ' : ''}Logos - Logic & Evidence
            </button>
            <button class="selection-btn clear-btn" onclick="clearAppeal(${wordIndex})">
                Clear All Appeals
            </button>
        </div>
    `;

    // Add to document
    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    // Highlight the selected word
    const wordElements = document.querySelectorAll(`[data-index="${wordIndex}"]`);
    wordElements.forEach(el => el.classList.add('selected-for-marking'));
}

/**
 * Hide selection panel
 */
function hideSelectionPanel() {
    const overlay = document.querySelector('.selection-overlay');
    const panel = document.querySelector('.selection-panel');

    if (overlay) overlay.remove();
    if (panel) panel.remove();

    // Remove highlight from all words
    document.querySelectorAll('.selected-for-marking').forEach(el => {
        el.classList.remove('selected-for-marking');
    });

    currentSelectedWordIndex = null;
}

/**
 * Select an appeal for a word (can select multiple)
 */
function selectAppeal(wordIndex, appeal) {
    if (!userAnalysis[wordIndex]) {
        userAnalysis[wordIndex] = [];
    }

    const appeals = userAnalysis[wordIndex];

    // Toggle the appeal
    if (appeals.includes(appeal)) {
        // Remove it
        const index = appeals.indexOf(appeal);
        appeals.splice(index, 1);
    } else {
        // Add it
        appeals.push(appeal);
    }

    // Update visual
    updatePoemDisplay();
    updateStats();

    // Close panel after selection
    hideSelectionPanel();
}

/**
 * Clear all appeals from a word
 */
function clearAppeal(wordIndex) {
    userAnalysis[wordIndex] = [];

    // Update visual
    updatePoemDisplay();
    updateStats();

    // Close panel
    hideSelectionPanel();
}

/**
 * Update poem display with current markings
 */
function updatePoemDisplay() {
    const poem = poems[currentPoemIndex];
    const container = document.getElementById('poem-container');
    if (container) {
        container.innerHTML = generatePoemHTML(poem, false);
    }
}

/**
 * Update statistics display
 */
function updateStats() {
    const ethosCount = Object.values(userAnalysis).filter(appeals => appeals.includes('ethos')).length;
    const pathosCount = Object.values(userAnalysis).filter(appeals => appeals.includes('pathos')).length;
    const logosCount = Object.values(userAnalysis).filter(appeals => appeals.includes('logos')).length;

    const ethosEl = document.getElementById('ethos-count');
    const pathosEl = document.getElementById('pathos-count');
    const logosEl = document.getElementById('logos-count');

    if (ethosEl) ethosEl.textContent = ethosCount;
    if (pathosEl) pathosEl.textContent = pathosCount;
    if (logosEl) logosEl.textContent = logosCount;
}

/**
 * Compare user analysis with AI analysis
 */
function compareAnalyses(poem) {
    let agreements = 0;
    let userUnique = 0;
    let aiSuggestions = 0;

    // Check user's selections
    Object.keys(userAnalysis).forEach(wordIndex => {
        const userAppeals = userAnalysis[wordIndex];
        const aiAppeals = poem.aiAnalysis[wordIndex] || [];

        if (aiAppeals.length > 0) {
            // Check for any overlap
            const hasOverlap = userAppeals.some(appeal => aiAppeals.includes(appeal));
            if (hasOverlap) {
                agreements++;
            } else {
                userUnique++;
            }
        } else {
            userUnique++;
        }
    });

    // Check AI's selections that user missed
    Object.keys(poem.aiAnalysis).forEach(wordIndex => {
        if (!userAnalysis[wordIndex] || userAnalysis[wordIndex].length === 0) {
            aiSuggestions++;
        }
    });

    totalAgreements += agreements;
    totalPossible += Object.keys(poem.aiAnalysis).length;
    userUniqueInterpretations += userUnique;

    return { agreements, userUnique, aiSuggestions };
}

/**
 * Move to next step
 */
function nextStep() {
    const container = document.getElementById('game-content');
    container.style.opacity = '0';

    setTimeout(() => {
        currentStep++;
        loadStep();
    }, 300);
}

/**
 * Move to next poem
 */
function nextPoem() {
    const container = document.getElementById('game-content');
    container.style.opacity = '0';

    setTimeout(() => {
        currentPoemIndex++;
        currentStep = 1;
        userAnalysis = {};
        loadStep();
    }, 300);
}

/**
 * Show final summary with agentic vs generative AI comparison
 */
function showFinalSummary() {
    const container = document.getElementById('game-content');

    const agreementRate = totalPossible > 0 ? Math.round((totalAgreements / totalPossible) * 100) : 0;

    const html = `
        <div class="game-summary">
            <h3>🎓 Congratulations! You've Completed the Analysis</h3>

            <div class="summary-stats-grid">
                <div class="summary-stat">
                    <p class="stat-number">${poems.length}</p>
                    <p class="stat-label">Poems Analyzed</p>
                </div>
                <div class="summary-stat">
                    <p class="stat-number">${agreementRate}%</p>
                    <p class="stat-label">Agreement with AI</p>
                </div>
                <div class="summary-stat">
                    <p class="stat-number">${userUniqueInterpretations}</p>
                    <p class="stat-label">Your Unique Insights</p>
                </div>
            </div>

            <div class="agentic-comparison">
                <h3>Agentic AI vs. Generative AI</h3>

                <div class="comparison-grid">
                    <div class="comparison-column bad">
                        <h4>❌ Generative AI<br>(What We DIDN'T Do)</h4>
                        <div class="comparison-content">
                            <p class="comparison-prompt"><strong>Prompt:</strong> "Analyze the rhetoric in these poems"</p>
                            <p><strong>Result:</strong> AI writes complete analysis</p>
                            <p><strong>Your Role:</strong> Passive reader</p>
                            <p><strong>Authorship:</strong> AI's interpretation</p>
                            <p><strong>Learning:</strong> Minimal - you just read AI's work</p>
                        </div>
                    </div>

                    <div class="comparison-column good">
                        <h4>✓ Agentic AI<br>(What We DID Do)</h4>
                        <div class="comparison-content">
                            <p class="comparison-prompt"><strong>Prompt:</strong> "Help me verify my rhetorical analysis"</p>
                            <p><strong>Result:</strong> You analyzed, AI provided feedback</p>
                            <p><strong>Your Role:</strong> Active thinker</p>
                            <p><strong>Authorship:</strong> Your interpretation, AI-assisted</p>
                            <p><strong>Learning:</strong> Deep - you engaged critically</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="key-takeaway">
                <h4>🔑 Key Takeaway</h4>
                <p><strong>Agentic AI preserves your authorship by putting you in control.</strong> You make the intellectual choices, AI provides feedback and catches what you might have missed. This is how to use AI as a tool without surrendering your thinking.</p>
                <p>In academic writing and analysis, agentic AI helps you learn and grow, while generative AI can shortcut the learning process. Always ask: "Am I using AI to enhance my thinking, or replace it?"</p>
            </div>

            <div class="game-buttons">
                <button class="game-btn accent" onclick="startGame()">Play Again</button>
            </div>
        </div>
    `;

    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = html;
        container.style.opacity = '1';
    }, 300);
}
