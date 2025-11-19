/**
 * Poetry Explorer - Academic Analysis of "Still I Rise"
 * Purely analytical exercise focused on rhetorical theory, feminist criticism, and AI literacy
 * NO personal reflections - only scholarly analysis
 */

// Game State - All multiple choice, no text inputs
const explorerState = {
    currentScreen: 'intro',
    responses: {
        rhetoricalDevice: null,
        rhetoricalEffect: null,
        feministStrategy: null,
        intersectionalElement: null,
        aiLimitation: null,
        scholarlyApplication: null
    },
    screens: ['intro', 'poem', 'device', 'effect', 'feminist', 'intersectional', 'ai-limits', 'application', 'results']
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
        rhetoricalDevice: null,
        rhetoricalEffect: null,
        feministStrategy: null,
        intersectionalElement: null,
        aiLimitation: null,
        scholarlyApplication: null
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
        case 'device':
            content.innerHTML = renderDeviceScreen();
            break;
        case 'effect':
            content.innerHTML = renderEffectScreen();
            break;
        case 'feminist':
            content.innerHTML = renderFeministScreen();
            break;
        case 'intersectional':
            content.innerHTML = renderIntersectionalScreen();
            break;
        case 'ai-limits':
            content.innerHTML = renderAILimitsScreen();
            break;
        case 'application':
            content.innerHTML = renderApplicationScreen();
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
        <h2 class="explorer-title">📚 Analyzing "Still I Rise"</h2>
        <p class="explorer-subtitle">A Rigorous Study of Maya Angelou's Feminist Rhetoric</p>

        <div class="intro-content">
            <p class="intro-text">
                This analytical exercise examines Maya Angelou's <strong>"Still I Rise"</strong> through
                the frameworks of rhetorical theory, feminist criticism, and AI literacy studies.
            </p>

            <div class="intro-box">
                <h3>Learning Objectives:</h3>
                <ul>
                    <li>📖 Identify specific rhetorical devices in resistance poetry</li>
                    <li>🎯 Analyze the persuasive effects of Angelou's linguistic choices</li>
                    <li>💭 Apply feminist rhetorical theory to textual interpretation</li>
                    <li>🔍 Examine intersectionality in Black feminist writing</li>
                    <li>🤖 Critique AI's limitations in cultural and rhetorical analysis</li>
                    <li>📊 Compare your scholarly analysis with class polling data</li>
                </ul>
            </div>

            <p class="intro-note">
                📖 This is a <strong>scholarly analysis exercise</strong>—all questions are analytical, not personal.
            </p>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-primary-explorer" onclick="nextExplorerScreen()">
                Begin Analysis →
            </button>
        </div>
    `;
}

/**
 * Poem Screen
 */
function renderPoemScreen() {
    return `
        <h2 class="explorer-title">"Still I Rise" by Maya Angelou</h2>
        <p class="explorer-subtitle">Read this excerpt for analysis</p>

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
                Continue → Identify Rhetorical Device
            </button>
        </div>
    `;
}

/**
 * Rhetorical Device Screen
 */
function renderDeviceScreen() {
    return `
        <h2 class="explorer-title">Identify the Primary Rhetorical Device</h2>
        <p class="explorer-subtitle">Which rhetorical device is most structurally prominent?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.rhetoricalDevice === 'anaphora' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalDevice', 'anaphora')">
                <div class="choice-icon">🔁</div>
                <div class="choice-title">Anaphora</div>
                <div class="choice-desc">
                    The deliberate repetition of "I rise" at the beginning of successive clauses.
                    This creates rhythmic emphasis and cumulative rhetorical force.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalDevice === 'apostrophe' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalDevice', 'apostrophe')">
                <div class="choice-icon">💬</div>
                <div class="choice-title">Apostrophe</div>
                <div class="choice-desc">
                    Direct address to an oppressive "you," creating confrontation and positioning
                    the reader as witness to an act of resistance.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalDevice === 'metaphor' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalDevice', 'metaphor')">
                <div class="choice-icon">🌊</div>
                <div class="choice-title">Extended Metaphor</div>
                <div class="choice-desc">
                    Natural imagery ("dust," "black ocean") transforms the speaker from oppressed
                    subject into elemental, unstoppable natural force.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalDevice === 'interrogatio' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalDevice', 'interrogatio')">
                <div class="choice-icon">❓</div>
                <div class="choice-title">Interrogatio</div>
                <div class="choice-desc">
                    Rhetorical questions ("Does my sassiness upset you?") challenge oppressive
                    authority and reverse the power dynamic through pointed inquiry.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.rhetoricalDevice ? 'disabled' : ''}>
                Continue → Analyze Effect
            </button>
        </div>
    `;
}

/**
 * Rhetorical Effect Screen
 */
function renderEffectScreen() {
    return `
        <h2 class="explorer-title">Analyze the Rhetorical Effect</h2>
        <p class="explorer-subtitle">What persuasive effect does Angelou's rhetoric primarily achieve?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.rhetoricalEffect === 'ethos' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalEffect', 'ethos')">
                <div class="choice-icon">👑</div>
                <div class="choice-title">Establishes Ethos</div>
                <div class="choice-desc">
                    Angelou asserts credibility and authority by claiming ancestral connection,
                    positioning herself as heir to enslaved ancestors' dreams and struggles.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalEffect === 'pathos' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalEffect', 'pathos')">
                <div class="choice-icon">💪</div>
                <div class="choice-title">Evokes Defiant Pathos</div>
                <div class="choice-desc">
                    The poem doesn't seek sympathy—it generates fierce pride and collective
                    empowerment through triumphant, unapologetic emotional tone.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalEffect === 'reversal' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalEffect', 'reversal')">
                <div class="choice-icon">🔄</div>
                <div class="choice-title">Performs Reversal</div>
                <div class="choice-desc">
                    The poem inverts oppression into strength—transforming "dust" (degradation)
                    into "ocean" (overwhelming power). Victimhood becomes triumph.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.rhetoricalEffect === 'witness' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('rhetoricalEffect', 'witness')">
                <div class="choice-icon">👁️</div>
                <div class="choice-title">Demands Witness</div>
                <div class="choice-desc">
                    By addressing "you," the poem forces the audience to acknowledge complicity
                    or choose solidarity—there is no neutral position for the reader.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.rhetoricalEffect ? 'disabled' : ''}>
                Continue → Feminist Theory
            </button>
        </div>
    `;
}

/**
 * Feminist Strategy Screen
 */
function renderFeministScreen() {
    return `
        <h2 class="explorer-title">Feminist Rhetorical Strategy</h2>
        <p class="explorer-subtitle">Which feminist rhetorical principle does Angelou most embody?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.feministStrategy === 'voice' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministStrategy', 'voice')">
                <div class="choice-icon">🗣️</div>
                <div class="choice-title">Reclaiming Marginalized Voice</div>
                <div class="choice-desc">
                    Angelou centers her own voice and experience, refusing the silence imposed
                    by patriarchy and white supremacy. She speaks from authority, not supplication.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.feministStrategy === 'embodiment' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministStrategy', 'embodiment')">
                <div class="choice-icon">💃</div>
                <div class="choice-title">Embodied Rhetoric</div>
                <div class="choice-desc">
                    The poem celebrates the body—"sassiness," confident walking—rejecting
                    shame and reclaiming bodily agency against objectification.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.feministStrategy === 'collective' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministStrategy', 'collective')">
                <div class="choice-icon">🤝</div>
                <div class="choice-title">Collective Identity</div>
                <div class="choice-desc">
                    "I" becomes collective—Angelou speaks for enslaved ancestors and future
                    generations. Individual voice carries communal experience and resistance.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.feministStrategy === 'subversion' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('feministStrategy', 'subversion')">
                <div class="choice-icon">⚡</div>
                <div class="choice-title">Rhetorical Subversion</div>
                <div class="choice-desc">
                    Language itself becomes a tool of liberation—the poem performs resistance
                    through its existence, using the master's language against the master's logic.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.feministStrategy ? 'disabled' : ''}>
                Continue → Intersectionality
            </button>
        </div>
    `;
}

/**
 * Intersectional Analysis Screen
 */
function renderIntersectionalScreen() {
    return `
        <h2 class="explorer-title">Intersectional Analysis</h2>
        <p class="explorer-subtitle">How does Angelou address intersecting systems of oppression?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.intersectionalElement === 'race-gender' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('intersectionalElement', 'race-gender')">
                <div class="choice-icon">🌈</div>
                <div class="choice-title">Race-Gender Inseparability</div>
                <div class="choice-desc">
                    Angelou speaks as a Black woman—her feminism is inseparable from racial
                    justice. The poem refuses to prioritize one identity over another.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.intersectionalElement === 'historical' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('intersectionalElement', 'historical')">
                <div class="choice-icon">⏳</div>
                <div class="choice-title">Historical Continuity</div>
                <div class="choice-desc">
                    The poem connects slavery to contemporary oppression—showing how systems
                    of domination persist across time and require ongoing resistance.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.intersectionalElement === 'economic' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('intersectionalElement', 'economic')">
                <div class="choice-icon">💎</div>
                <div class="choice-title">Economic Resistance</div>
                <div class="choice-desc">
                    "Oil wells pumping in my living room"—Angelou claims economic power and
                    wealth as deserved reparation, not charity or luck.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.intersectionalElement === 'epistemic' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('intersectionalElement', 'epistemic')">
                <div class="choice-icon">📖</div>
                <div class="choice-title">Epistemic Justice</div>
                <div class="choice-desc">
                    "You may write me down in history / With your bitter, twisted lies"—Angelou
                    challenges who controls knowledge and whose stories are considered truth.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.intersectionalElement ? 'disabled' : ''}>
                Continue → AI Analysis Critique
            </button>
        </div>
    `;
}

/**
 * AI Limitations Screen
 */
function renderAILimitsScreen() {
    return `
        <h2 class="explorer-title">AI's Limitations in Analyzing This Poem</h2>
        <p class="explorer-subtitle">What can AI NOT adequately understand about "Still I Rise"?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.aiLimitation === 'lived-experience' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiLimitation', 'lived-experience')">
                <div class="choice-icon">❌</div>
                <div class="choice-title">Lived Experience</div>
                <div class="choice-desc">
                    AI has no embodied experience of oppression, resilience, or what it means
                    to be a Black woman in America. It can identify patterns, not feel them.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.aiLimitation === 'cultural-context' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiLimitation', 'cultural-context')">
                <div class="choice-icon">🌍</div>
                <div class="choice-title">Deep Cultural Context</div>
                <div class="choice-desc">
                    AI may miss cultural references, coded language, and the historical weight
                    of phrases that resonate within Black communities and feminist movements.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.aiLimitation === 'ethical-stakes' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiLimitation', 'ethical-stakes')">
                <div class="choice-icon">⚖️</div>
                <div class="choice-title">Ethical Stakes</div>
                <div class="choice-desc">
                    AI cannot grasp why this poem matters—the moral urgency of resistance poetry.
                    It sees words, not the lives and struggles they represent.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.aiLimitation === 'political-power' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('aiLimitation', 'political-power')">
                <div class="choice-icon">🚫</div>
                <div class="choice-title">Political Power Dynamics</div>
                <div class="choice-desc">
                    AI analysis can flatten radical politics—turning liberation poetry into
                    aesthetic exercise without understanding its function as political intervention.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.aiLimitation ? 'disabled' : ''}>
                Continue → Scholarly Application
            </button>
        </div>
    `;
}

/**
 * Scholarly Application Screen
 */
function renderApplicationScreen() {
    return `
        <h2 class="explorer-title">Applying This Analysis</h2>
        <p class="explorer-subtitle">How would you use this poem in scholarly work?</p>

        <div class="choice-grid">
            <div class="explorer-choice-card ${explorerState.responses.scholarlyApplication === 'model' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('scholarlyApplication', 'model')">
                <div class="choice-icon">📘</div>
                <div class="choice-title">Model of Feminist Rhetoric</div>
                <div class="choice-desc">
                    Use it to teach rhetorical strategies of resistance—show students how
                    marginalized voices claim authority and reverse oppressive narratives.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.scholarlyApplication === 'theory' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('scholarlyApplication', 'theory')">
                <div class="choice-icon">🔬</div>
                <div class="choice-title">Test Case for Theory</div>
                <div class="choice-desc">
                    Apply intersectional feminist theory—demonstrate how race, gender, class,
                    and history intersect in a single text and cannot be separated.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.scholarlyApplication === 'ai-critique' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('scholarlyApplication', 'ai-critique')">
                <div class="choice-icon">🤖</div>
                <div class="choice-title">Critique AI Analysis</div>
                <div class="choice-desc">
                    Use it to demonstrate AI's limits—compare machine reading to human
                    interpretation rooted in cultural knowledge and lived experience.
                </div>
            </div>

            <div class="explorer-choice-card ${explorerState.responses.scholarlyApplication === 'pedagogy' ? 'selected' : ''}"
                 onclick="selectExplorerChoice('scholarlyApplication', 'pedagogy')">
                <div class="choice-icon">🎓</div>
                <div class="choice-title">Pedagogical Tool</div>
                <div class="choice-desc">
                    Center marginalized voices in curriculum—teach students to recognize and
                    value knowledge produced by historically excluded communities.
                </div>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="previousExplorerScreen()">
                ← Back
            </button>
            <button class="explorer-btn btn-primary-explorer"
                    onclick="nextExplorerScreen()"
                    ${!explorerState.responses.scholarlyApplication ? 'disabled' : ''}>
                See Your Analysis & Class Data →
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

    const deviceText = {
        'anaphora': 'Anaphora (Repetition)',
        'apostrophe': 'Apostrophe (Direct Address)',
        'metaphor': 'Extended Metaphor',
        'interrogatio': 'Interrogatio (Rhetorical Questions)'
    }[explorerState.responses.rhetoricalDevice];

    const effectText = {
        'ethos': 'Establishes Ethos',
        'pathos': 'Evokes Defiant Pathos',
        'reversal': 'Performs Reversal',
        'witness': 'Demands Witness'
    }[explorerState.responses.rhetoricalEffect];

    const feministText = {
        'voice': 'Reclaiming Marginalized Voice',
        'embodiment': 'Embodied Rhetoric',
        'collective': 'Collective Identity',
        'subversion': 'Rhetorical Subversion'
    }[explorerState.responses.feministStrategy];

    const intersectionalText = {
        'race-gender': 'Race-Gender Inseparability',
        'historical': 'Historical Continuity',
        'economic': 'Economic Resistance',
        'epistemic': 'Epistemic Justice'
    }[explorerState.responses.intersectionalElement];

    const aiLimitText = {
        'lived-experience': 'Cannot Grasp Lived Experience',
        'cultural-context': 'Misses Deep Cultural Context',
        'ethical-stakes': 'No Understanding of Ethical Stakes',
        'political-power': 'Flattens Political Power Dynamics'
    }[explorerState.responses.aiLimitation];

    const appText = {
        'model': 'Model of Feminist Rhetoric',
        'theory': 'Test Case for Theory',
        'ai-critique': 'Critique AI Analysis',
        'pedagogy': 'Pedagogical Tool'
    }[explorerState.responses.scholarlyApplication];

    return `
        <h2 class="explorer-title">Your Scholarly Analysis</h2>
        <p class="explorer-subtitle">Analysis complete—review your interpretive choices</p>

        <div class="results-container">
            <div class="results-summary">
                <h3 style="color: var(--neon-purple); margin-bottom: var(--spacing-lg); font-size: 1.5rem;">
                    📖 Your Analytical Choices
                </h3>

                <div class="results-item">
                    <span class="results-label">Primary Rhetorical Device:</span>
                    <span class="results-value">${deviceText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Rhetorical Effect:</span>
                    <span class="results-value">${effectText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Feminist Strategy:</span>
                    <span class="results-value">${feministText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Intersectional Element:</span>
                    <span class="results-value">${intersectionalText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">AI's Primary Limitation:</span>
                    <span class="results-value">${aiLimitText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Scholarly Application:</span>
                    <span class="results-value">${appText}</span>
                </div>
            </div>

            ${renderExplorerPollStatistics(stats)}

            <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); border-radius: var(--radius-lg);">
                <h3 style="color: var(--neon-purple); margin-bottom: var(--spacing-md); font-size: 1.5rem;">
                    📚 Further Study
                </h3>
                <p style="line-height: 1.8; color: var(--text-primary);">
                    Continue developing your analytical skills:
                </p>
                <ul style="line-height: 2; color: var(--text-primary); margin: var(--spacing-md) 0 var(--spacing-md) var(--spacing-lg);">
                    <li>📖 Read more Black feminist poetry and criticism</li>
                    <li>🎯 Compare your analysis with published scholarly interpretations</li>
                    <li>💭 Explore other intersectional rhetorical theories</li>
                    <li>🤖 Test AI tools on this poem—observe their limitations firsthand</li>
                </ul>
            </div>
        </div>

        <div class="explorer-actions">
            <button class="explorer-btn btn-secondary-explorer" onclick="restartExplorer()">
                ↺ Analyze Again
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
    const topDevice = Object.entries(stats.rhetoricalDevice).sort((a, b) => b[1] - a[1])[0];
    const topEffect = Object.entries(stats.rhetoricalEffect).sort((a, b) => b[1] - a[1])[0];
    const topFeminist = Object.entries(stats.feministStrategy).sort((a, b) => b[1] - a[1])[0];
    const topIntersectional = Object.entries(stats.intersectionalElement).sort((a, b) => b[1] - a[1])[0];
    const topAI = Object.entries(stats.aiLimitation).sort((a, b) => b[1] - a[1])[0];

    const deviceNames = {
        'anaphora': 'Anaphora',
        'apostrophe': 'Apostrophe',
        'metaphor': 'Extended Metaphor',
        'interrogatio': 'Interrogatio'
    };

    const effectNames = {
        'ethos': 'Establishes Ethos',
        'pathos': 'Defiant Pathos',
        'reversal': 'Performs Reversal',
        'witness': 'Demands Witness'
    };

    const feministNames = {
        'voice': 'Reclaiming Voice',
        'embodiment': 'Embodied Rhetoric',
        'collective': 'Collective Identity',
        'subversion': 'Rhetorical Subversion'
    };

    const intersectionalNames = {
        'race-gender': 'Race-Gender Inseparability',
        'historical': 'Historical Continuity',
        'economic': 'Economic Resistance',
        'epistemic': 'Epistemic Justice'
    };

    const aiNames = {
        'lived-experience': 'Lived Experience Gap',
        'cultural-context': 'Cultural Context Gap',
        'ethical-stakes': 'Ethical Stakes Gap',
        'political-power': 'Political Power Blindness'
    };

    return `
        <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: #f8f9fa; border-radius: var(--radius-lg); border: 3px solid var(--neon-cyan);">
            <h3 style="color: var(--neon-cyan); margin-bottom: var(--spacing-md); font-size: 1.5rem; text-align: center;">
                📊 Class Analysis Patterns
            </h3>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
                Based on ${stats.total} student${stats.total !== 1 ? 's' : ''} who completed the analysis
            </p>

            <div class="poll-stats-grid">
                ${topDevice ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Most Identified Device</div>
                    <div class="poll-stat-value">${deviceNames[topDevice[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topDevice[1])}%</div>
                </div>
                ` : ''}

                ${topEffect ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Top Rhetorical Effect</div>
                    <div class="poll-stat-value">${effectNames[topEffect[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topEffect[1])}%</div>
                </div>
                ` : ''}

                ${topFeminist ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Most Chosen Feminist Strategy</div>
                    <div class="poll-stat-value">${feministNames[topFeminist[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topFeminist[1])}%</div>
                </div>
                ` : ''}

                ${topIntersectional ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Top Intersectional Element</div>
                    <div class="poll-stat-value">${intersectionalNames[topIntersectional[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topIntersectional[1])}%</div>
                </div>
                ` : ''}

                ${topAI ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Primary AI Limitation</div>
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
        rhetoricalDevice: {},
        rhetoricalEffect: {},
        feministStrategy: {},
        intersectionalElement: {},
        aiLimitation: {},
        scholarlyApplication: {}
    };

    // Count occurrences for each field
    responses.forEach(response => {
        if (response.rhetoricalDevice) {
            stats.rhetoricalDevice[response.rhetoricalDevice] = (stats.rhetoricalDevice[response.rhetoricalDevice] || 0) + 1;
        }
        if (response.rhetoricalEffect) {
            stats.rhetoricalEffect[response.rhetoricalEffect] = (stats.rhetoricalEffect[response.rhetoricalEffect] || 0) + 1;
        }
        if (response.feministStrategy) {
            stats.feministStrategy[response.feministStrategy] = (stats.feministStrategy[response.feministStrategy] || 0) + 1;
        }
        if (response.intersectionalElement) {
            stats.intersectionalElement[response.intersectionalElement] = (stats.intersectionalElement[response.intersectionalElement] || 0) + 1;
        }
        if (response.aiLimitation) {
            stats.aiLimitation[response.aiLimitation] = (stats.aiLimitation[response.aiLimitation] || 0) + 1;
        }
        if (response.scholarlyApplication) {
            stats.scholarlyApplication[response.scholarlyApplication] = (stats.scholarlyApplication[response.scholarlyApplication] || 0) + 1;
        }
    });

    return stats;
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
        rhetoricalDevice: null,
        rhetoricalEffect: null,
        feministStrategy: null,
        intersectionalElement: null,
        aiLimitation: null,
        scholarlyApplication: null
    };
    renderExplorerScreen();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPoetryExplorer);
} else {
    initPoetryExplorer();
}
