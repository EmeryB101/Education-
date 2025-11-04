/**
 * Poetry & AI Prompt Quiz
 * Personalizes prompt recommendations based on poetry preferences and AI experience
 */

let quizState = {
    currentQuestion: 0,
    answers: {},
    profile: null
};

const quizQuestions = [
    {
        id: 'poetry_familiarity',
        question: '📚 How familiar are you with poetry analysis?',
        type: 'single',
        options: [
            { value: 'beginner', label: 'Just starting - I\'m new to analyzing poetry', emoji: '🌱' },
            { value: 'intermediate', label: 'Some experience - I can identify basic devices', emoji: '📖' },
            { value: 'advanced', label: 'Very comfortable - I regularly analyze poems', emoji: '🎓' }
        ]
    },
    {
        id: 'ai_experience',
        question: '🤖 What\'s your experience with AI writing tools?',
        type: 'single',
        options: [
            { value: 'none', label: 'Never used AI for writing or analysis', emoji: '🆕' },
            { value: 'basic', label: 'Used ChatGPT or similar a few times', emoji: '🔰' },
            { value: 'experienced', label: 'Regularly use AI tools for various tasks', emoji: '⚡' }
        ]
    },
    {
        id: 'poetry_interests',
        question: '💭 What aspects of poetry interest you most? (Select all that apply)',
        type: 'multiple',
        options: [
            { value: 'social_justice', label: 'Social justice and activism', emoji: '✊' },
            { value: 'emotion', label: 'Emotional expression and personal experience', emoji: '❤️' },
            { value: 'craft', label: 'Technical craft and poetic devices', emoji: '✍️' },
            { value: 'identity', label: 'Identity, race, and gender', emoji: '🌈' },
            { value: 'history', label: 'Historical context and movements', emoji: '📜' }
        ]
    },
    {
        id: 'learning_goals',
        question: '🎯 What do you want to learn in this course?',
        type: 'multiple',
        options: [
            { value: 'angelou_analysis', label: 'How to analyze Maya Angelou\'s rhetorical strategies', emoji: '🦜' },
            { value: 'feminist_rhetoric', label: 'Understanding feminist and intersectional rhetoric', emoji: '♀️' },
            { value: 'ai_prompting', label: 'Becoming better at prompting AI for analysis', emoji: '💬' },
            { value: 'critical_ai', label: 'Thinking critically about AI\'s limitations', emoji: '🔍' },
            { value: 'writing_skills', label: 'Improving my own rhetorical writing', emoji: '📝' }
        ]
    },
    {
        id: 'preferred_poems',
        question: '🎨 Which Maya Angelou poem themes resonate with you?',
        type: 'single',
        options: [
            { value: 'resilience', label: '"Still I Rise" - Resilience and defiance', emoji: '✊' },
            { value: 'identity', label: '"Phenomenal Woman" - Identity and self-worth', emoji: '👑' },
            { value: 'freedom', label: '"Caged Bird" - Freedom and oppression', emoji: '🦜' },
            { value: 'hope', label: '"On the Pulse of Morning" - Hope and unity', emoji: '🌅' }
        ]
    }
];

/**
 * Initialize the quiz
 */
function initPoetryQuiz() {
    quizState.currentQuestion = 0;
    quizState.answers = {};
    quizState.profile = null;

    showQuestion(0);
}

/**
 * Show a specific question
 */
function showQuestion(index) {
    const quizContainer = document.getElementById('quiz-content');
    if (!quizContainer) return;

    const question = quizQuestions[index];
    const progress = ((index) / quizQuestions.length) * 100;

    let html = `
        <div class="quiz-progress">
            <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" style="width: ${progress}%"></div>
            </div>
            <p class="quiz-progress-text">Question ${index + 1} of ${quizQuestions.length}</p>
        </div>

        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
    `;

    question.options.forEach((option, i) => {
        const selected = quizState.answers[question.id] &&
                        (Array.isArray(quizState.answers[question.id])
                            ? quizState.answers[question.id].includes(option.value)
                            : quizState.answers[question.id] === option.value);

        html += `
            <div class="quiz-option ${selected ? 'selected' : ''}"
                 onclick="selectOption('${question.id}', '${option.value}', '${question.type}')">
                <span class="quiz-option-emoji">${option.emoji}</span>
                <span class="quiz-option-label">${option.label}</span>
                ${selected ? '<span class="quiz-option-check">✓</span>' : ''}
            </div>
        `;
    });

    html += `
            </div>
        </div>

        <div class="quiz-navigation">
            ${index > 0 ? '<button class="quiz-btn quiz-btn-secondary" onclick="previousQuestion()">← Previous</button>' : '<div></div>'}
            ${index < quizQuestions.length - 1
                ? '<button class="quiz-btn quiz-btn-primary" onclick="nextQuestion()">Next →</button>'
                : '<button class="quiz-btn quiz-btn-primary" onclick="showResults()">See My Recommendations ✨</button>'}
        </div>
    `;

    quizContainer.innerHTML = html;
}

