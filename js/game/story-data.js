/**
 * Story Data for "The AI Rhetorician" Game
 * A Twine-style narrative about learning rhetorical analysis with AI
 */

const storyData = {
    // Game metadata
    title: "The AI Rhetorician",
    subtitle: "A Journey Through Rhetorical Analysis with AI",

    // Starting node
    startNode: "intro",

    // All story nodes
    nodes: {
        intro: {
            id: "intro",
            text: "You're a composition student who just received a challenging assignment: analyze the rhetoric of a controversial political speech by next week. Your professor emphasized the importance of identifying ethos, pathos, and logos while considering the speaker's audience and historical context.\n\nYou've heard classmates talking about using AI tools like ChatGPT and Claude for rhetorical analysis. You're curious but unsure how to proceed ethically and effectively.",
            choices: [
                {
                    text: "Read the speech carefully first, then consider AI",
                    nextNode: "read_first",
                    impact: { integrity: 2, understanding: 2 }
                },
                {
                    text: "Start with AI analysis to get ideas quickly",
                    nextNode: "ai_first",
                    impact: { integrity: -1, efficiency: 2 }
                },
                {
                    text: "Research the historical context before anything else",
                    nextNode: "context_first",
                    impact: { understanding: 3, efficiency: -1 }
                }
            ]
        },

        read_first: {
            id: "read_first",
            text: "You spend an hour reading the speech multiple times, taking notes on passages that stand out. You notice the speaker repeatedly references scientific studies (logos), appeals to family values (pathos), and establishes credibility through personal experience (ethos).\n\nNow you have your own preliminary analysis. How will you use AI to develop it further?",
            choices: [
                {
                    text: "Ask AI to verify your analysis and suggest improvements",
                    nextNode: "verify_analysis",
                    impact: { integrity: 2, understanding: 1 }
                },
                {
                    text: "Ask AI to identify rhetorical devices you might have missed",
                    nextNode: "find_missed",
                    impact: { understanding: 2 }
                },
                {
                    text: "Use AI to help structure your essay outline",
                    nextNode: "structure_help",
                    impact: { efficiency: 2 }
                }
            ]
        },

        ai_first: {
            id: "ai_first",
            text: "You paste the speech into ChatGPT with the prompt: 'Analyze the rhetoric of this speech.'\n\nThe AI provides a comprehensive analysis identifying multiple rhetorical devices, appeals, and strategies. It looks impressive and thorough.\n\nBut wait—you haven't actually read the speech carefully yourself yet. What do you do?",
            choices: [
                {
                    text: "Read the speech now to verify AI's claims",
                    nextNode: "verify_ai_claims",
                    impact: { integrity: 1, understanding: 1 }
                },
                {
                    text: "Use the AI analysis as-is, it seems accurate",
                    nextNode: "trust_ai_fully",
                    impact: { integrity: -3, efficiency: 2 }
                },
                {
                    text: "Ask AI follow-up questions to deepen the analysis",
                    nextNode: "followup_questions",
                    impact: { understanding: 1 }
                }
            ]
        },

        context_first: {
            id: "context_first",
            text: "You research the speech's historical context: when it was delivered, the political climate, the audience, and the speaker's background. This gives you valuable insight into why certain rhetorical strategies were chosen.\n\nWith this context, you feel better prepared. How will you approach the rhetorical analysis?",
            choices: [
                {
                    text: "Use AI to analyze how context influences rhetoric",
                    nextNode: "contextual_ai_analysis",
                    impact: { understanding: 3, integrity: 1 }
                },
                {
                    text: "Analyze the speech yourself with context in mind",
                    nextNode: "manual_contextual",
                    impact: { understanding: 2, integrity: 2 }
                },
                {
                    text: "Ask AI to compare this speech to others from the same era",
                    nextNode: "comparative_analysis",
                    impact: { understanding: 2, efficiency: 1 }
                }
            ]
        },

        verify_analysis: {
            id: "verify_analysis",
            text: "You prompt AI: 'I've identified these rhetorical appeals in this speech: [your notes]. Please evaluate my analysis and suggest what I might have missed.'\n\nThe AI confirms some of your observations and points out that you overlooked several instances of antithesis and anaphora. It also notes that one passage you labeled as logos might be better understood as pathos with statistical framing.\n\nThis is helpful! But should you trust it completely?",
            choices: [
                {
                    text: "Verify the AI's new observations in the original text",
                    nextNode: "verify_new_observations",
                    impact: { integrity: 2, understanding: 2 }
                },
                {
                    text: "Accept the corrections and move forward",
                    nextNode: "accept_corrections",
                    impact: { efficiency: 1, integrity: -1 }
                },
                {
                    text: "Ask AI to explain its reasoning for the corrections",
                    nextNode: "explain_reasoning",
                    impact: { understanding: 2 }
                }
            ]
        },

        verify_ai_claims: {
            id: "verify_ai_claims",
            text: "You carefully read the speech while checking each of the AI's claims. You discover:\n- 3 of the AI's examples are accurate and insightful\n- 2 examples cite passages that don't actually exist in the speech\n- 1 analysis misinterprets the context\n\nThis is a crucial lesson: AI can be helpful but requires verification!",
            choices: [
                {
                    text: "Use only verified AI insights, discard errors",
                    nextNode: "selective_use",
                    impact: { integrity: 3, understanding: 2 }
                },
                {
                    text: "Ask AI to re-analyze with more specific prompts",
                    nextNode: "better_prompts",
                    impact: { understanding: 2, efficiency: 1 }
                },
                {
                    text: "Abandon AI entirely, do it yourself from scratch",
                    nextNode: "manual_analysis",
                    impact: { integrity: 2, efficiency: -2 }
                }
            ]
        },

        trust_ai_fully: {
            id: "trust_ai_fully",
            text: "You incorporate the AI's analysis directly into your essay with minimal changes. It's well-written and seems thorough.\n\nDuring class peer review, another student asks you to explain a specific rhetorical device you mentioned. You realize you can't—you don't fully understand the analysis you submitted because you relied entirely on AI.\n\nYour professor pulls you aside: 'I can tell this analysis isn't in your voice. Let's talk about academic integrity.'",
            choices: [
                {
                    text: "Admit you used AI without proper engagement",
                    nextNode: "honest_admission",
                    impact: { integrity: 1 }
                },
                {
                    text: "Defend your AI use as a legitimate tool",
                    nextNode: "defend_ai_use",
                    impact: { integrity: -2 }
                },
                {
                    text: "Ask to revise the assignment with better practices",
                    nextNode: "request_revision",
                    impact: { integrity: 2, understanding: 1 }
                }
            ]
        },

        verify_new_observations: {
            id: "verify_new_observations",
            text: "You check the speech for the rhetorical devices AI mentioned. Sure enough, there are three clear examples of anaphora you missed! The AI was right about the pathos/logos distinction too.\n\nHowever, one of the AI's suggestions about antithesis doesn't quite work—it identified a contrast that's not really parallel structure.\n\nYou now have a stronger analysis that combines your insights with AI's observations, filtered through your critical judgment.",
            choices: [
                {
                    text: "Write your essay incorporating both perspectives",
                    nextNode: "collaborative_essay",
                    impact: { understanding: 3, integrity: 2 }
                },
                {
                    text: "Document your AI-assisted process in your reflection",
                    nextNode: "document_process",
                    impact: { integrity: 3, understanding: 1 }
                }
            ]
        },

        better_prompts: {
            id: "better_prompts",
            text: "You craft more specific prompts:\n'Analyze this speech using Aristotelian rhetorical appeals. For each appeal (ethos, pathos, logos), provide specific quotes from the text and explain the strategy.'\n\nThis time, the AI provides much more accurate analysis with proper citations. You learn that prompt quality dramatically affects AI output quality.\n\nThis is a valuable skill for working with AI tools!",
            choices: [
                {
                    text: "Verify these new findings and proceed with essay",
                    nextNode: "proceed_with_verification",
                    impact: { integrity: 2, understanding: 2 }
                },
                {
                    text: "Experiment with different prompt formulations",
                    nextNode: "prompt_experiments",
                    impact: { understanding: 3, efficiency: -1 }
                }
            ]
        },

        contextual_ai_analysis: {
            id: "contextual_ai_analysis",
            text: "You prompt the AI: 'Given that this speech was delivered in [context], analyze how the historical moment shapes the rhetorical choices. How might the audience have received these appeals differently than a modern audience?'\n\nThe AI provides fascinating insights about kairos—rhetorical timing—and how the speaker adapted to the moment. Your analysis is becoming quite sophisticated!",
            choices: [
                {
                    text: "Verify AI's historical claims with sources",
                    nextNode: "verify_historical",
                    impact: { integrity: 2, understanding: 3 }
                },
                {
                    text: "Use this as framework for your essay",
                    nextNode: "contextual_essay",
                    impact: { understanding: 2, efficiency: 1 }
                }
            ]
        },

        honest_admission: {
            id: "honest_admission",
            text: "You explain honestly: 'I used AI to generate the analysis but didn't engage critically with it. I see now that I short-changed my own learning.'\n\nYour professor appreciates your honesty: 'This is exactly why we need to talk about AI in education. Let's discuss how to use these tools to enhance—not replace—your learning. I'd like you to revise this assignment, but this time, I want you to document your AI use transparently.'",
            choices: [
                {
                    text: "Revise with transparent AI collaboration",
                    nextNode: "transparent_revision",
                    impact: { integrity: 3, understanding: 2 }
                }
            ]
        },

        transparent_revision: {
            id: "transparent_revision",
            text: "You revise your analysis with a new approach:\n1. Read and annotate the speech yourself\n2. Draft preliminary analysis\n3. Use AI to challenge your thinking\n4. Verify AI suggestions\n5. Write essay in your own voice\n6. Include a reflection on your AI-assisted process\n\nThis transparent, critical approach to AI collaboration leads to your best work yet. You've learned to use AI as a thinking partner while maintaining intellectual ownership.",
            choices: [
                {
                    text: "Complete the assignment",
                    nextNode: "ending_transparent_scholar",
                    impact: { integrity: 5, understanding: 4 }
                }
            ]
        },

        collaborative_essay: {
            id: "collaborative_essay",
            text: "Your essay synthesizes your original observations with AI-enhanced insights. You cite the AI tool in your works cited and include a brief note about your methodology.\n\nThe result is stronger than you could have produced alone, but it's clearly your work—you understand every claim, you've verified every example, and your voice comes through clearly.\n\nYour professor's feedback: 'Excellent work. You've demonstrated both strong rhetorical analysis and responsible AI use.'",
            choices: [
                {
                    text: "Reflect on what you learned",
                    nextNode: "ending_thoughtful_collaborator",
                    impact: { understanding: 5, integrity: 4 }
                }
            ]
        },

        document_process: {
            id: "document_process",
            text: "In addition to your essay, you write a detailed reflection documenting:\n- Your initial analysis process\n- How you used AI and what prompts you gave\n- Which AI suggestions you accepted, rejected, or modified\n- What you learned about both rhetoric and AI collaboration\n\nThis metacognitive reflection deepens your learning. You're not just analyzing rhetoric—you're analyzing your own analytical process. Your professor uses your reflection as a model for the class.",
            choices: [
                {
                    text: "Share insights with classmates",
                    nextNode: "ending_reflective_practitioner",
                    impact: { understanding: 5, integrity: 5 }
                }
            ]
        },

        proceed_with_verification: {
            id: "proceed_with_verification",
            text: "You verify each of the AI's newly specific claims and find them accurate. The improved prompts made all the difference.\n\nYou write your essay using this verified analysis, confident that every claim is supported and that you understand the rhetorical strategies at play. You've learned an important lesson about prompt engineering and critical evaluation.",
            choices: [
                {
                    text: "Submit your work",
                    nextNode: "ending_skilled_prompter",
                    impact: { understanding: 4, integrity: 3 }
                }
            ]
        },

        verify_historical: {
            id: "verify_historical",
            text: "You check the AI's historical claims against scholarly sources. Most are accurate, but you find one significant error: the AI misattributed a historical event by two years, which would change the interpretation.\n\nYou correct this in your essay and cite the actual historical sources. Your analysis is now historically grounded and rhetorically sophisticated. This is high-quality work that demonstrates both AI-enhanced research and critical source evaluation.",
            choices: [
                {
                    text: "Finalize your essay",
                    nextNode: "ending_critical_historian",
                    impact: { understanding: 5, integrity: 4 }
                }
            ]
        },

        ending_transparent_scholar: {
            id: "ending_transparent_scholar",
            text: "🎓 Ending: The Transparent Scholar\n\nYou've completed the assignment with integrity and intellectual honesty. Your revised work demonstrates:\n- Deep understanding of rhetorical analysis\n- Critical engagement with AI tools\n- Transparent documentation of your process\n- Genuine learning and growth\n\nYour professor asks you to present your AI collaboration methodology to the class. Your honest mistake became a valuable learning experience that benefits everyone.\n\nKey Lesson: Transparency and honesty in AI use, even when admitting mistakes, leads to better learning outcomes and maintains academic integrity.",
            choices: [],
            isEnding: true,
            endingType: "best"
        },

        ending_thoughtful_collaborator: {
            id: "ending_thoughtful_collaborator",
            text: "🎓 Ending: The Thoughtful Collaborator\n\nYou've successfully navigated the challenge of AI-assisted rhetorical analysis. Your approach was:\n- Self-directed initial analysis\n- Strategic AI collaboration\n- Critical verification of all claims\n- Integration of multiple perspectives\n\nYour grade: A\n\nYou've developed a sustainable model for working with AI: use it to enhance your thinking, verify its outputs, and maintain ownership of your intellectual work.\n\nKey Lesson: AI tools are most effective when used to augment rather than replace human analysis and critical thinking.",
            choices: [],
            isEnding: true,
            endingType: "good"
        },

        ending_reflective_practitioner: {
            id: "ending_reflective_practitioner",
            text: "🎓 Ending: The Reflective Practitioner\n\nYour metacognitive approach to the assignment impressed your professor. By documenting not just what you learned but how you learned it, you've demonstrated:\n- Advanced critical thinking\n- Self-awareness about learning processes\n- Ethical AI collaboration practices\n- Ability to articulate complex methodological choices\n\nYour grade: A+\n\nYour reflection becomes required reading for next semester's class. You've contributed to pedagogical understanding of AI in composition.\n\nKey Lesson: Reflecting on how we learn is as valuable as what we learn. Transparent documentation of AI use creates accountability and deepens understanding.",
            choices: [],
            isEnding: true,
            endingType: "best"
        },

        ending_skilled_prompter: {
            id: "ending_skilled_prompter",
            text: "🎓 Ending: The Skilled Prompter\n\nThrough trial and error, you've learned that AI effectiveness depends largely on prompt quality. Your work demonstrates:\n- Iterative refinement of AI prompts\n- Critical evaluation of outputs\n- Verification of claims\n- Strategic use of AI capabilities\n\nYour grade: A-\n\nYou've developed prompt engineering skills that will serve you well in future AI-assisted work. You understand that getting good results from AI requires skill, not just access.\n\nKey Lesson: Effective AI use is a skill that requires practice, refinement, and critical judgment. Quality prompts yield quality results.",
            choices: [],
            isEnding: true,
            endingType: "good"
        },

        ending_critical_historian: {
            id: "ending_critical_historian",
            text: "🎓 Ending: The Critical Historian\n\nYour contextually grounded rhetorical analysis impressed your professor. You demonstrated:\n- Sophisticated historical research\n- Critical evaluation of AI-provided information\n- Integration of rhetorical and historical analysis\n- Careful source verification\n\nYour grade: A+\n\nYour essay will be featured in the department's undergraduate research showcase. You've shown that AI can enhance research when combined with traditional scholarly methods.\n\nKey Lesson: AI can accelerate research and provide insights, but human expertise in source evaluation and contextual understanding remains essential for scholarly work.",
            choices: [],
            isEnding: true,
            endingType: "best"
        },

        // Additional nodes for other paths
        followup_questions: {
            id: "followup_questions",
            text: "You ask AI: 'Can you explain why you identified this passage as using pathos? What specific linguistic features signal emotional appeal?'\n\nThe AI's explanation helps you understand the rhetorical strategy better. But you still haven't read the full speech yourself...",
            choices: [
                {
                    text: "Now read the speech carefully",
                    nextNode: "late_careful_reading",
                    impact: { understanding: 2 }
                },
                {
                    text: "Continue with AI-based analysis",
                    nextNode: "continued_ai_reliance",
                    impact: { integrity: -2, efficiency: 1 }
                }
            ]
        },

        late_careful_reading: {
            id: "late_careful_reading",
            text: "Reading the speech after seeing AI's analysis gives you a different perspective. You can now evaluate whether you agree with the AI's interpretations.\n\nYou find that while AI was mostly correct, you notice nuances and contextual elements the AI missed. Your understanding is now richer than either your initial impression or the AI's analysis alone.",
            choices: [
                {
                    text: "Synthesize both perspectives in your essay",
                    nextNode: "synthesis_approach",
                    impact: { understanding: 3, integrity: 2 }
                }
            ]
        },

        synthesis_approach: {
            id: "synthesis_approach",
            text: "Your essay combines AI-identified patterns with your own contextual insights. You note in your works cited that you consulted AI tools, being transparent about your process.\n\nThe result is solid work that benefits from AI assistance while clearly bearing your own intellectual stamp.",
            choices: [
                {
                    text: "Submit the assignment",
                    nextNode: "ending_balanced_approach",
                    impact: { understanding: 3, integrity: 3 }
                }
            ]
        },

        ending_balanced_approach: {
            id: "ending_balanced_approach",
            text: "🎓 Ending: The Balanced Approach\n\nYou've navigated AI assistance with reasonable judgment, though not perfectly. Your work shows:\n- Use of AI as a starting point\n- Critical engagement with AI outputs\n- Integration of your own analysis\n- Transparent citation of AI tools\n\nYour grade: B+\n\nYou've learned that AI can be helpful but works best when combined with your own careful reading and analysis. Next time, you'll probably read the text first!\n\nKey Lesson: AI tools are most effective when they complement, not precede, your own engagement with material.",
            choices: [],
            isEnding: true,
            endingType: "moderate"
        },

        request_revision: {
            id: "request_revision",
            text: "You ask: 'Can I revise this assignment? I realize I didn't engage with it properly. I'd like to demonstrate that I can use AI tools responsibly while actually learning the material.'\n\nYour professor agrees: 'I appreciate your self-awareness. Yes, let's call this a draft. I want you to revise it, but this time, document your process clearly.'",
            choices: [
                {
                    text: "Revise with better practices",
                    nextNode: "transparent_revision",
                    impact: { integrity: 3, understanding: 2 }
                }
            ]
        },

        continued_ai_reliance: {
            id: "continued_ai_reliance",
            text: "You continue building your essay primarily from AI responses without carefully reading the source text. The work looks polished but feels hollow—you can't quite explain the reasoning behind the analysis.\n\nWhen the essay comes back graded, you receive a C with a note: 'This reads like an AI summary, not an engaged analysis. See me.'",
            choices: [
                {
                    text: "Reflect on what went wrong",
                    nextNode: "ending_cautionary_tale",
                    impact: { understanding: 1 }
                }
            ]
        },

        ending_cautionary_tale: {
            id: "ending_cautionary_tale",
            text: "⚠️ Ending: The Cautionary Tale\n\nYour over-reliance on AI without critical engagement led to superficial learning. The consequences:\n- Lower grade (C)\n- Missed learning opportunity\n- Lack of genuine understanding\n- Inability to discuss your own work\n\nYour grade: C\n\nYou realize that using AI as a substitute for thinking rather than a tool for thinking defeats the purpose of education. You resolve to engage more critically with course material—and with AI tools—in the future.\n\nKey Lesson: AI cannot replace deep engagement with material. Over-reliance on AI tools without critical thought leads to shallow understanding and poor outcomes.",
            choices: [],
            isEnding: true,
            endingType: "poor"
        }
    }
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = storyData;
}
