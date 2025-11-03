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
    const wordCount = words.length;

    // Ethos indicators (credibility, expertise, authority)
    const ethosKeywords = [
        'expert', 'experts', 'research', 'study', 'studies', 'scientist', 'scientists',
        'professor', 'doctor', 'dr', 'phd', 'according to', 'evidence', 'data',
        'proven', 'established', 'verified', 'credentials', 'authority', 'authorities',
        'leading', 'renowned', 'respected', 'published', 'peer-reviewed', 'journal',
        'meta-analysis', 'university', 'institution', 'award-winning', 'certified',
        'qualified', 'experienced', 'specialist', 'professional', 'trustworthy'
    ];

    // Pathos indicators (emotion, values)
    const pathosKeywords = [
        'feel', 'feeling', 'feelings', 'believe', 'belief', 'heart', 'soul', 'hope', 'hoping',
        'fear', 'afraid', 'love', 'hate', 'suffering', 'suffer', 'joy', 'joyful', 'pain', 'painful',
        'happy', 'happiness', 'sad', 'sadness', 'angry', 'anger', 'dream', 'dreams',
        'children', 'child', 'kids', 'future', 'family', 'families', 'community', 'together',
        'crisis', 'tragedy', 'tragic', 'triumph', 'inspire', 'inspiring', 'inspiration',
        'moving', 'touching', 'devastating', 'heartbreaking', 'compassion', 'empathy',
        'protect', 'care', 'save', 'help', 'urgent', 'critical', 'crisis'
    ];

    // Logos indicators (logic, reasoning, facts)
    const logosKeywords = [
        'therefore', 'thus', 'hence', 'consequently', 'because', 'since', 'as a result',
        'statistics', 'statistic', 'percent', 'percentage', '%', 'number', 'numbers',
        'fact', 'facts', 'factual', 'analysis', 'analyze', 'demonstrate', 'demonstrates',
        'prove', 'proves', 'proof', 'shows', 'show', 'indicates', 'indicate', 'reveals',
        'reveal', 'concluded', 'conclusion', 'logical', 'logic', 'reason', 'reasoning',
        'evidence', 'data', 'datum', 'calculate', 'calculation', 'measure', 'measurement',
        'study shows', 'research shows', 'according to', 'findings', 'results'
    ];

    // Calculate raw scores
    let ethosScore = calculateScore(text.toLowerCase(), ethosKeywords);
    let pathosScore = calculateScore(text.toLowerCase(), pathosKeywords);
    let logosScore = calculateScore(text.toLowerCase(), logosKeywords);

    // Detect numbers and statistics (strong logos indicator)
    const numberPattern = /\b\d+(\.\d+)?(%|°C|°F|mph|km|million|billion|thousand)?\b/g;
    const numberMatches = text.match(numberPattern);
    if (numberMatches) {
        logosScore += numberMatches.length * 2; // Numbers are strong logos indicators
    }

    // Detect citations (strong ethos indicator)
    const citationPattern = /\([A-Z][a-z]+\s+et al\.,?\s+\d{4}\)|\([A-Z][a-z]+,?\s+\d{4}\)/g;
    const citationMatches = text.match(citationPattern);
    if (citationMatches) {
        ethosScore += citationMatches.length * 3; // Citations are very strong ethos indicators
    }

    // Adjust scores based on text length for more consistent results
    const lengthFactor = Math.max(1, wordCount / 50); // Normalize to ~50 words
    ethosScore = ethosScore / lengthFactor;
    pathosScore = pathosScore / lengthFactor;
    logosScore = logosScore / lengthFactor;

    // Calculate percentages (not forcing sum to 100)
    const totalScore = ethosScore + pathosScore + logosScore;

    let normalizedEthos, normalizedPathos, normalizedLogos;

    if (totalScore > 0) {
        // Scale to a 0-100 range, but each appeal can score independently
        const maxScore = Math.max(ethosScore, pathosScore, logosScore);

        if (maxScore > 0) {
            normalizedEthos = Math.round((ethosScore / maxScore) * 100);
            normalizedPathos = Math.round((pathosScore / maxScore) * 100);
            normalizedLogos = Math.round((logosScore / maxScore) * 100);
        } else {
            normalizedEthos = 20;
            normalizedPathos = 20;
            normalizedLogos = 20;
        }
    } else {
        // Very minimal rhetorical content detected
        normalizedEthos = 15;
        normalizedPathos = 15;
        normalizedLogos = 15;
    }

    // Ensure minimum threshold for display purposes
    normalizedEthos = Math.max(10, normalizedEthos);
    normalizedPathos = Math.max(10, normalizedPathos);
    normalizedLogos = Math.max(10, normalizedLogos);

    // Generate explanations
    const ethosExplanation = generateEthosExplanation(text, ethosKeywords, normalizedEthos, citationMatches);
    const pathosExplanation = generatePathosExplanation(text, pathosKeywords, normalizedPathos);
    const logosExplanation = generateLogosExplanation(text, logosKeywords, normalizedLogos, numberMatches);

    return {
        ethos: { score: normalizedEthos, explanation: ethosExplanation },
        pathos: { score: normalizedPathos, explanation: pathosExplanation },
        logos: { score: normalizedLogos, explanation: logosExplanation }
    };
}

