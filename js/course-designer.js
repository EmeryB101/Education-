/**
 * Course Designer - Interactive Twine-Style Student Preference System
 * Allows students to customize their learning experience through avatar selection,
 * preference choices, and activity type selection.
 */

// Game State
const designerState = {
    currentScreen: 'avatar',
    selections: {
        avatar: null,
        preference: null, // 'games', 'quizzes', or 'both'
        types: []
    },
    screens: ['avatar', 'preference', 'types', 'results']
};

// Avatar Data
const avatars = [
    {
        id: 'analyzer',
        icon: '🔍',
        name: 'The Analyzer',
        description: 'You love breaking down complex ideas and finding patterns in poetry.'
    },
    {
        id: 'creator',
        icon: '🎨',
        name: 'The Creator',
        description: 'You learn best through creative expression and making connections.'
    },
    {
        id: 'explorer',
        icon: '🌟',
        name: 'The Explorer',
        description: 'Hands-on experiences and discovery drive your learning journey.'
    },
    {
        id: 'collaborator',
        icon: '🤝',
        name: 'The Collaborator',
        description: 'Social learning and discussion help you understand best.'
    }
];

// Activity Type Data
const gameTypes = [
    {
        id: 'narrative',
        title: 'Story-Based Narrative Games',
        description: 'Interactive stories where your choices affect the outcome'
    },
    {
        id: 'matching',
        title: 'Matching & Strategy Games',
        description: 'Connect poems with rhetorical strategies and build critical thinking'
    },
    {
        id: 'simulation',
        title: 'Role-Play & Simulation',
        description: 'Step into different perspectives and practice rhetorical analysis'
    }
];

const quizTypes = [
    {
        id: 'multiple-choice',
        title: 'Multiple Choice Assessments',
        description: 'Test your knowledge with targeted questions about poetry and rhetoric'
    },
    {
        id: 'scenario',
        title: 'Scenario-Based Questions',
        description: 'Apply your skills to real-world poetry analysis situations'
    },
    {
        id: 'reflection',
        title: 'Reflective Prompts',
        description: 'Deep thinking questions that connect to your own experiences'
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
    // Create overlay if it doesn't exist
    let overlay = document.getElementById('designer-overlay');
    if (!overlay) {
        overlay = createDesignerOverlay();
        document.body.appendChild(overlay);
    }

    // Reset state
    designerState.currentScreen = 'avatar';
    designerState.selections = {
        avatar: null,
        preference: null,
        types: []
    };

    // Show overlay and render first screen
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
        case 'preference':
            content.innerHTML = renderPreferenceScreen();
            break;
        case 'types':
            content.innerHTML = renderTypesScreen();
            break;
        case 'results':
            content.innerHTML = renderResultsScreen();
            break;
    }
}

/**
 * Avatar Selection Screen
 */
function renderAvatarScreen() {
    return `
        <h2 class="designer-title">Choose Your Learning Style</h2>
        <p class="designer-subtitle">Select the avatar that best represents how you learn</p>

        <div class="avatar-grid">
            ${avatars.map(avatar => `
                <div class="avatar-card ${designerState.selections.avatar === avatar.id ? 'selected' : ''}"
                     onclick="selectAvatar('${avatar.id}')">
                    <div class="avatar-icon">${avatar.icon}</div>
                    <div class="avatar-name">${avatar.name}</div>
                    <div class="avatar-description">${avatar.description}</div>
                </div>
            `).join('')}
        </div>

        <div class="designer-actions">
            <button class="designer-btn btn-primary-designer"
                    onclick="nextScreen()"
                    ${!designerState.selections.avatar ? 'disabled' : ''}>
                Continue →
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
                Continue →
            </button>
        </div>
    `;
}

/**
 * Activity Types Screen
 */
