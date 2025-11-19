/**
 * Course Designer - Enhanced Interactive Twine-Style Personalization System
 * Elaborate branching hypertext with diverse avatars, fill-in questions,
 * and comprehensive preference mapping for personalized learning.
 */

// Enhanced Game State with more data points
const designerState = {
    currentScreen: 'appearance',
    selections: {
        appearance: null,      // visual representation
        learningStyle: null,   // separated characteristic/aspiration
        favoritePoem: '',
        rhetoricFocus: null, // 'setting', 'author', 'devices'
        preference: null, // 'games', 'quizzes', or 'both'
        types: [],
        learningPace: null, // 'fast', 'steady', 'deep'
        poetryEra: null // 'classic', 'modern', 'contemporary', 'all'
    },
    screens: ['appearance', 'style', 'poem', 'rhetoric', 'preference', 'types', 'pace', 'era', 'results']
};

// Visual Appearances - Scholarly and Academic Community
// Diverse people representing intellectual, professional, and artistic pursuits - NO career uniforms
const appearances = [
    // Scholars & Thinkers - Various skin tones and identities
    { id: 'app-1', visual: '🧑🏽' },  // Scholar
    { id: 'app-2', visual: '👩🏾' },  // Thinker
    { id: 'app-3', visual: '👨🏻' },  // Academic
    { id: 'app-4', visual: '🧑🏿' },  // Intellectual
    { id: 'app-5', visual: '👩🏼' },  // Researcher
    { id: 'app-6', visual: '👨🏽' },  // Analyst
    { id: 'app-7', visual: '🧑🏻' },  // Philosopher
    { id: 'app-8', visual: '👩🏿' },  // Theorist
    { id: 'app-9', visual: '👨🏾' },  // Writer
    { id: 'app-10', visual: '🧑🏼' }, // Reader

    // Curly-haired scholars and creatives
    { id: 'app-11', visual: '👨🏽‍🦱' }, // Creative thinker
    { id: 'app-12', visual: '👩🏿‍🦱' }, // Artist-scholar
    { id: 'app-13', visual: '🧑🏻‍🦱' }, // Poet
    { id: 'app-14', visual: '👩🏾‍🦱' }, // Rhetorician
    { id: 'app-15', visual: '👨🏼‍🦱' }, // Composer
    { id: 'app-16', visual: '🧑🏽‍🦱' }, // Critic
    { id: 'app-17', visual: '👩🏻‍🦱' }, // Analyst
    { id: 'app-18', visual: '👨🏿‍🦱' }, // Scholar
    { id: 'app-19', visual: '🧑🏾‍🦱' }, // Intellectual
    { id: 'app-20', visual: '👩🏼‍🦱' }, // Academic

    // Red-haired intellectuals and artists
    { id: 'app-21', visual: '👨🏻‍🦰' }, // Literary scholar
    { id: 'app-22', visual: '👩🏽‍🦰' }, // Writer
    { id: 'app-23', visual: '🧑🏼‍🦰' }, // Editor
    { id: 'app-24', visual: '👩🏾‍🦰' }, // Essayist
    { id: 'app-25', visual: '👨🏿‍🦰' }, // Thinker
    { id: 'app-26', visual: '🧑🏻‍🦰' }, // Philosopher
    { id: 'app-27', visual: '👩🏿‍🦰' }, // Researcher
    { id: 'app-28', visual: '👨🏽‍🦰' }, // Academic

    // Wisdom & experience (bald/shaved)
    { id: 'app-29', visual: '👨🏾‍🦲' }, // Senior scholar
    { id: 'app-30', visual: '👩🏽‍🦲' }, // Experienced academic
    { id: 'app-31', visual: '🧑🏿‍🦲' }, // Wise thinker
    { id: 'app-32', visual: '👩🏻‍🦲' }, // Seasoned writer
    { id: 'app-33', visual: '👨🏼‍🦲' }, // Veteran researcher
    { id: 'app-34', visual: '🧑🏾‍🦲' }, // Expert
    { id: 'app-35', visual: '👩🏿‍🦲' }, // Master scholar
    { id: 'app-36', visual: '👨🏻‍🦲' }, // Distinguished thinker

    // Elder scholars and mentors (white/gray hair)
    { id: 'app-37', visual: '👨🏻‍🦳' }, // Mentor
    { id: 'app-38', visual: '👩🏾‍🦳' }, // Distinguished professor
    { id: 'app-39', visual: '🧑🏽‍🦳' }, // Elder thinker
    { id: 'app-40', visual: '👩🏼‍🦳' }, // Sage
    { id: 'app-41', visual: '👨🏿‍🦳' }, // Wisdom keeper
    { id: 'app-42', visual: '🧑🏻‍🦳' }, // Veteran scholar
    { id: 'app-43', visual: '👩🏽‍🦳' }, // Senior academic
    { id: 'app-44', visual: '👨🏾‍🦳' }, // Experienced mentor

    // More diverse scholars and professionals
    { id: 'app-45', visual: '👨🏽' }, // Professional
    { id: 'app-46', visual: '👩🏾' }, // Scholar
    { id: 'app-47', visual: '🧑🏼' }, // Academic
    { id: 'app-48', visual: '👩🏿' }, // Intellectual
    { id: 'app-49', visual: '👨🏻' }, // Thinker
    { id: 'app-50', visual: '🧑🏿' }, // Writer
    { id: 'app-51', visual: '👩🏽' }, // Artist
    { id: 'app-52', visual: '👨🏼' }, // Researcher
    { id: 'app-53', visual: '🧑🏾' }, // Analyst
    { id: 'app-54', visual: '👩🏻' }, // Critic

    // Additional curly-haired academics
    { id: 'app-55', visual: '👨🏾‍🦱' }, // Creative scholar
    { id: 'app-56', visual: '👩🏽‍🦱' }, // Artistic thinker
    { id: 'app-57', visual: '🧑🏿‍🦱' }, // Poet-scholar
    { id: 'app-58', visual: '👩🏼‍🦱' }, // Rhetorician

    // Additional red-haired professionals
    { id: 'app-59', visual: '👨🏼‍🦰' }, // Literary critic
    { id: 'app-60', visual: '👩🏻‍🦰' }, // Author
    { id: 'app-61', visual: '🧑🏾‍🦰' }, // Academic writer

    // Additional wisdom figures
    { id: 'app-62', visual: '👨🏽‍🦲' }, // Expert thinker
    { id: 'app-63', visual: '👩🏾‍🦲' }, // Master academic
    { id: 'app-64', visual: '🧑🏼‍🦲' }, // Seasoned scholar

    // Additional elders and mentors
    { id: 'app-65', visual: '👨🏼‍🦳' }, // Elder mentor
    { id: 'app-66', visual: '👩🏿‍🦳' }, // Distinguished scholar
    { id: 'app-67', visual: '🧑🏾‍🦳' }, // Senior thinker

    // Final diverse academic community
    { id: 'app-68', visual: '👨🏿' }, // Professional scholar
    { id: 'app-69', visual: '👩🏾' }, // Academic researcher
    { id: 'app-70', visual: '🧑🏽' }  // Intellectual thinker
];

