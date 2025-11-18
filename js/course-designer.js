/**
 * Course Designer - Enhanced Interactive Twine-Style Personalization System
 * Elaborate branching hypertext with diverse avatars, fill-in questions,
 * and comprehensive preference mapping for personalized learning.
 */

// Enhanced Game State with more data points
const designerState = {
    currentScreen: 'avatar',
    selections: {
        avatar: null,
        favoritePoem: '',
        rhetoricFocus: null, // 'setting', 'author', 'devices'
        preference: null, // 'games', 'quizzes', or 'both'
        types: [],
        learningPace: null, // 'fast', 'steady', 'deep'
        poetryEra: null // 'classic', 'modern', 'contemporary', 'all'
    },
    screens: ['avatar', 'poem', 'rhetoric', 'preference', 'types', 'pace', 'era', 'results']
};

// Diverse Avatar Data - Characters students can relate to
const avatars = [
    {
        id: 'scholar-1',
        visual: '👩🏽‍🎓',
        name: 'Maya',
        style: 'The Thoughtful Scholar',
        skinTone: 'medium',
        description: 'Deep thinker who loves analyzing every word and cultural context'
    },
    {
        id: 'artist-1',
        visual: '👨🏾‍🎨',
        name: 'James',
        style: 'The Creative Artist',
        skinTone: 'dark',
        description: 'Visual learner who connects poetry to art, music, and expression'
    },
    {
        id: 'explorer-1',
        visual: '👩🏻‍💻',
        name: 'Alex',
        style: 'The Digital Explorer',
        skinTone: 'light',
        description: 'Tech-savvy learner who experiments with AI tools hands-on'
    },
    {
        id: 'activist-1',
        visual: '🧑🏿‍🏫',
        name: 'Jordan',
        style: 'The Social Activist',
        skinTone: 'dark',
        description: 'Passionate about justice, connects poetry to social change'
    },
    {
        id: 'teacher-1',
        visual: '👨🏼‍🏫',
        name: 'Sam',
        style: 'The Collaborative Teacher',
        skinTone: 'light',
        description: 'Learns best through discussion, teaching others, and group work'
    },
    {
        id: 'poet-1',
        visual: '👩🏻‍🦰',
        name: 'Riley',
        style: 'The Aspiring Poet',
        skinTone: 'light',
        description: 'Writer who analyzes poetry to improve their own craft'
    },
    {
        id: 'scientist-1',
        visual: '🧑🏽‍🔬',
        name: 'Casey',
        style: 'The Systematic Analyst',
        skinTone: 'medium',
        description: 'Methodical learner who loves data, patterns, and structure'
    },
    {
        id: 'performer-1',
        visual: '👨🏿‍🎤',
        name: 'Malik',
        style: 'The Spoken Word Performer',
        skinTone: 'dark',
        description: 'Learns poetry through performance, rhythm, and spoken word'
    }
];

// Activity Type Data
const gameTypes = [
    {
        id: 'narrative',
        title: 'Story-Based Narrative Games',
        description: 'Interactive stories where your choices affect the outcome',
        icon: '📖'
    },
    {
        id: 'matching',
        title: 'Matching & Strategy Games',
        description: 'Connect poems with rhetorical strategies and build critical thinking',
        icon: '🎯'
    },
    {
        id: 'simulation',
        title: 'Role-Play & Simulation',
        description: 'Step into different perspectives and practice rhetorical analysis',
        icon: '🎭'
    },
    {
        id: 'challenge',
        title: 'Timed Challenges & Puzzles',
        description: 'Fast-paced activities that test your knowledge under pressure',
        icon: '⏱️'
    }
];

const quizTypes = [
    {
        id: 'multiple-choice',
        title: 'Multiple Choice Assessments',
        description: 'Test your knowledge with targeted questions about poetry and rhetoric',
        icon: '✅'
    },
    {
        id: 'scenario',
        title: 'Scenario-Based Questions',
        description: 'Apply your skills to real-world poetry analysis situations',
        icon: '💭'
    },
    {
        id: 'reflection',
        title: 'Reflective Prompts',
        description: 'Deep thinking questions that connect to your own experiences',
        icon: '📝'
    },
    {
        id: 'peer-review',
        title: 'Peer Discussion Quizzes',
        description: 'Compare your interpretations with classmates\' analyses',
        icon: '👥'
    }
];

/**
 * Initialize the Course Designer
 */
function initCourseDesigner() {
    const launchButton = document.getElementById('launch-course-designer');
    if (launchButton) {
        launchButton.addEventListener('click', openCourseDesigner);
    }
}

/**
 * Open the designer modal and show first screen
 */
