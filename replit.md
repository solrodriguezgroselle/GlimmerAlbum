# Overview

GLIMMER is a Flask-based web application that provides an interactive tutorial for creating photo albums. The project serves as an educational guide with step-by-step instructions, featuring a modern web interface with smooth animations, progress tracking, and responsive design elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Template Engine**: Jinja2 templates for server-side rendering
- **Styling**: Custom CSS with CSS variables for consistent theming and responsive design
- **JavaScript**: Vanilla JavaScript for interactive features including scroll animations, progress tracking, and smooth scrolling
- **UI Framework**: Custom-built interface with Font Awesome icons for visual enhancement

## Backend Architecture
- **Web Framework**: Flask serving as a lightweight web server
- **Routing**: Single-route application serving the main tutorial page
- **Session Management**: Flask sessions with configurable secret key
- **Logging**: Python logging module configured for debugging

## Design Patterns
- **MVC Pattern**: Clear separation between templates (views), Flask routes (controllers), and static assets
- **Progressive Enhancement**: Base functionality works without JavaScript, enhanced with interactive features
- **Mobile-First Design**: Responsive CSS ensuring compatibility across devices

## Development Configuration
- **Environment Variables**: Session secret configurable via environment variables with fallback defaults
- **Debug Mode**: Enabled for development with hot reloading
- **Static Assets**: Organized in dedicated static directory for CSS, JavaScript, and potential future assets

# External Dependencies

## Frontend Libraries
- **Font Awesome 6.0.0**: Icon library loaded via CDN for visual enhancements

## Python Dependencies
- **Flask**: Core web framework for routing and template rendering
- **Python Standard Library**: OS module for environment variable access, logging for debugging

## Development Tools
- **Built-in Flask Development Server**: Hot reloading and debugging capabilities
- **Standard Web Technologies**: HTML5, CSS3, ES6+ JavaScript for cross-browser compatibility