/**
 * Hypertext Game: AI and Rhetorical Analysis
 * Simple interactive demo showing how AI identifies ethos, pathos, and logos
 */

// Game state
let currentNode = 'start';

// Story nodes
const gameNodes = {
    start: {
        title: 'Interactive Demo: AI and Rhetorical Analysis',
        content: `
            <p>Welcome! This interactive demo will show you how AI can identify rhetorical appeals in text.</p>
            <p>You'll learn about three key concepts:</p>
            <div class="definition-box">
                <p><strong>Ethos:</strong> Appeals to credibility, authority, and trustworthiness</p>
            </div>
            <div class="definition-box">
                <p><strong>Pathos:</strong> Appeals to emotion, values, and feelings</p>
            </div>
            <div class="definition-box">
                <p><strong>Logos:</strong> Appeals to logic, reason, and evidence</p>
            </div>
        `,
        buttons: [
            { text: 'Start Demo', nextNode: 'teaching' }
        ]
    },

    teaching: {
        title: 'Understanding Rhetorical Appeals',
        content: `
            <p>Before we see AI in action, here's a quick overview:</p>

            <div class="appeal-analysis">
                <h5>Ethos (Credibility)</h5>
                <ul>
                    <li>References to experts, studies, or authorities</li>
                    <li>Professional credentials or experience</li>
                    <li>Words like: "expert," "research shows," "according to"</li>
                </ul>
            </div>

            <div class="appeal-analysis">
                <h5>Pathos (Emotion)</h5>
                <ul>
                    <li>Emotional language and vivid imagery</li>
                    <li>Appeals to values like family, freedom, justice</li>
                    <li>Words like: "feel," "hope," "fear," "children," "future"</li>
                </ul>
            </div>

            <div class="appeal-analysis">
                <h5>Logos (Logic)</h5>
                <ul>
                    <li>Facts, statistics, and data</li>
                    <li>Logical reasoning and cause-effect</li>
                    <li>Words like: "therefore," "because," "evidence," "statistics"</li>
                </ul>
            </div>
        `,
        buttons: [
            { text: 'See AI Analyze a Political Speech', nextNode: 'scenario1' }
        ]
    },

    scenario1: {
        title: 'Scenario 1: Political Speech',
        content: `
            <p>Let's see how AI analyzes this excerpt from a political speech:</p>

            <div class="game-text-sample">
                "As we face the unprecedented challenges of climate change, we must act now. Leading scientists from around the world agree that the next decade is critical. Our children's future depends on the choices we make today. The data is clear: global temperatures have risen 1.1°C since pre-industrial times, and without immediate action, we risk crossing irreversible tipping points."
            </div>

            <div class="game-analysis">
                <h4>🤖 AI Analysis Results:</h4>

                <div class="appeal-analysis">
                    <h5>Ethos (Credibility) - DETECTED</h5>
                    <ul>
                        <li>"Leading scientists from around the world" - appeals to expert authority</li>
                        <li>Establishes the speaker as informed and credible</li>
                        <li>Builds trust by referencing the scientific consensus</li>
                    </ul>
                </div>

                <div class="appeal-analysis">
                    <h5>Pathos (Emotion) - STRONG</h5>
                    <ul>
                        <li>"Our children's future" - emotional appeal to family and future generations</li>
                        <li>"Unprecedented challenges" and "irreversible tipping points" - creates urgency and concern</li>
                        <li>Targets audience values about protecting future generations</li>
                    </ul>
                </div>

                <div class="appeal-analysis">
                    <h5>Logos (Logic) - DETECTED</h5>
                    <ul>
                        <li>"1.1°C since pre-industrial times" - specific statistical evidence</li>
                        <li>"The data is clear" - appeals to factual information</li>
                        <li>Logical structure: problem identified → evidence presented → action required</li>
                    </ul>
                </div>
            </div>
        `,
        buttons: [
            { text: 'Try an Advertisement', nextNode: 'scenario2' },
            { text: 'Go Back to Teaching', nextNode: 'teaching' }
        ]
    },

    scenario2: {
        title: 'Scenario 2: Advertisement',
        content: `
            <p>Now let's see how AI analyzes a different type of text—an advertisement:</p>

            <div class="game-text-sample">
                "Join over 2 million satisfied customers who trust SecureBank for their financial future. With 150 years of banking excellence and award-winning customer service, we understand what matters most to you and your family. Protect what you've worked so hard to build. Switch to SecureBank today."
            </div>

            <div class="game-analysis">
                <h4>🤖 AI Analysis Results:</h4>

                <div class="appeal-analysis">
                    <h5>Ethos (Credibility) - VERY STRONG</h5>
                    <ul>
                        <li>"150 years of banking excellence" - established authority through longevity</li>
                        <li>"Award-winning customer service" - external validation of quality</li>
                        <li>"2 million satisfied customers" - social proof builds credibility</li>
                    </ul>
                </div>

                <div class="appeal-analysis">
                    <h5>Pathos (Emotion) - DETECTED</h5>
                    <ul>
                        <li>"Your family" - appeals to family values</li>
                        <li>"What you've worked so hard to build" - emotional connection to personal achievement</li>
                        <li>"Protect" - triggers security and safety emotions</li>
                    </ul>
                </div>

                <div class="appeal-analysis">
                    <h5>Logos (Logic) - LIMITED</h5>
                    <ul>
                        <li>"2 million customers" - quantifiable evidence of popularity</li>
                        <li>Relies more on credibility and emotion than logical argument</li>
                        <li>No specific facts about rates, services, or comparative advantages</li>
                    </ul>
                </div>
            </div>

            <p style="margin-top: 1.5rem;"><strong>Key Insight:</strong> AI detected that this advertisement primarily uses <strong>ethos</strong> (credibility) rather than logos (logic). Different types of texts emphasize different appeals!</p>
        `,
        buttons: [
            { text: 'See Academic Writing Example', nextNode: 'scenario3' },
            { text: 'Go Back', nextNode: 'scenario1' }
        ]
    },

    scenario3: {
        title: 'Scenario 3: Academic Writing',
        content: `
            <p>Finally, let's examine how AI analyzes academic writing:</p>

            <div class="game-text-sample">
                "A recent meta-analysis of 47 peer-reviewed studies (Johnson et al., 2023) demonstrates a significant correlation between social media use and anxiety levels in adolescents. The data indicates that participants who spent more than 3 hours daily on social media platforms showed 23% higher anxiety scores compared to control groups. These findings suggest that limiting social media exposure may reduce anxiety symptoms in young people."
            </div>

            <div class="game-analysis">
                <h4>🤖 AI Analysis Results:</h4>

                <div class="appeal-analysis">
                    <h5>Ethos (Credibility) - DETECTED</h5>
                    <ul>
                        <li>"Peer-reviewed studies" - establishes academic credibility</li>
                        <li>Proper citation "(Johnson et al., 2023)" - follows scholarly conventions</li>
                        <li>"Meta-analysis" - indicates rigorous research methodology</li>
                    </ul>
                </div>

                <div class="appeal-analysis">
                    <h5>Pathos (Emotion) - MINIMAL</h5>
                    <ul>
                        <li>"Anxiety" and "young people" have emotional associations</li>
                        <li>Overall tone remains neutral and objective</li>
                        <li>Academic writing typically minimizes emotional appeals</li>
                    </ul>
                </div>

                <div class="appeal-analysis">
                    <h5>Logos (Logic) - VERY STRONG</h5>
                    <ul>
                        <li>"47 peer-reviewed studies" - extensive evidence base</li>
                        <li>"23% higher anxiety scores" - specific quantitative data</li>
                        <li>Clear logical structure: evidence → findings → implications</li>
                        <li>Cause-and-effect reasoning throughout</li>
                    </ul>
                </div>
            </div>

            <p style="margin-top: 1.5rem;"><strong>Key Insight:</strong> AI identified that academic writing emphasizes <strong>logos</strong> (logic and evidence) over pathos (emotion), while still maintaining <strong>ethos</strong> through proper citation and methodology.</p>
        `,
        buttons: [
            { text: 'See Summary', nextNode: 'summary' },
            { text: 'Review Advertisement', nextNode: 'scenario2' }
        ]
    },

    summary: {
        title: 'Summary: How AI Identifies Rhetorical Appeals',
        content: `
            <div class="summary-box">
                <h4>What You've Learned:</h4>
                <p>AI can identify rhetorical appeals by recognizing patterns in text:</p>
            </div>

            <div class="appeal-analysis">
                <h5>How AI Detects Ethos:</h5>
                <ul>
                    <li>Looks for references to experts, studies, and authorities</li>
                    <li>Identifies credentials and qualifications</li>
                    <li>Recognizes social proof (e.g., "2 million customers")</li>
                    <li>Finds formal citations and scholarly language</li>
                </ul>
            </div>

            <div class="appeal-analysis">
                <h5>How AI Detects Pathos:</h5>
                <ul>
                    <li>Scans for emotional keywords (hope, fear, family, future)</li>
                    <li>Identifies vivid imagery and personal stories</li>
                    <li>Recognizes appeals to shared values</li>
                    <li>Detects urgent or dramatic language</li>
                </ul>
            </div>

            <div class="appeal-analysis">
                <h5>How AI Detects Logos:</h5>
                <ul>
                    <li>Finds statistics, percentages, and numerical data</li>
                    <li>Identifies logical connectors (therefore, because, since)</li>
                    <li>Recognizes cause-and-effect structures</li>
                    <li>Detects references to facts and evidence</li>
                </ul>
            </div>

            <div class="summary-box">
                <h4>Important Limitations:</h4>
                <ul>
                    <li>AI uses keyword patterns and may miss nuanced rhetoric</li>
                    <li>Context and cultural knowledge can be difficult for AI</li>
                    <li>Human judgment is still essential for deep analysis</li>
                    <li>AI is a tool to assist, not replace, critical thinking</li>
                </ul>
            </div>
        `,
        buttons: [
            { text: 'Start Over', nextNode: 'start' },
            { text: 'Review Examples', nextNode: 'scenario1' }
        ]
    }
};

/**
 * Initialize the game
 */
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if on curriculum page
    if (document.getElementById('hypertext-game')) {
        loadNode('start');
    }
});

/**
 * Load a game node
 */
function loadNode(nodeId) {
    currentNode = nodeId;
    const node = gameNodes[nodeId];

    if (!node) {
        console.error('Node not found:', nodeId);
        return;
    }

    const container = document.getElementById('game-node');

    // Build HTML for the node
    let html = `<h3>${node.title}</h3>`;
    html += node.content;

    // Add buttons
    if (node.buttons && node.buttons.length > 0) {
        html += '<div class="game-buttons">';
        node.buttons.forEach((button, index) => {
            const buttonClass = index === 0 ? 'game-btn' : 'game-btn secondary';
            html += `<button class="${buttonClass}" onclick="loadNode('${button.nextNode}')">${button.text}</button>`;
        });
        html += '</div>';
    }

    // Update container with fade animation
    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = html;
        container.style.transition = 'opacity 0.3s ease-in';
        container.style.opacity = '1';

        // Scroll to game section
        document.getElementById('hypertext-game').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }, 150);
}