function openCourseDesigner() {
    let overlay = document.getElementById('designer-overlay');
    if (!overlay) {
        overlay = createDesignerOverlay();
        document.body.appendChild(overlay);
    }

    // Reset state
    designerState.currentScreen = 'avatar';
    designerState.selections = {
        avatar: null,
        favoritePoem: '',
        rhetoricFocus: null,
        preference: null,
        types: [],
        learningPace: null,
        poetryEra: null
    };

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    renderCurrentScreen();
}

/**
 * Close the designer modal
 */
function closeCourseDesigner() {
    const overlay = document.getElementById('designer-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

/**
 * Create the designer overlay structure
 */
function createDesignerOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'designer-overlay';
    overlay.className = 'course-designer-overlay hidden';

    overlay.innerHTML = `
        <div class="course-designer-container">
            <button class="designer-close-btn" onclick="closeCourseDesigner()" aria-label="Close">&times;</button>
            <div id="designer-progress" class="designer-progress"></div>
            <div id="designer-content"></div>
        </div>
    `;

    return overlay;
}

/**
 * Update progress indicator
 */
function updateProgress() {
    const progressContainer = document.getElementById('designer-progress');
    const currentIndex = designerState.screens.indexOf(designerState.currentScreen);

    progressContainer.innerHTML = designerState.screens.map((screen, index) => {
        let className = 'progress-dot';
        if (index === currentIndex) className += ' active';
        if (index < currentIndex) className += ' completed';
        return `<div class="${className}"></div>`;
    }).join('');
}

/**
 * Render the current screen based on state
 */
function renderCurrentScreen() {
    updateProgress();

    const content = document.getElementById('designer-content');

    switch (designerState.currentScreen) {
        case 'avatar':
            content.innerHTML = renderAvatarScreen();
            break;
        case 'poem':
            content.innerHTML = renderPoemScreen();
            setTimeout(() => {
                const input = document.getElementById('poem-input');
                if (input) input.focus();
            }, 100);
            break;
        case 'rhetoric':
            content.innerHTML = renderRhetoricScreen();
            break;
        case 'preference':
            content.innerHTML = renderPreferenceScreen();
            break;
        case 'types':
            content.innerHTML = renderTypesScreen();
            break;
        case 'pace':
            content.innerHTML = renderPaceScreen();
            break;
        case 'era':
            content.innerHTML = renderEraScreen();
            break;
        case 'results':
            content.innerHTML = renderResultsScreen();
            break;
    }
}

/**
 * Enhanced Avatar Selection Screen - Diverse Characters
 */
function renderAvatarScreen() {
    return `
        <h2 class="designer-title">Who Are You?</h2>
        <p class="designer-subtitle">Choose the character that feels most like you</p>

        <div class="avatar-grid">
            ${avatars.map(avatar => `
                <div class="avatar-card ${designerState.selections.avatar === avatar.id ? 'selected' : ''}"
                     onclick="selectAvatar('${avatar.id}')">
                    <div class="avatar-visual">${avatar.visual}</div>
                    <div class="avatar-name">${avatar.name}</div>
                    <div class="avatar-style">${avatar.style}</div>
                    <div class="avatar-description">${avatar.description}</div>
                </div>
            `).join('')}
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.avatar ? 'disabled' : ''}>
                Continue → Let's talk about poetry
            </button>
        </div>
    `;
}

/**
 * Favorite Poem Screen - Text Input
 */
function renderPoemScreen() {
    return `
        <h2 class="designer-title">What's Your Favorite Poem?</h2>
        <p class="designer-subtitle">Tell us about a poem that speaks to you (or one you'd like to explore)</p>

        <div class="input-container">
            <label for="poem-input" class="input-label">
                💭 Share the title or a few lines you remember:
            </label>
            <textarea
                id="poem-input"
                class="designer-textarea"
                placeholder="e.g., 'Still I Rise by Maya Angelou' or 'I know why the caged bird sings...'&#10;&#10;If you don't have a favorite yet, tell us what kind of poetry interests you!"
                rows="5"
                onkeyup="updatePoemInput(this.value)"
            >${designerState.selections.favoritePoem}</textarea>
            <p class="input-hint">
                ✨ This helps us recommend poems and activities that match your interests
            </p>
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="previousScreen()">
                ← Back
            </button>
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()">
                Continue → Tell us more
            </button>
        </div>
    `;
}

/**
 * Rhetoric Focus Screen - Setting, Author, or Devices
 */
function renderRhetoricScreen() {
    return `
        <h2 class="designer-title">What Fascinates You Most?</h2>
        <p class="designer-subtitle">When studying poetry, what do you most want to understand?</p>

        <div class="choice-grid">
            <div class="choice-card ${designerState.selections.rhetoricFocus === 'setting' ? 'selected' : ''}"
                 onclick="selectRhetoricFocus('setting')">
                <div class="choice-icon">🌍</div>
                <div class="choice-title">Historical & Cultural Setting</div>
                <div class="choice-desc">
                    The time period, cultural context, and social movements that shaped the poem.
                    Understanding <em>when</em> and <em>where</em> matters.
                </div>
            </div>

            <div class="choice-card ${designerState.selections.rhetoricFocus === 'author' ? 'selected' : ''}"
                 onclick="selectRhetoricFocus('author')">
                <div class="choice-icon">✍️</div>
                <div class="choice-title">Author's Life & Identity</div>
                <div class="choice-desc">
                    The poet's biography, experiences, and identity. How Maya Angelou's life as a
                    Black woman activist shaped her rhetorical choices.
                </div>
            </div>

            <div class="choice-card ${designerState.selections.rhetoricFocus === 'devices' ? 'selected' : ''}"
                 onclick="selectRhetoricFocus('devices')">
                <div class="choice-icon">🎨</div>
                <div class="choice-title">Poetic Devices & Techniques</div>
                <div class="choice-desc">
                    Metaphor, anaphora, rhythm, imagery—the <em>craft</em> of how poets
                    build persuasive power through language.
                </div>
            </div>

            <div class="choice-card ${designerState.selections.rhetoricFocus === 'all' ? 'selected' : ''}"
                 onclick="selectRhetoricFocus('all')">
                <div class="choice-icon">🌟</div>
                <div class="choice-title">All of It Together</div>
                <div class="choice-desc">
                    I want to see how setting, author, and devices all work together to create
                    meaning and power.
                </div>
            </div>
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="previousScreen()">
                ← Back
            </button>
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.rhetoricFocus ? 'disabled' : ''}>
                Continue → Learning style
            </button>
        </div>
    `;
}

/**
 * Preference Selection Screen (Games vs Quizzes)
 */
function renderPreferenceScreen() {
    return `
        <h2 class="designer-title">How Do You Learn Best?</h2>
        <p class="designer-subtitle">Choose your preferred learning method</p>

        <div class="preference-grid">
            <div class="preference-card ${designerState.selections.preference === 'games' ? 'selected' : ''}"
                 onclick="selectPreference('games')">
                <div class="preference-icon">🎮</div>
                <div class="preference-name">Interactive Games</div>
                <div class="preference-description">
                    Learn through narrative experiences, matching activities, and interactive challenges
                </div>
            </div>

            <div class="preference-card ${designerState.selections.preference === 'quizzes' ? 'selected' : ''}"
                 onclick="selectPreference('quizzes')">
                <div class="preference-icon">📝</div>
                <div class="preference-name">Knowledge Quizzes</div>
                <div class="preference-description">
                    Test your understanding with assessments, scenarios, and reflective questions
                </div>
            </div>

            <div class="preference-card ${designerState.selections.preference === 'both' ? 'selected' : ''}"
                 onclick="selectPreference('both')">
                <div class="preference-icon">✨</div>
                <div class="preference-name">Mix of Both</div>
                <div class="preference-description">
                    Combine games and quizzes for a comprehensive learning experience
                </div>
            </div>
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="previousScreen()">
                ← Back
            </button>
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.preference ? 'disabled' : ''}>
                Continue → Specific types
            </button>
        </div>
    `;
}

/**
 * Activity Types Screen
 */
function renderTypesScreen() {
    const types = designerState.selections.preference === 'quizzes' ? quizTypes :
                  designerState.selections.preference === 'both' ? [...gameTypes, ...quizTypes] : gameTypes;
    const title = designerState.selections.preference === 'quizzes'
        ? 'What Kind of Quizzes?'
        : designerState.selections.preference === 'both'
        ? 'Select Your Favorite Types'
        : 'What Kind of Games?';
    const subtitle = 'Choose multiple options that interest you';

    return `
        <h2 class="designer-title">${title}</h2>
        <p class="designer-subtitle">${subtitle}</p>

        <div class="type-list">
            ${types.map(type => `
                <div class="type-option ${designerState.selections.types.includes(type.id) ? 'selected' : ''}"
                     onclick="toggleType('${type.id}')">
                    <div class="type-checkbox"></div>
                    <div class="type-icon">${type.icon}</div>
                    <div class="type-text">
                        <div class="type-title">${type.title}</div>
                        <div class="type-desc">${type.description}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="previousScreen()">
                ← Back
            </button>
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${designerState.selections.types.length === 0 ? 'disabled' : ''}>
                Continue → Learning pace
            </button>
        </div>
    `;
}

/**
 * Learning Pace Screen
 */
function renderPaceScreen() {
    return `
        <h2 class="designer-title">What's Your Learning Pace?</h2>
        <p class="designer-subtitle">How do you like to move through new material?</p>

        <div class="pace-grid">
            <div class="pace-card ${designerState.selections.learningPace === 'fast' ? 'selected' : ''}"
                 onclick="selectPace('fast')">
                <div class="pace-icon">⚡</div>
                <div class="pace-title">Fast & Focused</div>
                <div class="pace-desc">
                    I like to move quickly, get the main ideas, and practice applying them right away
                </div>
            </div>

            <div class="pace-card ${designerState.selections.learningPace === 'steady' ? 'selected' : ''}"
                 onclick="selectPace('steady')">
                <div class="pace-icon">🎯</div>
                <div class="pace-title">Steady & Balanced</div>
                <div class="pace-desc">
                    I want a good balance of learning new concepts and practicing with activities
                </div>
            </div>

            <div class="pace-card ${designerState.selections.learningPace === 'deep' ? 'selected' : ''}"
                 onclick="selectPace('deep')">
                <div class="pace-icon">🔍</div>
                <div class="pace-title">Deep & Thorough</div>
                <div class="pace-desc">
                    I love diving deep, exploring every angle, and really understanding the nuances
                </div>
            </div>
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="previousScreen()">
                ← Back
            </button>
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.learningPace ? 'disabled' : ''}>
                Continue → Poetry preferences
            </button>
        </div>
    `;
}

/**
 * Poetry Era Preferences Screen
 */
function renderEraScreen() {
    return `
        <h2 class="designer-title">Which Poetry Era Calls to You?</h2>
        <p class="designer-subtitle">What time period's poetry interests you most?</p>

        <div class="era-grid">
            <div class="era-card ${designerState.selections.poetryEra === 'classic' ? 'selected' : ''}"
                 onclick="selectEra('classic')">
                <div class="era-icon">📜</div>
                <div class="era-title">Classic Poetry</div>
                <div class="era-period">Pre-1900s</div>
                <div class="era-desc">
                    Shakespeare, Dickinson, Browning, Whitman—foundational voices of poetry
                </div>
            </div>

            <div class="era-card ${designerState.selections.poetryEra === 'modern' ? 'selected' : ''}"
                 onclick="selectEra('modern')">
                <div class="era-icon">🎭</div>
                <div class="era-title">Modern Poetry</div>
                <div class="era-period">1900-1960s</div>
                <div class="era-desc">
                    Langston Hughes, Gwendolyn Brooks, early Maya Angelou—Civil Rights era voices
                </div>
            </div>

            <div class="era-card ${designerState.selections.poetryEra === 'contemporary' ? 'selected' : ''}"
                 onclick="selectEra('contemporary')">
                <div class="era-icon">🎤</div>
                <div class="era-title">Contemporary Poetry</div>
                <div class="era-period">1970s-Today</div>
                <div class="era-desc">
                    Late Angelou, spoken word, slam poetry—poetry as activism and performance
                </div>
            </div>

            <div class="era-card ${designerState.selections.poetryEra === 'all' ? 'selected' : ''}"
                 onclick="selectEra('all')">
                <div class="era-icon">🌈</div>
                <div class="era-title">All Eras</div>
                <div class="era-period">Across Time</div>
                <div class="era-desc">
                    I want to explore poetry from all time periods and see how it evolves
                </div>
            </div>
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="previousScreen()">
                ← Back
            </button>
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.poetryEra ? 'disabled' : ''}>
                See My Learning Profile →
            </button>
        </div>
    `;
}

/**
 * Enhanced Results Screen
 */
function renderResultsScreen() {
    const selectedAvatar = avatars.find(a => a.id === designerState.selections.avatar);
    const preferenceText = {
        'games': 'Interactive Games',
        'quizzes': 'Knowledge Quizzes',
        'both': 'Mix of Both'
    }[designerState.selections.preference];

    const rhetoricText = {
        'setting': 'Historical & Cultural Setting',
        'author': 'Author\'s Life & Identity',
        'devices': 'Poetic Devices & Techniques',
        'all': 'Comprehensive Analysis'
    }[designerState.selections.rhetoricFocus];

    const paceText = {
        'fast': 'Fast & Focused ⚡',
        'steady': 'Steady & Balanced 🎯',
        'deep': 'Deep & Thorough 🔍'
    }[designerState.selections.learningPace];

    const eraText = {
        'classic': 'Classic Poetry (Pre-1900s)',
        'modern': 'Modern Poetry (1900-1960s)',
        'contemporary': 'Contemporary Poetry (1970s-Today)',
        'all': 'All Eras'
    }[designerState.selections.poetryEra];

    return `
        <h2 class="designer-title">Your Personalized Learning Profile</h2>
        <p class="designer-subtitle">Here's what we learned about ${selectedAvatar.name}!</p>

        <div class="results-container">
            <div class="results-avatar-large">${selectedAvatar.visual}</div>

            <div class="results-summary">
                <div class="results-item">
                    <span class="results-label">You Are:</span>
                    <span class="results-value">${selectedAvatar.name} - ${selectedAvatar.style}</span>
                </div>

                ${designerState.selections.favoritePoem ? `
                <div class="results-item">
                    <span class="results-label">Favorite Poem/Interest:</span>
                    <span class="results-value">"${designerState.selections.favoritePoem.substring(0, 60)}${designerState.selections.favoritePoem.length > 60 ? '...' : ''}"</span>
                </div>
                ` : ''}

                <div class="results-item">
                    <span class="results-label">Rhetoric Focus:</span>
                    <span class="results-value">${rhetoricText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Preferred Method:</span>
                    <span class="results-value">${preferenceText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Activity Types:</span>
                    <span class="results-value">${designerState.selections.types.length} selected</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Learning Pace:</span>
                    <span class="results-value">${paceText}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Poetry Era:</span>
                    <span class="results-value">${eraText}</span>
                </div>
            </div>

            <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); border-radius: var(--radius-lg);">
                <h3 style="color: var(--neon-purple); margin-bottom: var(--spacing-md); font-size: 1.5rem;">
                    🎉 Your Personalized Journey Awaits!
                </h3>
                <p style="line-height: 1.8; color: var(--text-primary); margin-bottom: var(--spacing-md);">
                    Based on your profile, we're building custom recommendations for:
                </p>
                <ul style="line-height: 2; color: var(--text-primary); margin-left: var(--spacing-lg);">
                    <li>✨ Activities tailored to your learning style</li>
                    <li>📚 Poetry selections matching your interests</li>
                    <li>🎯 Pacing that fits your preferred speed</li>
                    <li>🤖 AI prompting strategies aligned with your focus</li>
                </ul>
                <p style="margin-top: var(--spacing-md); font-style: italic; color: var(--text-secondary);">
                    Coming soon: Your fully personalized learning dashboard!
                </p>
            </div>
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="restartDesigner()">
                ↺ Start Over
            </button>
            <button class="designer-btn btn-primary-designer" onclick="closeCourseDesigner()">
                Explore Course →
            </button>
        </div>
    `;
}

/**
 * Selection Functions
 */
function selectAvatar(avatarId) {
    designerState.selections.avatar = avatarId;
    renderCurrentScreen();
}

function updatePoemInput(value) {
    designerState.selections.favoritePoem = value;
}

function selectRhetoricFocus(focus) {
    designerState.selections.rhetoricFocus = focus;
    renderCurrentScreen();
}

function selectPreference(preference) {
    designerState.selections.preference = preference;
    designerState.selections.types = [];
    renderCurrentScreen();
}

function toggleType(typeId) {
    const index = designerState.selections.types.indexOf(typeId);
    if (index > -1) {
        designerState.selections.types.splice(index, 1);
    } else {
        designerState.selections.types.push(typeId);
    }
    renderCurrentScreen();
}

function selectPace(pace) {
    designerState.selections.learningPace = pace;
    renderCurrentScreen();
}

function selectEra(era) {
    designerState.selections.poetryEra = era;
    renderCurrentScreen();
}

/**
 * Navigation Functions
 */
function nextScreen() {
    const currentIndex = designerState.screens.indexOf(designerState.currentScreen);
    if (currentIndex < designerState.screens.length - 1) {
        designerState.currentScreen = designerState.screens[currentIndex + 1];
        renderCurrentScreen();
    }
}

function previousScreen() {
    const currentIndex = designerState.screens.indexOf(designerState.currentScreen);
    if (currentIndex > 0) {
        designerState.currentScreen = designerState.screens[currentIndex - 1];
        renderCurrentScreen();
    }
}

function restartDesigner() {
    designerState.currentScreen = 'avatar';
    designerState.selections = {
        avatar: null,
        favoritePoem: '',
        rhetoricFocus: null,
        preference: null,
        types: [],
        learningPace: null,
        poetryEra: null
    };
    renderCurrentScreen();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCourseDesigner);
} else {
    initCourseDesigner();
}