// Learning Styles - Student agency and empowerment focused
const learningStyles = [
    {
        id: 'deep-reader',
        title: 'Deep Reader & Critical Thinker',
        icon: '📖',
        description: 'I master concepts through careful reading and thoughtful analysis—I take my time to truly understand'
    },
    {
        id: 'creative-connector',
        title: 'Creative Connector',
        icon: '🎨',
        description: 'I learn by making connections—linking ideas to art, culture, and my own creative expression'
    },
    {
        id: 'hands-on-builder',
        title: 'Hands-On Builder',
        icon: '🛠️',
        description: 'I learn by doing—experimenting with tools, testing ideas, and building my own understanding'
    },
    {
        id: 'justice-seeker',
        title: 'Justice-Oriented Scholar',
        icon: '⚖️',
        description: 'I connect everything to real-world justice—I learn best when I see the power and purpose'
    },
    {
        id: 'collaborative-learner',
        title: 'Collaborative Learner',
        icon: '🤝',
        description: 'I thrive in dialogue—discussing, debating, and co-creating knowledge with my peers'
    },
    {
        id: 'writer-creator',
        title: 'Writer & Creator',
        icon: '✍️',
        description: 'I learn by creating—writing, drafting, revising my way to deeper understanding'
    },
    {
        id: 'pattern-finder',
        title: 'Pattern Finder & Strategist',
        icon: '🧩',
        description: 'I see structures and systems—I learn by identifying patterns and strategizing approaches'
    },
    {
        id: 'performer-speaker',
        title: 'Performer & Speaker',
        icon: '🎤',
        description: 'I embody knowledge—I learn through speaking, performing, and making ideas come alive'
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
    designerState.currentScreen = 'appearance';
    designerState.selections = {
        appearance: null,
        learningStyle: null,
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
    // Save student agency feedback if on results screen
    updateResponseWithFeedback();

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
        case 'appearance':
            content.innerHTML = renderAppearanceScreen();
            break;
        case 'style':
            content.innerHTML = renderStyleScreen();
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
 * Appearance Selection Screen - Pick someone who looks like you
 */
function renderAppearanceScreen() {
    return `
        <h2 class="designer-title">Choose Your Appearance</h2>
        <p class="designer-subtitle">Pick the avatar that looks most like you</p>

        <div class="appearance-grid">
            ${appearances.map(appearance => `
                <div class="appearance-card ${designerState.selections.appearance === appearance.id ? 'selected' : ''}"
                     onclick="selectAppearance('${appearance.id}')">
                    <div class="avatar-visual">${appearance.visual}</div>
                </div>
            `).join('')}
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.appearance ? 'disabled' : ''}>
                Continue → Choose your learning style
            </button>
        </div>
    `;
}

/**
 * Learning Style Screen - Separate from appearance
 */
function renderStyleScreen() {
    return `
        <h2 class="designer-title">What's Your Learning Style?</h2>
        <p class="designer-subtitle">Choose the characteristics and aspirations that fit you best</p>

        <div class="avatar-grid">
            ${learningStyles.map(style => `
                <div class="avatar-card ${designerState.selections.learningStyle === style.id ? 'selected' : ''}"
                     onclick="selectLearningStyle('${style.id}')">
                    <div class="choice-icon" style="font-size: 3rem; margin-bottom: var(--spacing-md);">${style.icon}</div>
                    <div class="avatar-style">${style.title}</div>
                    <div class="avatar-description">${style.description}</div>
                </div>
            `).join('')}
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-secondary-designer" onclick="previousScreen()">
                ← Back
            </button>
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.learningStyle ? 'disabled' : ''}>
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
 * Save response data and retrieve aggregate statistics
 */
function saveResponse() {
    // Get existing responses from localStorage
    let responses = JSON.parse(localStorage.getItem('courseDesignerResponses') || '[]');

    // Add current response with timestamp (feedback will be added later)
    responses.push({
        timestamp: new Date().toISOString(),
        ...designerState.selections,
        agencyFeedback: ''
    });

    // Save back to localStorage
    localStorage.setItem('courseDesignerResponses', JSON.stringify(responses));

    return calculateStatistics(responses);
}

/**
 * Update the most recent response with student agency feedback
 */
function updateResponseWithFeedback() {
    const feedbackInput = document.getElementById('student-agency-feedback');
    if (!feedbackInput) return;

    const feedback = feedbackInput.value.trim();
    if (!feedback) return; // Don't save empty feedback

    // Get responses from localStorage
    let responses = JSON.parse(localStorage.getItem('courseDesignerResponses') || '[]');

    if (responses.length > 0) {
        // Update the most recent response with feedback
        responses[responses.length - 1].agencyFeedback = feedback;
        localStorage.setItem('courseDesignerResponses', JSON.stringify(responses));
    }
}

/**
 * Calculate aggregate statistics from all responses
 */
function calculateStatistics(responses) {
    const total = responses.length;

    const stats = {
        total,
        appearance: {},
        learningStyle: {},
        rhetoricFocus: {},
        preference: {},
        learningPace: {},
        poetryEra: {}
    };

    // Count occurrences for each field
    responses.forEach(response => {
        if (response.appearance) {
            stats.appearance[response.appearance] = (stats.appearance[response.appearance] || 0) + 1;
        }
        if (response.learningStyle) {
            stats.learningStyle[response.learningStyle] = (stats.learningStyle[response.learningStyle] || 0) + 1;
        }
        if (response.rhetoricFocus) {
            stats.rhetoricFocus[response.rhetoricFocus] = (stats.rhetoricFocus[response.rhetoricFocus] || 0) + 1;
        }
        if (response.preference) {
            stats.preference[response.preference] = (stats.preference[response.preference] || 0) + 1;
        }
        if (response.learningPace) {
            stats.learningPace[response.learningPace] = (stats.learningPace[response.learningPace] || 0) + 1;
        }
        if (response.poetryEra) {
            stats.poetryEra[response.poetryEra] = (stats.poetryEra[response.poetryEra] || 0) + 1;
        }
    });

    return stats;
}

/**
 * Enhanced Results Screen with Polling Data
 */
function renderResultsScreen() {
    // Save response and get statistics
    const stats = saveResponse();

    const selectedAppearance = appearances.find(a => a.id === designerState.selections.appearance);
    const selectedStyle = learningStyles.find(s => s.id === designerState.selections.learningStyle);

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
        <p class="designer-subtitle">Here's what we learned about you!</p>

        <div class="results-container">
            <div class="results-avatar-large">${selectedAppearance.visual}</div>

            <div class="results-summary">
                <div class="results-item">
                    <span class="results-label">Your Avatar:</span>
                    <span class="results-value">${selectedAppearance.visual}</span>
                </div>

                <div class="results-item">
                    <span class="results-label">Your Learning Style:</span>
                    <span class="results-value">${selectedStyle.icon} ${selectedStyle.title}</span>
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

            <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(251, 191, 36, 0.1)); border-radius: var(--radius-lg); border: 3px solid var(--accent-color);">
                <h3 style="color: var(--accent-color); margin-bottom: var(--spacing-md); font-size: 1.5rem; text-align: center;">
                    💡 Your Voice Matters: Student Agency Feedback
                </h3>
                <p style="line-height: 1.8; color: var(--text-primary); margin-bottom: var(--spacing-lg); text-align: center;">
                    <strong>What content, choices, or options could we have included to give you even MORE control over your learning?</strong>
                </p>
                <textarea
                    id="student-agency-feedback"
                    class="designer-textarea"
                    placeholder="Share your ideas here...&#10;&#10;Examples:&#10;• 'I wish I could choose how many activities per module'&#10;• 'Let me design my own assessment format'&#10;• 'Give me options for group vs. solo work'&#10;• 'Allow me to set my own deadlines'&#10;&#10;Your suggestions help us build a more student-centered course!"
                    rows="6"
                    style="width: 100%; margin-bottom: var(--spacing-md);"
                ></textarea>
                <p style="font-size: var(--font-size-sm); color: var(--text-secondary); text-align: center; font-style: italic;">
                    ✨ This feedback is optional but incredibly valuable for course improvement
                </p>
            </div>

            ${renderPollStatistics(stats)}

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
 * Render polling statistics
 */
function renderPollStatistics(stats) {
    const calcPercent = (count) => Math.round((count / stats.total) * 100);

    // Get most popular choices
    const topStyle = Object.entries(stats.learningStyle).sort((a, b) => b[1] - a[1])[0];
    const topRhetoric = Object.entries(stats.rhetoricFocus).sort((a, b) => b[1] - a[1])[0];
    const topPref = Object.entries(stats.preference).sort((a, b) => b[1] - a[1])[0];
    const topPace = Object.entries(stats.learningPace).sort((a, b) => b[1] - a[1])[0];

    const styleNames = {
        'scholar': 'Thoughtful Scholar',
        'artist': 'Creative Artist',
        'explorer': 'Digital Explorer',
        'activist': 'Social Activist',
        'teacher': 'Collaborative Teacher',
        'poet': 'Aspiring Poet',
        'analyst': 'Systematic Analyst',
        'performer': 'Spoken Word Performer'
    };

    const rhetoricNames = {
        'setting': 'Historical Setting',
        'author': 'Author\'s Life',
        'devices': 'Poetic Devices',
        'all': 'Comprehensive'
    };

    const prefNames = {
        'games': 'Games',
        'quizzes': 'Quizzes',
        'both': 'Both'
    };

    const paceNames = {
        'fast': 'Fast & Focused',
        'steady': 'Steady & Balanced',
        'deep': 'Deep & Thorough'
    };

    return `
        <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: #f8f9fa; border-radius: var(--radius-lg); border: 3px solid var(--neon-cyan);">
            <h3 style="color: var(--neon-cyan); margin-bottom: var(--spacing-md); font-size: 1.5rem; text-align: center;">
                📊 Class Poll Results
            </h3>
            <p style="text-align: center; color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
                Based on ${stats.total} student${stats.total !== 1 ? 's' : ''} who completed the designer
            </p>

            <div class="poll-stats-grid">
                ${topStyle ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Most Popular Learning Style</div>
                    <div class="poll-stat-value">${styleNames[topStyle[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topStyle[1])}%</div>
                </div>
                ` : ''}

                ${topRhetoric ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Top Rhetoric Focus</div>
                    <div class="poll-stat-value">${rhetoricNames[topRhetoric[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topRhetoric[1])}%</div>
                </div>
                ` : ''}

                ${topPref ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Preferred Learning Method</div>
                    <div class="poll-stat-value">${prefNames[topPref[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topPref[1])}%</div>
                </div>
                ` : ''}

                ${topPace ? `
                <div class="poll-stat-card">
                    <div class="poll-stat-label">Most Common Pace</div>
                    <div class="poll-stat-value">${paceNames[topPace[0]]}</div>
                    <div class="poll-stat-percent">${calcPercent(topPace[1])}%</div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Selection Functions
 */
function selectAppearance(appearanceId) {
    designerState.selections.appearance = appearanceId;
    renderCurrentScreen();
}

function selectLearningStyle(styleId) {
    designerState.selections.learningStyle = styleId;
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
    // Save student agency feedback before restarting
    updateResponseWithFeedback();

    designerState.currentScreen = 'appearance';
    designerState.selections = {
        appearance: null,
        learningStyle: null,
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
