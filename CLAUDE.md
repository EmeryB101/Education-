# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an educational website for a higher education course on "Rhetoric, Composition, and AI." The site features interactive demonstrations, an educational narrative game built with p5.js, and comprehensive student resources.

## Technology Stack

- **Core**: HTML5, CSS3, JavaScript (ES6+)
- **Game Engine**: p5.js (loaded via CDN)
- **Deployment**: GitHub Pages (static site)
- **No build process required** - all files are served directly

## Project Structure

```
/
├── index.html              # About the Course page
├── curriculum.html         # Curriculum page with embedded game
├── resources.html          # Student Resources page
├── css/
│   ├── main.css           # Core styles, CSS variables, layouts
│   ├── animations.css     # Page transitions and animations
│   └── game.css           # Game-specific styles
├── js/
│   ├── main.js            # Utilities, worksheet generation
│   ├── navigation.js      # Mobile menu, nav interactions
│   ├── interactions.js    # AI Rhetorical Appeals Analyzer
│   └── game/
│       ├── story-data.js  # Narrative structure (15+ nodes)
│       └── game.js        # p5.js game engine
└── assets/
    ├── images/            # (Future: images and graphics)
    └── data/              # (Future: data files)
```

## Key Features

### 1. AI Rhetorical Appeals Analyzer (index.html)
- Interactive text analysis tool on the About page
- Analyzes input text for ethos, pathos, and logos
- Heuristic-based keyword detection with animated results
- Located in `js/interactions.js:initRhetoricalAnalyzer()`

### 2. The AI Rhetorician Game (curriculum.html)
- Twine-style narrative game using p5.js
- 15+ interconnected story nodes with branching choices
- Multiple endings based on player decisions about AI ethics
- Stats tracking: integrity, understanding, efficiency
- Visual features:
  - Typewriter text effect
  - Particle effects on choices
  - Animated stat bars
  - Responsive canvas

**Game Architecture:**
- `story-data.js`: Complete narrative structure as JSON
- `game.js`: p5.js rendering engine with game loop
- Player choices affect stats and lead to different endings

### 3. Printable Worksheets (resources.html)
Three worksheets generated dynamically as HTML in new windows:
- Rhetorical Analysis Framework for AI-Generated Text
- Effective Prompting Guide for Rhetorical Analysis
- Checklist: Evaluating AI Writing Assistance

Function: `main.js:openWorksheet(worksheetId)`

## Development Commands

### Local Development
```bash
# Serve locally with Python 3
python3 -m http.server 8000

# Or with Python 2
python -m SimpleHTTPServer 8000

# Or with Node.js http-server
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

### GitHub Pages Deployment
No build required. Simply push to the appropriate branch:
```bash
git add .
git commit -m "Update site"
git push origin main  # or your configured branch
```

GitHub Pages will automatically serve the site.

## CSS Architecture

### CSS Variables (main.css)
All colors, spacing, typography, and transitions defined as CSS custom properties in `:root` for easy theming.

**Key Variables:**
- `--primary-color`: #3b82f6 (blue)
- `--secondary-color`: #8b5cf6 (purple)
- `--accent-color`: #f59e0b (orange)

### Responsive Design
- Mobile-first approach
- Breakpoint: 768px for tablet/desktop
- Mobile navigation with hamburger menu

### Animation System (animations.css)
- Page transitions: fade-in on load
- Interactive animations: pulse, glow, shake
- Game animations: typewriter, progress bars
- Accessibility: respects `prefers-reduced-motion`

## JavaScript Architecture

### Module Pattern
Each JS file has a specific responsibility:
- `main.js`: Global utilities and worksheet generation
- `navigation.js`: Nav menu interactions
- `interactions.js`: AI analyzer demo
- `game/story-data.js`: Pure data (game narrative)
- `game/game.js`: p5.js game engine (rendering + logic)

### Game State Management
Game state stored in `gameState` object:
```javascript
{
    currentNode: string,      // Current story node ID
    visitedNodes: array,      // History of visited nodes
    stats: {                  // Player stats
        integrity: number,
        understanding: number,
        efficiency: number
    },
    history: array            // Full navigation history
}
```

## Modifying Content

### Adding Story Nodes
Edit `js/game/story-data.js`:
1. Add new node to `nodes` object
2. Define text, choices, and impacts
3. Link from existing nodes via `nextNode`

### Updating Worksheets
Edit generation functions in `js/main.js`:
- `generateWorksheet1()` - Rhetorical Analysis Framework
- `generateWorksheet2()` - Prompting Guide
- `generateWorksheet3()` - Evaluation Checklist

### Styling Updates
- Global styles: `css/main.css`
- Animations: `css/animations.css`
- Game-specific: `css/game.css`

## p5.js Game Functions

### Core Game Loop
- `setup()`: Initialize canvas and game state
- `draw()`: Render frame (60 FPS)
- `mousePressed()`: Handle button clicks
- `mouseWheel()`: Handle scrolling

### Key Functions
- `loadNode(nodeId)`: Transition to new story node
- `drawStoryText()`: Render text with typewriter effect
- `drawChoices()`: Render choice buttons
- `createParticleEffect()`: Visual feedback
- `showEnding()`: Display ending screen

## Browser Compatibility

Tested and works on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Requirements:
- ES6+ JavaScript support
- CSS Grid and Flexbox
- Canvas API (for p5.js)

## Content Philosophy

The site explores themes of:
- Ethical AI use in academic writing
- Rhetorical analysis with and without AI tools
- Critical evaluation of AI-generated content
- Transparency in AI-assisted work
- Human-AI collaboration in composition

The game specifically teaches through branching narratives where choices about AI use lead to different academic and ethical outcomes.

## Future Enhancement Ideas

- Add more story branches to the game
- Create additional interactive demos (e.g., prompt comparison tool)
- Add images/graphics to enhance visual appeal
- Create video content or tutorials
- Implement analytics to track student engagement
- Add accessibility features (screen reader optimization)
- Create additional worksheets or downloadable resources

## Files Not to Modify

- p5.js is loaded via CDN (no local copy)
- `.git/` directory (git internals)
- This CLAUDE.md file (unless updating documentation)
