/**
 * Interactive Syllabus - Module Toggle and Progress Tracking
 * Makes the curriculum page interactive with collapsible modules and progress tracking
 */

/**
 * Toggle module expand/collapse
 */
function toggleModule(moduleCard) {
    const content = moduleCard.querySelector('.module-content');
    const toggle = moduleCard.querySelector('.module-toggle');

    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '▼';
        moduleCard.style.borderColor = 'var(--neon-purple)';
    } else {
        content.style.display = 'none';
        toggle.textContent = '►';
        moduleCard.style.borderColor = '';
    }
}

/**
 * Update progress bar based on checked activities
 */
function updateProgress() {
    const checkboxes = document.querySelectorAll('.activity-checkbox');
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.activity-checkbox:checked').length;
    const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

    // Update progress bar
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const progressStatus = document.getElementById('progress-status');

    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }

    if (progressText) {
        progressText.textContent = percentage + '%';
    }

    if (progressStatus) {
        progressStatus.textContent = `${checked} of ${total} activities completed`;

        // Add celebratory messages
        if (percentage === 100) {
            progressStatus.innerHTML = `🎉 <strong>${checked} of ${total} activities completed - YOU DID IT!</strong> 🎉`;
        } else if (percentage >= 75) {
            progressStatus.innerHTML = `🚀 ${checked} of ${total} activities completed - Almost there!`;
        } else if (percentage >= 50) {
            progressStatus.innerHTML = `💪 ${checked} of ${total} activities completed - Halfway there!`;
        } else if (percentage >= 25) {
            progressStatus.innerHTML = `📚 ${checked} of ${total} activities completed - Keep going!`;
        } else if (checked > 0) {
            progressStatus.innerHTML = `✨ ${checked} of ${total} activities completed - Great start!`;
        } else {
            progressStatus.textContent = `${checked} of ${total} activities completed`;
        }
    }

    // Save progress to localStorage
    saveProgress();
}

/**
 * Save progress to localStorage
 */
function saveProgress() {
    const checkboxes = document.querySelectorAll('.activity-checkbox');
    const progressData = {};

    checkboxes.forEach((checkbox, index) => {
        progressData[`activity-${index}`] = checkbox.checked;
    });

    localStorage.setItem('syllabusProgress', JSON.stringify(progressData));
}

/**
 * Load progress from localStorage
 */
function loadProgress() {
    const savedProgress = localStorage.getItem('syllabusProgress');

    if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        const checkboxes = document.querySelectorAll('.activity-checkbox');

        checkboxes.forEach((checkbox, index) => {
            if (progressData[`activity-${index}`]) {
                checkbox.checked = true;
            }
        });

        updateProgress();
    }
}

/**
 * Initialize interactive syllabus
 */
function initInteractiveSyllabus() {
    // Load saved progress
    loadProgress();

    // Initialize progress display
    updateProgress();

    // Start with all modules collapsed except the first
    const modules = document.querySelectorAll('.interactive-module');
    modules.forEach((module, index) => {
        if (index > 0) {
            const content = module.querySelector('.module-content');
            const toggle = module.querySelector('.module-toggle');
            if (content) content.style.display = 'none';
            if (toggle) toggle.textContent = '►';
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveSyllabus);
} else {
    initInteractiveSyllabus();
}
