/**
 * Poetry Explorer - Content-Focused Interactive Experience
 * Twine-style hypertext focused on Maya Angelou, Feminist Rhetoric, and Poetry Analysis
 * with student agency and polling functionality
 */

// Game State
const explorerState = {
    currentScreen: 'intro',
    responses: {
        initialReaction: '',
        rhetoricalChoice: null,
        interpretation: '',
        feministConnection: null,
        personalReflection: '',
        aiRole: null,
        finalThought: ''
    },
    screens: ['intro', 'poem', 'reaction', 'rhetoric', 'interpretation', 'feminism', 'reflection', 'ai-tool', 'results']
};

/**
 * Initialize the Poetry Explorer
 */
function initPoetryExplorer() {
    const launchButton = document.getElementById('launch-poetry-explorer');
    if (launchButton) {
        launchButton.addEventListener('click', openPoetryExplorer);
    }
}

/**
 * Open the explorer modal
 */
function openPoetryExplorer() {
    let overlay = document.getElementById('explorer-overlay');
    if (!overlay) {
        overlay = createExplorerOverlay();
        document.body.appendChild(overlay);
    }

    // Reset state
    explorerState.currentScreen = 'intro';
    explorerState.responses = {
        initialReaction: '',
        rhetoricalChoice: null,
        interpretation: '',
        feministConnection: null,
        personalReflection: '',
        aiRole: null,
        finalThought: ''
    };

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderExplorerScreen();
}

/**
 * Close the explorer modal
 */