/**
 * Handle option selection
 */
function selectOption(questionId, value, type) {
    if (type === 'single') {
        quizState.answers[questionId] = value;
    } else if (type === 'multiple') {
        if (!quizState.answers[questionId]) {
            quizState.answers[questionId] = [];
        }
        const index = quizState.answers[questionId].indexOf(value);
        if (index > -1) {
            quizState.answers[questionId].splice(index, 1);
        } else {
            quizState.answers[questionId].push(value);
        }
    }

    // Refresh display
    showQuestion(quizState.currentQuestion);
}

/**
 * Navigate to next question
 */
function nextQuestion() {
    if (quizState.currentQuestion < quizQuestions.length - 1) {
        quizState.currentQuestion++;
        showQuestion(quizState.currentQuestion);
    }
}

/**
 * Navigate to previous question
 */
function previousQuestion() {
    if (quizState.currentQuestion > 0) {
        quizState.currentQuestion--;
        showQuestion(quizState.currentQuestion);
    }
}

/**
 * Generate personalized recommendations based on answers
 */
function generateRecommendations() {
    const { poetry_familiarity, ai_experience, poetry_interests, learning_goals, preferred_poems } = quizState.answers;

    const recommendations = {
        profile: '',
        prompts: [],
        strategies: [],
        resources: []
    };

    // Determine profile
    if (poetry_familiarity === 'beginner' && ai_experience === 'none') {
        recommendations.profile = '🌱 Emerging Scholar';
        recommendations.prompts = [
            {
                title: 'Gentle Introduction Prompt',
                prompt: '"Explain the main message of Maya Angelou\'s \'Still I Rise\' in simple terms. What is she trying to persuade readers to feel or believe?"',
                why: 'Starts with big-picture understanding before diving into technical analysis'
            },
            {
                title: 'Guided Device Identification',
                prompt: '"In \'Still I Rise,\' find three examples of repetition. For each one, explain why Angelou might have repeated those specific words."',
                why: 'Focuses on one clear poetic device at a time'
            },
            {
                title: 'Personal Connection Prompt',
                prompt: '"What does the phrase \'I rise\' mean to you personally? How might that personal meaning relate to what Angelou intended?"',
                why: 'Connects your experience to the poem before asking AI to analyze'
            }
        ];
        recommendations.strategies = [
            '✍️ Start by writing your own reactions before asking AI',
            '📝 Use AI to define unfamiliar terms or concepts',
            '🔄 Ask AI follow-up questions when you don\'t understand its explanations'
        ];
    } else if (poetry_familiarity === 'intermediate' || poetry_familiarity === 'advanced') {
        recommendations.profile = '🎓 Confident Analyst';
        recommendations.prompts = [
            {
                title: 'Intersectional Analysis Prompt',
                prompt: '"Analyze how Maya Angelou\'s identity as a Black woman shapes the rhetorical strategies in \'Phenomenal Woman.\' How does she build ethos through embodied experience?"',
                why: 'Engages with complex intersectional feminist rhetoric'
            },
            {
                title: 'Comparative Rhetoric Prompt',
                prompt: '"Compare the rhetorical appeals in Angelou\'s \'Caged Bird\' with Frances Harper\'s \'Bury Me in a Free Land.\' How do both poets use metaphor to address oppression?"',
                why: 'Develops comparative analysis skills across different poets'
            },
            {
                title: 'Critical AI Evaluation',
                prompt: '"What does AI miss when analyzing the line \'phenomenal woman, that\'s me\'? What embodied knowledge do readers bring that AI cannot access?"',
                why: 'Pushes you to think about AI\'s limitations'
            }
        ];
        recommendations.strategies = [
            '🔍 Challenge AI interpretations with your own readings',
            '🎭 Ask AI to identify patterns you might have missed',
            '⚖️ Use AI to test whether your interpretations hold up'
        ];
    }

    // Add interest-specific prompts
    if (poetry_interests && poetry_interests.includes('social_justice')) {
        recommendations.prompts.push({
            title: 'Activist Rhetoric Prompt',
            prompt: '"How does Maya Angelou use rhetoric to inspire social change in \'Still I Rise\'? Identify specific persuasive techniques she uses to empower marginalized readers."',
            why: 'Focuses on poetry as activism and social justice tool'
        });
    }

    if (poetry_interests && poetry_interests.includes('identity')) {
        recommendations.prompts.push({
            title: 'Identity & Voice Prompt',
            prompt: '"Analyze how Angelou constructs her speaking voice and authority in \'Phenomenal Woman.\' What rhetorical moves establish her credibility as she defines womanhood on her own terms?"',
            why: 'Explores identity construction through rhetorical choices'
        });
    }

    // Add AI-experience-specific strategies
    if (ai_experience === 'none' || ai_experience === 'basic') {
        recommendations.strategies.push('🤖 Practice "agentic AI": Always analyze the poem yourself FIRST, then use AI to verify or challenge your reading');
        recommendations.strategies.push('💬 Be specific in prompts: Instead of "analyze this poem," try "identify three examples of pathos in stanza 2"');
    } else {
        recommendations.strategies.push('🔧 Experiment with meta-prompts: "What questions should I ask about this poem to get the deepest analysis?"');
        recommendations.strategies.push('📊 Use AI to identify patterns across multiple poems by the same poet');
    }

    // Add poem-specific resource
    if (preferred_poems === 'resilience') {
        recommendations.resources.push({
            title: '✊ "Still I Rise" Deep Dive',
            description: 'Focus on anaphora, defiance rhetoric, and historical context of Black resistance'
        });
    } else if (preferred_poems === 'identity') {
        recommendations.resources.push({
            title: '👑 "Phenomenal Woman" Analysis',
            description: 'Explore embodied rhetoric, self-definition, and challenging beauty standards'
        });
    } else if (preferred_poems === 'freedom') {
        recommendations.resources.push({
            title: '🦜 "Caged Bird" Metaphor Study',
            description: 'Understand extended metaphor, symbolism, and rhetoric of captivity/freedom'
        });
    } else if (preferred_poems === 'hope') {
        recommendations.resources.push({
            title: '🌅 "On the Pulse of Morning" Rhetoric',
            description: 'Examine epideictic (ceremonial) rhetoric and calls for unity'
        });
    }

    // Default resources
    recommendations.resources.push(
        {
            title: '🎮 Play the Poetry Analysis Game',
            description: 'Practice identifying ethos, pathos, logos in poems by women activists'
        },
        {
            title: '📚 Feminist Rhetoric Reading List',
            description: 'Explore foundational texts on Black feminist rhetorical theory'
        }
    );

    return recommendations;
}