/**
 * Calculate score based on keyword frequency
 */
function calculateScore(text, keywords) {
    let score = 0;
    keywords.forEach(keyword => {
        // Escape special regex characters
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp('\\b' + escapedKeyword + '\\b', 'gi');
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
function generateEthosExplanation(text, keywords, score, citations) {
    const foundKeywords = keywords.filter(kw => {
        const escapedKeyword = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp('\\b' + escapedKeyword + '\\b', 'gi').test(text);
    });

    const citationText = citations && citations.length > 0 ? ` The text includes ${citations.length} formal citation(s), which strongly enhances credibility.` : '';

    if (score >= 70) {
        return `Very strong ethos appeal detected. The text establishes credibility through references to ${foundKeywords.slice(0, 3).join(', ')} and other authority markers.${citationText} This builds significant trust with the audience by demonstrating expertise and reliable sources.`;
    } else if (score >= 45) {
        return `Strong ethos appeal. The text includes credibility markers like ${foundKeywords.slice(0, 2).join(' and ')}, establishing authority.${citationText} This demonstrates expertise and reliable sources.`;
    } else if (score >= 25) {
        return `Moderate ethos appeal. The text includes some credibility elements${foundKeywords.length > 0 ? ` such as ${foundKeywords.slice(0, 2).join(' and ')}` : ''}, establishing a degree of authority. Additional expert citations could strengthen the credibility further.`;
    } else {
        return `Limited ethos appeal. The text relies less on explicit credibility markers. This could be intentional for a more personal or direct approach, or it might benefit from adding expert sources and authoritative references.`;
    }
}

/**
 * Generate explanation for Pathos
 */
function generatePathosExplanation(text, keywords, score) {
    const foundKeywords = keywords.filter(kw => {
        const escapedKeyword = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp('\\b' + escapedKeyword + '\\b', 'gi').test(text);
    });

    if (score >= 70) {
        return `Very strong pathos appeal detected. The text uses emotional language like ${foundKeywords.slice(0, 3).join(', ')} to connect with readers' values and feelings. This emotional resonance can make the message highly compelling and memorable.`;
    } else if (score >= 45) {
        return `Strong pathos appeal. The text uses emotional language such as ${foundKeywords.slice(0, 2).join(' and ')} to connect with readers' values and feelings. This emotional resonance makes the message more compelling.`;
    } else if (score >= 25) {
        return `Moderate pathos appeal. The text includes some emotional elements${foundKeywords.length > 0 ? ` such as ${foundKeywords.slice(0, 2).join(' and ')}` : ''}, creating a connection with the audience. The balance between emotion and other appeals seems intentional.`;
    } else {
        return `Limited pathos appeal. The text takes a more neutral or objective tone with minimal emotional language. This approach may prioritize logical reasoning or credibility over emotional connection, which can be effective for certain audiences and purposes.`;
    }
}

/**
 * Generate explanation for Logos
 */
function generateLogosExplanation(text, keywords, score, numbers) {
    const foundKeywords = keywords.filter(kw => {
        const escapedKeyword = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp('\\b' + escapedKeyword + '\\b', 'gi').test(text);
    });

    const numberText = numbers && numbers.length > 0 ? ` The text includes ${numbers.length} numerical reference(s) or statistic(s), which strengthens the logical appeal.` : '';

    if (score >= 70) {
        return `Very strong logos appeal detected. The text emphasizes logical reasoning and evidence through words like ${foundKeywords.slice(0, 3).join(', ')}.${numberText} This rational approach builds a solid argumentative foundation with facts and logical connections.`;
    } else if (score >= 45) {
        return `Strong logos appeal. The text includes logical elements and reasoning markers such as ${foundKeywords.slice(0, 2).join(' and ')}.${numberText} This provides substantial evidentiary support.`;
    } else if (score >= 25) {
        return `Moderate logos appeal. The text includes some logical elements${foundKeywords.length > 0 ? ` such as ${foundKeywords.slice(0, 2).join(' and ')}` : ''}, providing some evidentiary support. The argument balances logic with other persuasive strategies.`;
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