function closePoetryExplorer() {
    const overlay = document.getElementById('explorer-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

/**
 * Create the explorer overlay structure
 */
function createExplorerOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'explorer-overlay';
    overlay.className = 'poetry-explorer-overlay hidden';

    overlay.innerHTML = `
        <div class="poetry-explorer-container">
            <button class="explorer-close-btn" onclick="closePoetryExplorer()" aria-label="Close">&times;</button>
            <div id="explorer-progress" class="explorer-progress"></div>
            <div id="explorer-content"></div>
        </div>
    `;

    return overlay;
}

/**
 * Update progress indicator
 */
function updateExplorerProgress() {
    const progressContainer = document.getElementById('explorer-progress');
    const currentIndex = explorerState.screens.indexOf(explorerState.currentScreen);

    progressContainer.innerHTML = explorerState.screens.map((screen, index) => {
        let className = 'progress-dot';
        if (index === currentIndex) className += ' active';
        if (index < currentIndex) className += ' completed';
        return `<div class="${className}"></div>`;
    }).join('');
}

/**
 * Render the current screen
 */
function renderExplorerScreen() {
    updateExplorerProgress();
    const content = document.getElementById('explorer-content');

    switch (explorerState.currentScreen) {
        case 'intro':
            content.innerHTML = renderIntroScreen();
            break;
        case 'poem':
            content.innerHTML = renderPoemScreen();
            break;
        case 'reaction':
            content.innerHTML = renderReactionScreen();
            setTimeout(() => {
                const input = document.getElementById('reaction-input');
                if (input) input.focus();
            }, 100);
            break;
        case 'rhetoric':
            content.innerHTML = renderRhetoricScreen();
            break;
        case 'interpretation':
            content.innerHTML = renderInterpretationScreen();
            setTimeout(() => {
                const input = document.getElementById('interpretation-input');
                if (input) input.focus();
            }, 100);
            break;
        case 'feminism':
            content.innerHTML = renderFeminismScreen();
            break;
        case 'reflection':
            content.innerHTML = renderReflectionScreen();
            setTimeout(() => {
                const input = document.getElementById('reflection-input');
                if (input) input.focus();
            }, 100);
            break;
        case 'ai-tool':
            content.innerHTML = renderAIToolScreen();
            break;
        case 'results':
            content.innerHTML = renderExplorerResults();
            break;
    }
}

/**
 * Intro Screen
 */
function renderIntroScreen() {
    return `
        <h2 class="explorer-title">🌟 Exploring Maya Angelou's Poetry</h2>
        <p class="explorer-subtitle">An Interactive Journey Through Feminist Rhetoric and Personal Voice</p>

        <div class="intro-content">
            <p class="intro-text">
                Welcome! In this experience, you'll engage with Maya Angelou's powerful poem
                <strong>"Still I Rise"</strong> through your own lens and voice.
            </p>

            <div class="intro-box">
                <h3>What You'll Do:</h3>
                <ul>
                    <li>📖 Read and react to the poem in your own words</li>
                    <li>🎯 Analyze rhetorical choices and their effects</li>
                    <li>💭 Share your interpretation and connect to feminist themes</li>
                    <li>🤖 Reflect on AI's role in poetry analysis</li>
                    <li>📊 See how your classmates responded</li>
                </ul>
            </div>

            <p class="intro-note">
                ✨ This is a space for <strong>your voice</strong> and <strong>your ideas</strong>.
                There are no wrong answers—just authentic engagement with powerful poetry.
            </p>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-primary-explorer" onclick="nextExplorerScreen()">
                Begin Journey →
            </button>
        </div>
    `;
}

/**
 * Poem Screen - Display "Still I Rise"
 */
function renderPoemScreen() {
    return `
        <h2 class="explorer-title">"Still I Rise" by Maya Angelou</h2>
        <p class="explorer-subtitle">Read this excerpt carefully</p>

        <div class="poem-display">
            <div class="poem-stanza">
                <p>You may write me down in history</p>
                <p>With your bitter, twisted lies,</p>
                <p>You may trod me in the very dirt</p>
                <p>But still, like dust, I'll rise.</p>
            </div>

            <div class="poem-stanza">
                <p>Does my sassiness upset you?</p>
                <p>Why are you beset with gloom?</p>
                <p>'Cause I walk like I've got oil wells</p>
                <p>Pumping in my living room.</p>
            </div>

            <div class="poem-stanza">
                <p>Out of the huts of history's shame</p>
                <p>I rise</p>
                <p>Up from a past that's rooted in pain</p>
                <p>I rise</p>
                <p>I'm a black ocean, leaping and wide,</p>
                <p>Welling and swelling I bear in the tide.</p>
            </div>

            <div class="poem-stanza">
                <p>Bringing the gifts that my ancestors gave,</p>
                <p>I am the dream and the hope of the slave.</p>
                <p>I rise</p>
                <p>I rise</p>
                <p>I rise.</p>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer" onclick="nextExplorerScreen()">
                Continue → Share Your Reaction
            </button>
        </div>
    `;
}

/**
 * Initial Reaction Screen
 */
function renderReactionScreen() {
    return `
        <h2 class="explorer-title">Your First Reaction</h2>
        <p class="explorer-subtitle">What struck you most about this poem?</p>

        <div class="input-container">
            <label for="reaction-input" class="input-label">
                💭 In your own words, what's your immediate reaction to "Still I Rise"?
            </label>
            <textarea
                id="reaction-input"
                class="explorer-textarea"
                placeholder="Share your honest thoughts... What emotions did it evoke? What lines stood out? What questions does it raise for you?"
                rows="6"
                onkeyup="updateExplorerResponse('initialReaction', this.value)"
            >${explorerState.responses.initialReaction}</textarea>
            <p class="input-hint">
                ✨ This is your space—write freely and authentically
            </p>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer" onclick="nextExplorerScreen()">
                Continue → Analyze Rhetoric
            </button>
        </div>
    `;
}

/**
 * Rhetoric Analysis Screen
 */
function renderRhetoricScreen() {
    return `
        <h2 class="explorer-title">Rhetorical Power</h2>
        <p class="explorer-subtitle">What makes this poem so powerful?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.rhetoricalChoice === 'repetition' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalChoice', 'repetition')">
                <div class="choice-icon">🔁</div>
                <div class="choice-title">Repetition & Anaphora</div>
                <div class="choice-desc">
                    The phrase "I rise" repeated creates a drumbeat of resilience—
                    each repetition builds momentum and emphasizes triumph over oppression.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalChoice === 'metaphor' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalChoice', 'metaphor')">
                <div class="choice-icon">🌊</div>
                <div class="choice-title">Powerful Metaphors</div>
                <div class="choice-desc">
                    "Like dust, I'll rise" and "I'm a black ocean"—these images transform
                    the speaker from oppressed to unstoppable natural force.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalChoice === 'questions' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalChoice', 'questions')">
                <div class="choice-icon">❓</div>
                <div class="choice-title">Rhetorical Questions</div>
                <div class="choice-desc">
                    "Does my sassiness upset you?"—questions challenge the oppressor
                    directly and reclaim power through confident self-assertion.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalChoice === 'tone' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalChoice', 'tone')">
                <div class="choice-icon">💪</div>
                <div class="choice-title">Defiant Tone & Voice</div>
                <div class="choice-desc">
                    The confident, unapologetic voice refuses victimhood—
                    Angelou speaks from a position of strength, not plea.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.rhetoricalChoice ? 'disabled' : ''}>
                Continue → Your Interpretation
            </button>
        </div>
    `;
}

/**
 * Interpretation Screen
 */
function renderInterpretationScreen() {
    return `
        <h2 class="explorer-title">Deepen Your Interpretation</h2>
        <p class="explorer-subtitle">What does "rising" mean to you in this context?</p>

        <div class="input-container">
            <label for="interpretation-input" class="input-label">
                🎯 How do you interpret the central metaphor of "rising"?
            </label>
            <textarea
                id="interpretation-input"
                class="explorer-textarea"
                placeholder="Consider: Is it about personal resilience? Collective resistance? Historical memory? Liberation? What does 'rising' mean for Maya Angelou as a Black woman in America?"
                rows="6"
                onkeyup="updateExplorerResponse('interpretation', this.value)"
            >${explorerState.responses.interpretation}</textarea>
            <p class="input-hint">
                💡 Connect the poem to its historical context and Angelou's identity
            </p>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer" onclick="nextExplorerScreen()">
                Continue → Feminist Rhetoric
            </button>
        </div>
    `;
}

/**
 * Feminist Connection Screen
 */
function renderFeminismScreen() {
    return `
        <h2 class="explorer-title">Feminist Rhetoric in Action</h2>
        <p class="explorer-subtitle">How does Angelou embody feminist rhetorical principles?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.feministConnection === 'voice' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministConnection', 'voice')">
                <div class="choice-icon">🗣️</div>
                <div class="choice-title">Reclaiming Voice</div>
                <div class="choice-desc">
                    Angelou centers her own voice and experience—refusing silence
                    imposed by patriarchy and racism. She speaks from authority.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.feministConnection === 'body' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministConnection', 'body')">
                <div class="choice-icon">💃</div>
                <div class="choice-title">Body as Site of Power</div>
                <div class="choice-desc">
                    The poem celebrates the body—sassiness, walking with confidence—
                    rejecting shame and reclaiming bodily agency.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.feministConnection === 'intersectional' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministConnection', 'intersectional')">
                <div class="choice-icon">🌈</div>
                <div class="choice-title">Intersectional Identity</div>
                <div class="choice-desc">
                    Angelou speaks as a Black woman—her feminism is inseparable from
                    racial justice. This is intersectional rhetoric in practice.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.feministConnection === 'resistance' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministConnection', 'resistance')">
                <div class="choice-icon">✊</div>
                <div class="choice-title">Rhetoric as Resistance</div>
                <div class="choice-desc">
                    Language itself becomes a tool of liberation—the poem performs
                    resistance through its very existence and unapologetic stance.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.feministConnection ? 'disabled' : ''}>
                Continue → Personal Reflection
            </button>
        </div>
    `;
}

/**
 * Personal Reflection Screen
 */
function renderReflectionScreen() {
    return `
        <h2 class="explorer-title">Connect to Your Own Experience</h2>
        <p class="explorer-subtitle">Bring your own voice and perspective</p>

        <div class="input-container">
            <label for="reflection-input" class="input-label">
                💫 How does this poem connect to your life, identity, or struggles you've witnessed?
            </label>
            <textarea
                id="reflection-input"
                class="explorer-textarea"
                placeholder="This is deeply personal—share as much or as little as feels right. You might consider: Have you experienced having to 'rise' in your own way? What forms of resilience have you seen in your communities? How does this poem speak to your identity?"
                rows="6"
                onkeyup="updateExplorerResponse('personalReflection', this.value)"
            >${explorerState.responses.personalReflection}</textarea>
            <p class="input-hint">
                🤍 Your story matters—poetry is a bridge between past and present, self and other
            </p>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer" onclick="nextExplorerScreen()">
                Continue → AI & Analysis
            </button>
        </div>
    `;
}

/**
 * AI Tool Reflection Screen
 */
function renderAIToolScreen() {
    return `
        <h2 class="explorer-title">AI in Poetry Analysis</h2>
        <p class="explorer-subtitle">What role should AI play in understanding poetry like this?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.aiRole === 'starter' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiRole', 'starter')">
                <div class="choice-icon">🚀</div>
                <div class="choice-title">Starting Point</div>
                <div class="choice-desc">
                    AI can identify literary devices and provide context, but human
                    interpretation—especially of lived experience—is essential.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.aiRole === 'complement' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiRole', 'complement')">
                <div class="choice-icon">🤝</div>
                <div class="choice-title">Collaborative Partner</div>
                <div class="choice-desc">
                    AI and humans analyze together—AI offers patterns and connections,
                    while we bring emotional depth and cultural understanding.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.aiRole === 'limited' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiRole', 'limited')">
                <div class="choice-icon">⚠️</div>
                <div class="choice-title">Limited Role</div>
                <div class="choice-desc">
                    AI lacks the lived experience of oppression and resilience—
                    it can't truly understand what "Still I Rise" means to marginalized people.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.aiRole === 'dangerous' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiRole', 'dangerous')">
                <div class="choice-icon">🚫</div>
                <div class="choice-title">Risk of Harm</div>
                <div class="choice-desc">
                    AI might flatten the poem's radical politics or erase the specific
                    context of Black feminist resistance. Use with caution.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.aiRole ? 'disabled' : ''}>
                See Your Journey & Class Insights →
            </button>
        </div>
    `;
}

/**
 * Results Screen with Polling Data
 */
function renderExplorerResults() {
    // Save response and get statistics
    const stats = saveExplorerResponse();

    const rhetChoiceText = {
        'repetition': 'Repetition & Anaphora',
        'metaphor': 'Powerful Metaphors',
        'questions': 'Rhetorical Questions',
        'tone': 'Defiant Tone & Voice'
    }[explorerState.responses.rhetoricalChoice];

    const femText = {
        'voice': 'Reclaiming Voice',
        'body': 'Body as Site of Power',
        'intersectional': 'Intersectional Identity',
        'resistance': 'Rhetoric as Resistance'
    }[explorerState.responses.feministConnection];

    const aiText = {
        'starter': 'Starting Point',
        'complement': 'Collaborative Partner',
        'limited': 'Limited Role',
        'dangerous': 'Risk of Harm'
    }[explorerState.responses.aiRole];

    return `
        <h2 class="explorer-title">Your Poetry Analysis Journey</h2>
        <p class="explorer-subtitle">Thank you for sharing your voice and insights</p>

        <div class="results-container">
            <div class="results-summary">
                <h3 style="color: var(--neon-purple); margin-bottom: var(--spacing-lg); font-size: 1.5rem;">
                    📝 Your Responses
                </h3>

                ${explorerState.responses.initialReaction ? `
                <div class="results-item">
                    <span class="results-label">Initial Reaction:</span>
                    <span class="results-value">"${explorerState.responses.initialReaction.substring(0, 100)}${explorerState.responses.initialReaction.length > 100 ? '...' : ''}"</span>
                </div>
                ` : ''}

                <div class="results-item">
                    <span class="results-label">Key Rhetorical Element:</span>
                    <span class="results-value">${rhetChoiceText}</span>
                </div>

                ${explorerState.responses.interpretation ? `
                <div class="results-item">
                    <span class="results-label">Your Interpretation of "Rising":</span>
                    <span class="results-value">"${explorerState.responses.interpretation.substring(0, 100)}${explorerState.responses.interpretation.length > 100 ? '...' : ''}"</span>
                </div>
                ` : ''}

                <div class="results-item">
                    <span class="results-label">Feminist Rhetoric Connection:</span>
                    <span class="results-value">${femText}</span>
                </div>

                ${explorerState.responses.personalReflection ? `
                <div class="results-item">
                    <span class="results-label">Personal Connection:</span>
                    <span class="results-value">"${explorerState.responses.personalReflection.substring(0, 100)}${explorerState.responses.personalReflection.length > 100 ? '...' : ''}"</span>
                </div>
                ` : ''}

                <div class="results-item">
                    <span class="results-label">AI's Role in Poetry Analysis:</span>
                    <span class="results-value">${aiText}</span>
                </div>
            </div>

            ${renderExplorerPollStatistics(stats)}

            <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); border-radius: var(--radius-lg);">
                <h3 style="color: var(--neon-purple); margin-bottom: var(--spacing-md); font-size: 1.5rem;">
                    ✨ Continue Your Learning
                </h3>
                <p style="line-height: 1.8; color: var(--text-primary);">
                    Your engagement with "Still I Rise" is just the beginning. Consider:
                </p>
                <ul style="line-height: 2; color: var(--text-primary); margin: var(--spacing-md) 0 var(--spacing-md) var(--spacing-lg);">
                    <li>📚 Read more of Maya Angelou's poetry and autobiography</li>
                    <li>🎯 Compare your interpretation with your classmates in discussion</li>
                    <li>💭 Explore other Black feminist poets and writers</li>
                    <li>🤖 Experiment with AI tools—but center human experience and insight</li>
                </ul>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="restartExplorer()">
                ↺ Start Over
            </button>
            <button class="explorer-btn btn-primary-explorer" onclick="closePoetryExplorer()">
                Return to Activities →
            </button>
        </div>
    `;
}

/**
 * Render polling statistics
 */
function renderExplorerPollStatistics(stats) {
    const calcPercent = (count) => Math.round((count / stats.total) * 100);

    // Get most popular choices
    const topRhet = Object.entries(stats.rhetoricalChoice).sort((a, b) => b[1] - a[1])[0];
    const topFem = Object.entries(stats.feministConnection).sort((a, b) => b[1] - a[1])[0];
    const topAI = Object.entries(stats.aiRole).sort((a, b) => b[1] - a[1])[0];

    const rhetNames = {
        'repetition': 'Repetition & Anaphora',
        'metaphor': 'Powerful Metaphors',
        'questions': 'Rhetorical Questions',
        'tone': 'Defiant Tone'
    };

    const femNames = {
        'voice': 'Reclaiming Voice',
        'body': 'Body as Power',
        'intersectional': 'Intersectionality',
        'resistance': 'Rhetoric as Resistance'
    };

    const aiNames = {
        'starter': 'Starting Point',
        'complement': 'Collaborative Partner',
        'limited': 'Limited Role',
        'dangerous': 'Risk of Harm'
    };

    return `
        <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: #f8f9fa; border-radius: var(--radius-lg); border: 3px solid var(--neon-cyan);">
            <h3 style="color: var(--neon-cyan); margin-bottom: var(--spacing-md); font-size: 1.5rem; text-align: center;">
                📊 How Your Classmates Responded
            </h3>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
                Based on ${stats.total} student${stats.total !== 1 ? 's' : ''} who explored the poem
            </p>

            <div class="poll-stats-grid">
                ${topRhet ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Most Noticed Rhetorical Element</div>
                    <div class="poll-stat-value">${rhetNames[topRhet[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topRhet[1])}%</div>
                </div>
                ` : ''}

                ${topFem ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Top Feminist Connection</div>
                    <div class="poll-stat-value">${femNames[topFem[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topFem[1])}%</div>
                </div>
                ` : ''}

                ${topAI ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Most Common AI Perspective</div>
                    <div class="poll-stat-value">${aiNames[topAI[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topAI[1])}%</div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Save response data and retrieve aggregate statistics
 */
function saveExplorerResponse() {
    // Get existing responses from localStorage
    let responses = JSON.parse(localStorage.getItem('poetryExplorerResponses') || '[]');

    // Add current response with timestamp
    responses.push({
        timestamp: new Date().toISOString(),
        ...explorerState.responses
    });

    // Save back to localStorage
    localStorage.setItem('poetryExplorerResponses', JSON.stringify(responses));

    return calculateExplorerStatistics(responses);
}

/**
 * Calculate aggregate statistics from all responses
 */
function calculateExplorerStatistics(responses) {
    const total = responses.length;

    const stats = {
        total,
        rhetoricalChoice: {},
        feministConnection: {},
        aiRole: {}
    };

    // Count occurrences for each field
    responses.forEach(response => {
        if (response.rhetoricalChoice) {
            stats.rhetoricalChoice[response.rhetoricalChoice] = (stats.rhetoricalChoice[response.rhetoricalChoice] || 0) + 1;
        }
        if (response.feministConnection) {
            stats.feministConnection[response.feministConnection] = (stats.feministConnection[response.feministConnection] || 0) + 1;
        }
        if (response.aiRole) {
            stats.aiRole[response.aiRole] = (stats.aiRole[response.aiRole] || 0) + 1;
        }
    });

    return stats;
}

/**
 * Update response in state
 */
function updateExplorerResponse(field, value) {
    explorerState.responses[field] = value;
}

/**
 * Select a choice
 */
function selectExplorerChoice(field, value) {
    explorerState.responses[field] = value;
    renderExplorerScreen();
}

/**
 * Navigation Functions
 */
function nextExplorerScreen() {
    const currentIndex = explorerState.screens.indexOf(explorerState.currentScreen);
    if (currentIndex < explorerState.screens.length - 1) {
        explorerState.currentScreen = explorerState.screens[currentIndex + 1];
        renderExplorerScreen();
    }
}

function previousExplorerScreen() {
    const currentIndex = explorerState.screens.indexOf(explorerState.currentScreen);
    if (currentIndex > 0) {
        explorerState.currentScreen = explorerState.screens[currentIndex - 1];
        renderExplorerScreen();
    }
}

function restartExplorer() {
    explorerState.currentScreen = 'intro';
    explorerState.responses = {
        initialReaction: '',
        rhetoricalChoice: null,
        interpretation: '',
        feministConnection: null,
        personalReflection: '',
        aiRole: null,
        finalThought: ''
    };
    renderExplorerScreen();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPoetryExplorer);
} else {
    initPoetryExplorer();
}
