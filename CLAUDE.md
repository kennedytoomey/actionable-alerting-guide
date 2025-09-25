# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive web application called "Alert Customization Guide" that provides educational content about effective alert monitoring and customization strategies. The app is built with vanilla HTML, CSS, and JavaScript and serves as a companion to a comprehensive research report on alert management.

## Architecture

The application follows a simple static web architecture:

- `index.html` - Main HTML structure with all content sections
- `styles.css` - All styling including responsive design, animations, and dark mode
- `script.js` - Interactive JavaScript functionality and animations
- `report.md` - Comprehensive research report backing the interactive content

## Key Technical Features

The JavaScript (`script.js`) implements several sophisticated features:
- Mobile-responsive navigation with hamburger menu
- Smooth scrolling between sections with active link tracking
- Intersection Observer for fade-in animations
- Interactive modal system for tool comparisons
- Search functionality (Ctrl/Cmd + K) with content indexing
- Dark mode toggle with localStorage persistence
- Progress indicator showing reading progress
- Keyboard navigation between sections
- Tooltip system for enhanced UX
- Actionable button demos with ripple effects

## Development Commands

Since this is a static web application, there are no build commands. For local development:

```bash
# Serve locally with Python
python -m http.server 8000

# Or with Node.js
npx http-server

# Or simply open index.html in a browser
open index.html
```

## Deployment

The application is designed for GitHub Pages deployment:
1. Push to GitHub repository
2. Enable GitHub Pages from repository settings
3. Select "main" branch and "/ (root)" folder
4. Site will be available at `https://[username].github.io/[repository-name]`

## Customization Guidelines

The app uses CSS custom properties for theming:
- Colors defined in `:root` section of `styles.css`
- Responsive design using CSS Grid and Flexbox
- JavaScript features are modular and can be extended

Content sections are defined in `index.html` with class `section` and unique IDs for navigation.

## Browser Compatibility

Supports modern browsers including Chrome, Firefox, Safari, Edge, and mobile browsers. Uses modern JavaScript features like Intersection Observer and CSS custom properties.