/**
 * Show personalized results
 */
function showResults() {
    const quizContainer = document.getElementById('quiz-content');
    if (!quizContainer) return;

    const recommendations = generateRecommendations();

    let html = `
        <div class="quiz-results">
            <h2 class="quiz-results-title">Your Personalized AI Prompting Guide</h2>
            <div class="quiz-profile">
                <h3>${recommendations.profile}</h3>
                <p>Based on your responses, here are customized prompts and strategies for analyzing Maya Angelou's poetry with AI.</p>
            </div>

            <div class="quiz-section">
                <h3>💬 Recommended Prompts for You</h3>
                <div class="prompt-cards">
    `;

    recommendations.prompts.forEach(prompt => {
        html += `
            <div class="prompt-card">
                <h4>${prompt.title}</h4>
                <div class="prompt-box">${prompt.prompt}</div>
                <p class="prompt-explanation"><strong>Why this works:</strong> ${prompt.why}</p>
            </div>
        `;
    });

    html += `
                </div>
            </div>

            <div class="quiz-section">
                <h3>🎯 Your Agentic AI Strategies</h3>
                <ul class="strategies-list">
    `;

    recommendations.strategies.forEach(strategy => {
        html += `<li>${strategy}</li>`;
    });

    html += `
                </ul>
            </div>

            <div class="quiz-section">
                <h3>📖 Recommended Resources</h3>
                <div class="resources-grid">
    `;

    recommendations.resources.forEach(resource => {
        html += `
            <div class="resource-item">
                <h4>${resource.title}</h4>
                <p>${resource.description}</p>
            </div>
        `;
    });

    html += `
                </div>
            </div>

            <div class="quiz-actions">
                <button class="quiz-btn quiz-btn-primary" onclick="initPoetryQuiz()">🔄 Retake Quiz</button>
                <button class="quiz-btn quiz-btn-secondary" onclick="window.print()">🖨️ Print My Guide</button>
            </div>
        </div>
    `;

    quizContainer.innerHTML = html;
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz-content');
    if (quizContainer) {
        initPoetryQuiz();
    }
});