function renderTypesScreen() {
    const types = designerState.selections.preference === 'quizzes' ? quizTypes : gameTypes;
    const title = designerState.selections.preference === 'quizzes'
        ? 'What Kind of Quizzes?'
        : 'What Kind of Games?';
    const subtitle = designerState.selections.preference === 'quizzes'
        ? 'Select the quiz types that interest you most (choose multiple)'
        : 'Select the game types that interest you most (choose multiple)';

    return `
        <h2 class="designer-title">${title}</h2>
        <p class="designer-subtitle">${subtitle}</p>

        <div class="type-list">
            ${types.map(type => `
                <div class="type-option ${designerState.selections.types.includes(type.id) ? 'selected' : ''}"
                     onclick="toggleType('${type.id}')">
                    <div class="type-checkbox"></div>
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
                See Results →
            </button>
        </div>
    `;
}

/**
 * Results Screen
 */
function renderResultsScreen() {
    const selectedAvatar = avatars.find(a => a.id === designerState.selections.avatar);
    const preferenceText = {
        'games': 'Interactive Games',
        'quizzes': 'Knowledge Quizzes',
        'both': 'Mix of Both'
    }[designerState.selections.preference];

    return `
        <h2 class="designer-title">Your Learning Profile</h2>
        <p class="designer-subtitle">Here's what we learned about you!</p>

        <div class="results-container">
            <div class="results-avatar">${selectedAvatar.icon}</div>

            <div class="results-summary">
                <div class="results-item">
                    <span class="results-label">Learning Style:</span>
                    <span class="results-value">${selectedAvatar.name}</span>
                </div>
                <div class="results-item">
                    <span class="results-label">Preferred Method:</span>
                    <span class="results-value">${preferenceText}</span>
                </div>
                <div class="results-item">
                    <span class="results-label">Selected Types:</span>
                    <span class="results-value">${designerState.selections.types.length} chosen</span>
                </div>
            </div>

            <div style="margin-top: var(--spacing-2xl); padding: var(--spacing-xl); background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1)); border-radius: var(--radius-lg);">
                <h3 style="color: var(--neon-purple); margin-bottom: var(--spacing-md);">🎉 Coming Soon!</h3>
                <p style="line-height: 1.8; color: var(--text-primary);">
                    We're building a personalized learning experience based on your preferences.
                    Soon, you'll see customized activities, recommendations, and content tailored just for you!
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
 * Select an avatar
 */
function selectAvatar(avatarId) {
    designerState.selections.avatar = avatarId;
    renderCurrentScreen();
}

/**
 * Select a preference (games/quizzes/both)
 */
function selectPreference(preference) {
    designerState.selections.preference = preference;
    // Reset types when preference changes
    designerState.selections.types = [];
    renderCurrentScreen();
}

/**
 * Toggle a type selection
 */
function toggleType(typeId) {
    const index = designerState.selections.types.indexOf(typeId);
    if (index > -1) {
        designerState.selections.types.splice(index, 1);
    } else {
        designerState.selections.types.push(typeId);
    }
    renderCurrentScreen();
}

/**
 * Navigate to next screen
 */
function nextScreen() {
    const currentIndex = designerState.screens.indexOf(designerState.currentScreen);
    if (currentIndex < designerState.screens.length - 1) {
        designerState.currentScreen = designerState.screens[currentIndex + 1];
        renderCurrentScreen();
    }
}

/**
 * Navigate to previous screen
 */
function previousScreen() {
    const currentIndex = designerState.screens.indexOf(designerState.currentScreen);
    if (currentIndex > 0) {
        designerState.currentScreen = designerState.screens[currentIndex - 1];
        renderCurrentScreen();
    }
}

/**
 * Restart the designer from beginning
 */
function restartDesigner() {
    designerState.currentScreen = 'avatar';
    designerState.selections = {
        avatar: null,
        preference: null,
        types: []
    };
    renderCurrentScreen();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCourseDesigner);
} else {
    initCourseDesigner();
}
