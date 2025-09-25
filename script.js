// Alert Customization Guide - Interactive JavaScript

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navbar background opacity on scroll
function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.pageYOffset;
    
    if (scrollPosition > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll(
        '.overview-card, .comparison-card, .customization-card, .practice-card, .tool-card, .ai-capability, .vision-card, .roadmap-step, .impact-stat, .feature-category, .benefit-item, .datadog-hero-card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Interactive Features

// Alert Type Comparison Interactive
function initializeComparison() {
    const alertCard = document.querySelector('.alert-card');
    const notificationCard = document.querySelector('.notification-card');
    
    if (alertCard && notificationCard) {
        alertCard.addEventListener('mouseenter', () => {
            alertCard.style.transform = 'scale(1.02)';
            alertCard.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.2)';
        });
        
        alertCard.addEventListener('mouseleave', () => {
            alertCard.style.transform = 'scale(1)';
            alertCard.style.boxShadow = '';
        });
        
        notificationCard.addEventListener('mouseenter', () => {
            notificationCard.style.transform = 'scale(1.02)';
            notificationCard.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.2)';
        });
        
        notificationCard.addEventListener('mouseleave', () => {
            notificationCard.style.transform = 'scale(1)';
            notificationCard.style.boxShadow = '';
        });
    }
}

// Interactive action buttons demo
function initializeActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            // Show action feedback
            const originalText = button.textContent;
            button.textContent = '✓ Done';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.removeChild(ripple);
            }, 1500);
        });
    });
}

// Progress indicator for roadmap
function initializeRoadmapProgress() {
    const roadmapSteps = document.querySelectorAll('.roadmap-step');
    
    roadmapSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            // Mark this step and all previous as completed
            roadmapSteps.forEach((s, i) => {
                const stepNumber = s.querySelector('.step-number');
                if (i <= index) {
                    stepNumber.style.background = '#10b981';
                    stepNumber.innerHTML = '✓';
                    s.style.borderLeft = '4px solid #10b981';
                } else {
                    stepNumber.style.background = '';
                    stepNumber.innerHTML = i + 1;
                    s.style.borderLeft = '';
                }
            });
        });
    });
}

// Tool comparison interactive features
function initializeToolComparison() {
    const toolCards = document.querySelectorAll('.tool-card');
    const featureCategories = document.querySelectorAll('.feature-category');
    
    // Handle legacy tool cards
    toolCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            toolCards.forEach(c => c.classList.remove('active-tool'));
            
            // Add active class to clicked card
            card.classList.add('active-tool');
            
            // Show comparison modal or detailed view
            showToolDetails(card);
        });
    });
    
    // Handle Datadog feature categories
    featureCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Add highlight effect
            category.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
            category.style.borderLeft = '4px solid var(--primary-color)';
            
            // Show feature details
            showFeatureCategoryDetails(category);
            
            // Reset highlight after animation
            setTimeout(() => {
                category.style.background = '';
                category.style.borderLeft = '';
            }, 2000);
        });
    });
}

// Show detailed tool information
function showToolDetails(toolCard) {
    const toolName = toolCard.querySelector('h4').textContent;
    const features = Array.from(toolCard.querySelectorAll('.feature-item')).map(item => item.textContent);
    
    // Create modal or detailed view
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${toolName} - Detailed Features</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <ul>
                    ${features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <p>This tool offers comprehensive alert management capabilities suitable for enterprise environments.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Show detailed feature category information for Datadog
function showFeatureCategoryDetails(categoryCard) {
    const categoryName = categoryCard.querySelector('h4').textContent;
    const features = Array.from(categoryCard.querySelectorAll('.feature-list li')).map(item => item.textContent);
    
    // Create modal for Datadog feature details
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Datadog On-Call: ${categoryName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="datadog-feature-details">
                    <ul>
                        ${features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="feature-highlight">
                        <p><strong>Key Advantage:</strong> ${getCategoryAdvantage(categoryName)}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Get category-specific advantages
function getCategoryAdvantage(categoryName) {
    const advantages = {
        'Smart Alerting': 'Deep integration with Datadog observability provides unmatched context in every alert, enabling faster resolution times.',
        'Team Collaboration': 'Streamlined incident response workflows with automated escalation and real-time collaboration tools.',
        'Observability Integration': 'Native platform integration eliminates data silos and provides comprehensive system visibility.',
        'Analytics & Insights': 'Advanced analytics help teams optimize their incident response processes and prevent future issues.'
    };
    
    return advantages[categoryName.replace(/.*\s/, '')] || 'Comprehensive incident management capabilities designed for modern DevOps teams.';
}

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '');
            }
        }, 20);
    });
}

