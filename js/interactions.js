/**
 * Interactive components JavaScript
 * Handles the AI Rhetorical Appeals Analyzer and other interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    initRhetoricalAnalyzer();
});

/**
 * Initialize the AI Rhetorical Appeals Analyzer
 */
function initRhetoricalAnalyzer() {
    const analyzeBtn = document.getElementById('analyze-btn');

    if (!analyzeBtn) {
        return; // Not on the page with the analyzer
    }

    analyzeBtn.addEventListener('click', function() {
        const textInput = document.getElementById('text-input');
        const resultsContainer = document.getElementById('analysis-results');
        const text = textInput.value.trim();

        if (!text) {
            alert('Please enter some text to analyze.');
            return;
        }

        // Show results container
        resultsContainer.classList.remove('hidden');

        // Perform analysis
        const analysis = analyzeRhetoricalAppeals(text);

        // Animate results
        animateAnalysisResults(analysis);

        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

/**
 * Analyze text for rhetorical appeals
 * This is a simplified heuristic-based analysis for demonstration
 */
function analyzeRhetoricalAppeals(text) {
    const words = text.toLowerCase().split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    // Ethos indicators (credibility, expertise, authority)
    const ethosKeywords = [
        'expert', 'research', 'study', 'studies', 'scientist', 'scientists',
        'professor', 'doctor', 'according to', 'evidence', 'data',
        'proven', 'established', 'verified', 'credentials', 'authority',
        'leading', 'renowned', 'respected', 'published'
    ];

    // Pathos indicators (emotion, values)
    const pathosKeywords = [
        'feel', 'believe', 'heart', 'soul', 'hope', 'fear', 'love', 'hate',
        'suffering', 'joy', 'pain', 'happy', 'sad', 'angry', 'dream',
        'children', 'future', 'family', 'community', 'together', 'crisis',
        'tragedy', 'triumph', 'inspire', 'moving', 'touching', 'devastating'
    ];

    // Logos indicators (logic, reasoning, facts)
    const logosKeywords = [
        'therefore', 'because', 'since', 'thus', 'consequently', 'hence',
        'statistics', 'percent', 'number', 'fact', 'facts', 'analysis',
        'demonstrate', 'prove', 'shows', 'indicates', 'reveals', 'concluded',
        'logical', 'reason', 'evidence', 'data', 'calculate', 'measure'
    ];

    // Calculate scores
    const ethosScore = calculateScore(text.toLowerCase(), ethosKeywords, words.length);
    const pathosScore = calculateScore(text.toLowerCase(), pathosKeywords, words.length);
    const logosScore = calculateScore(text.toLowerCase(), logosKeywords, words.length);

    // Normalize scores to 100
    const total = ethosScore + pathosScore + logosScore;
    const normalizedEthos = total > 0 ? Math.round((ethosScore / total) * 100) : 33;
    const normalizedPathos = total > 0 ? Math.round((pathosScore / total) * 100) : 33;
    const normalizedLogos = total > 0 ? Math.round((logosScore / total) * 100) : 34;

    // Generate explanations
    const ethosExplanation = generateEthosExplanation(text, ethosKeywords, normalizedEthos);
    const pathosExplanation = generatePathosExplanation(text, pathosKeywords, normalizedPathos);
    const logosExplanation = generateLogosExplanation(text, logosKeywords, normalizedLogos);

    return {
        ethos: { score: normalizedEthos, explanation: ethosExplanation },
        pathos: { score: normalizedPathos, explanation: pathosExplanation },
        logos: { score: normalizedLogos, explanation: logosExplanation }
    };
}

/**
 * Calculate score based on keyword frequency
 */
function calculateScore(text, keywords, totalWords) {
    let score = 0;
    keywords.forEach(keyword => {
        const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
        const matches = text.match(regex);
        if (matches) {
            score += matches.length;
        }
    });
    return score;
}

/**
 * Generate explanation for Ethos
 */
function generateEthosExplanation(text, keywords, score) {
    const foundKeywords = keywords.filter(kw =>
        new RegExp('\\b' + kw + '\\b', 'gi').test(text)
    );

    if (score >= 40) {
        return `Strong ethos appeal detected. The text establishes credibility through references to ${foundKeywords.slice(0, 3).join(', ')} and other authority markers. This builds trust with the audience by demonstrating expertise and reliable sources.`;
    } else if (score >= 25) {
        return `Moderate ethos appeal. The text includes some credibility markers like ${foundKeywords.slice(0, 2).join(' and ')}, establishing a degree of authority. Additional expert citations could strengthen the credibility further.`;
    } else {
        return `Limited ethos appeal. The text relies less on explicit credibility markers. This could be intentional for a more personal or direct approach, or it might benefit from adding expert sources and authoritative references.`;
    }
}

/**
 * Generate explanation for Pathos
 */
function generatePathosExplanation(text, keywords, score) {
    const foundKeywords = keywords.filter(kw =>
        new RegExp('\\b' + kw + '\\b', 'gi').test(text)
    );

    if (score >= 40) {
        return `Strong pathos appeal detected. The text uses emotional language like ${foundKeywords.slice(0, 3).join(', ')} to connect with readers' values and feelings. This emotional resonance can make the message more compelling and memorable.`;
    } else if (score >= 25) {
        return `Moderate pathos appeal. The text includes some emotional elements such as ${foundKeywords.slice(0, 2).join(' and ')}, creating a connection with the audience. The balance between emotion and other appeals seems intentional.`;
    } else {
        return `Limited pathos appeal. The text takes a more neutral or objective tone with minimal emotional language. This approach may prioritize logical reasoning over emotional connection, which can be effective for certain audiences and purposes.`;
    }
}

/**
 * Generate explanation for Logos
 */
function generateLogosExplanation(text, keywords, score) {
    const foundKeywords = keywords.filter(kw =>
        new RegExp('\\b' + kw + '\\b', 'gi').test(text)
    );

    if (score >= 40) {
        return `Strong logos appeal detected. The text emphasizes logical reasoning and evidence through words like ${foundKeywords.slice(0, 3).join(', ')}. This rational approach builds a solid argumentative foundation with facts and logical connections.`;
    } else if (score >= 25) {
        return `Moderate logos appeal. The text includes logical elements and reasoning markers such as ${foundKeywords.slice(0, 2).join(' and ')}, providing some evidentiary support. The argument balances logic with other persuasive strategies.`;
    } else {
        return `Limited logos appeal. The text contains fewer explicit logical markers or evidence citations. This might indicate a focus on other rhetorical strategies, or could suggest areas where additional factual support would strengthen the argument.`;
    }
}

/**
 * Animate the display of analysis results
 */
function animateAnalysisResults(analysis) {
    // Update scores and bars with animation
    setTimeout(() => {
        updateAppeal('ethos', analysis.ethos);
    }, 200);

    setTimeout(() => {
        updateAppeal('pathos', analysis.pathos);
    }, 400);

    setTimeout(() => {
        updateAppeal('logos', analysis.logos);
    }, 600);
}

/**
 * Update a single appeal display
 */
function updateAppeal(appealType, data) {
    const scoreElement = document.getElementById(`${appealType}-score`);
    const barElement = document.getElementById(`${appealType}-bar`);
    const explanationElement = document.getElementById(`${appealType}-explanation`);

    // Animate score counting up
    animateValue(scoreElement, 0, data.score, 800);

    // Animate bar width
    barElement.style.width = '0%';
    setTimeout(() => {
        barElement.style.width = data.score + '%';
    }, 50);

    // Fade in explanation
    explanationElement.style.opacity = '0';
    explanationElement.textContent = data.explanation;
    setTimeout(() => {
        explanationElement.style.transition = 'opacity 0.5s ease-in';
        explanationElement.style.opacity = '1';
    }, 300);
}

/**
 * Animate a number counting up
 */
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + '%';
    }, 16);
}