// Search functionality
function initializeSearch() {
    // Create search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search the guide...">
            <div class="search-results"></div>
        </div>
    `;
    
    document.body.appendChild(searchOverlay);
    
    // Add search trigger (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showSearch();
        }
        
        if (e.key === 'Escape') {
            hideSearch();
        }
    });
    
    function showSearch() {
        searchOverlay.style.display = 'flex';
        searchOverlay.querySelector('.search-input').focus();
    }
    
    function hideSearch() {
        searchOverlay.style.display = 'none';
        searchOverlay.querySelector('.search-input').value = '';
        searchOverlay.querySelector('.search-results').innerHTML = '';
    }
    
    // Search implementation
    const searchInput = searchOverlay.querySelector('.search-input');
    const searchResults = searchOverlay.querySelector('.search-results');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = searchContent(query);
        displaySearchResults(results, searchResults);
    });
    
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            hideSearch();
        }
    });
}

// Search content function
function searchContent(query) {
    const sections = document.querySelectorAll('.section');
    const results = [];
    
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const sectionTitle = section.querySelector('.section-title')?.textContent || '';
        const sectionContent = section.textContent.toLowerCase();
        
        if (sectionContent.includes(query)) {
            const headings = section.querySelectorAll('h3, h4');
            headings.forEach(heading => {
                if (heading.textContent.toLowerCase().includes(query)) {
                    results.push({
                        title: heading.textContent,
                        section: sectionTitle,
                        sectionId: sectionId,
                        type: 'heading'
                    });
                }
            });
            
            // Also add section itself if title matches
            if (sectionTitle.toLowerCase().includes(query)) {
                results.push({
                    title: sectionTitle,
                    section: sectionTitle,
                    sectionId: sectionId,
                    type: 'section'
                });
            }
        }
    });
    
    return results.slice(0, 10); // Limit results
}

// Display search results
function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }
    
    container.innerHTML = results.map(result => `
        <div class="search-result" data-section="${result.sectionId}">
            <div class="result-title">${result.title}</div>
            <div class="result-section">${result.section}</div>
        </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.search-result').forEach(result => {
        result.addEventListener('click', () => {
            const sectionId = result.getAttribute('data-section');
            scrollToSection(sectionId);
            document.querySelector('.search-overlay').style.display = 'none';
        });
    });
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Navigate between sections with arrow keys when not typing
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            const sections = ['overview', 'foundations', 'customization', 'delivery', 'management', 'advanced'];
            const currentSection = getCurrentSection();
            const currentIndex = sections.indexOf(currentSection);
            
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % sections.length;
                scrollToSection(sections[nextIndex]);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
                scrollToSection(sections[prevIndex]);
            }
        }
    });
}

// Get current section based on scroll position
function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    let current = 'overview';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    return current;
}

// Progress indicator
function createProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-indicator';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.querySelector('.progress-fill').style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
}

// Tooltip system
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            element._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element._tooltip) {
                document.body.removeChild(element._tooltip);
                element._tooltip = null;
            }
        });
    });
}

// Dark mode toggle
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    document.querySelector('.nav-container').appendChild(darkModeToggle);
    
    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', null);
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbarOnScroll();
});

window.addEventListener('resize', () => {
    // Handle responsive adjustments
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial delay to let content load
    setTimeout(() => {
        initializeAnimations();
        initializeComparison();
        initializeActionButtons();
        initializeRoadmapProgress();
        initializeToolComparison();
        initializeSearch();
        initializeKeyboardNavigation();
        initializeTooltips();
        initializeDarkMode();
        createProgressIndicator();
        
        // Animate counters when they come into view
        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            });
            statsObserver.observe(statsSection);
        }
    }, 100);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .active-tool {
        border: 2px solid var(--primary-color) !important;
        transform: translateY(-4px) !important;
    }
    
    .tool-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    
    .modal-content {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
    }
    
    .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: flex-start;
        justify-content: center;
        padding-top: 10vh;
        z-index: 2000;
    }
    
    .search-container {
        background: white;
        border-radius: 1rem;
        padding: 1rem;
        max-width: 600px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .search-input {
        width: 100%;
        padding: 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 1.1rem;
        outline: none;
    }
    
    .search-input:focus {
        border-color: var(--primary-color);
    }
    
    .search-results {
        max-height: 400px;
        overflow-y: auto;
        margin-top: 1rem;
    }
    
    .search-result {
        padding: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    
    .search-result:hover {
        background: #f3f4f6;
    }
    
    .result-title {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }
    
    .result-section {
        font-size: 0.875rem;
        color: #6b7280;
    }
    
    .no-results {
        padding: 2rem;
        text-align: center;
        color: #6b7280;
    }
    
    .progress-indicator {
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(37, 99, 235, 0.1);
        z-index: 1000;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--primary-color);
        transition: width 0.3s ease;
        width: 0%;
    }
    
    .tooltip {
        position: absolute;
        background: var(--gray-900);
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        z-index: 1000;
        opacity: 0;
        animation: fadeInTooltip 0.2s ease forwards;
    }
    
    @keyframes fadeInTooltip {
        to {
            opacity: 1;
        }
    }
    
    .dark-mode-toggle {
        background: none;
        border: none;
        color: var(--gray-600);
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .dark-mode-toggle:hover {
        background: var(--gray-100);
        color: var(--primary-color);
    }
    
    /* Dark mode styles */
    .dark-mode {
        --gray-50: #1f2937;
        --gray-100: #374151;
        --gray-200: #4b5563;
        --gray-300: #6b7280;
        --gray-600: #d1d5db;
        --gray-700: #e5e7eb;
        --gray-800: #f3f4f6;
        --gray-900: #ffffff;
    }
    
    .dark-mode .navbar {
        background: rgba(31, 41, 55, 0.95);
        border-bottom-color: var(--gray-200);
    }
    
    .dark-mode .hero {
        background: linear-gradient(135deg, #4c1d87 0%, #3c1361 100%);
    }
    
    .datadog-feature-details ul {
        margin-bottom: 1rem;
    }
    
    .datadog-feature-details li {
        margin-bottom: 0.5rem;
        padding: 0.5rem;
        background: #f8fafc;
        border-radius: 0.25rem;
        border-left: 3px solid var(--primary-color);
    }
    
    .feature-highlight {
        background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
    }
    
    .feature-highlight p {
        margin: 0;
        font-style: italic;
    }
`;

document.head.appendChild(style);

// Export functions for potential external use
window.AlertGuide = {
    scrollToSection,
    updateActiveNavLink,
    getCurrentSection
};
