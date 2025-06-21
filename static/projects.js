// Project Filter Manager
class ProjectFilterManager {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('[data-category]');
        this.certificationCards = document.querySelectorAll('.certification-card[data-category]');
        this.certificationFilterButtons = document.querySelectorAll('.certification-filters .filter-btn');
        this.currentFilter = 'all';
        this.currentCertificationFilter = 'all';
        this.animationDelay = 100;
        this.init();
    }

    init() {
        this.bindProjectFilters();
        this.bindCertificationFilters();
        this.setupKeyboardNavigation();
        this.setupIntersectionObserver();
        this.setupAPIEndpoints();
    }

    bindProjectFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleProjectFilter(button);
            });
        });
    }

    bindCertificationFilters() {
        this.certificationFilterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCertificationFilter(button);
            });
        });
    }

    setupKeyboardNavigation() {
        // Project filter keyboard navigation
        this.filterButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleProjectFilter(button);
                }
                
                // Arrow key navigation
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigateFilters(button, e.key === 'ArrowRight');
                }
            });
        });

        // Certification filter keyboard navigation
        this.certificationFilterButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCertificationFilter(button);
                }
                
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.navigateCertificationFilters(button, e.key === 'ArrowRight');
                }
            });
        });
    }

    navigateFilters(currentButton, moveRight) {
        const buttons = Array.from(this.filterButtons);
        const currentIndex = buttons.indexOf(currentButton);
        const nextIndex = moveRight 
            ? (currentIndex + 1) % buttons.length 
            : (currentIndex - 1 + buttons.length) % buttons.length;
        
        buttons[nextIndex].focus();
    }

    navigateCertificationFilters(currentButton, moveRight) {
        const buttons = Array.from(this.certificationFilterButtons);
        const currentIndex = buttons.indexOf(currentButton);
        const nextIndex = moveRight 
            ? (currentIndex + 1) % buttons.length 
            : (currentIndex - 1 + buttons.length) % buttons.length;
        
        buttons[nextIndex].focus();
    }

    handleProjectFilter(button) {
        const filter = button.getAttribute('data-filter');
        
        if (filter === this.currentFilter) return;
        
        this.currentFilter = filter;
        this.updateActiveButton(button, this.filterButtons);
        this.filterProjects(filter);
        this.updateURL(filter);
        this.trackFilterUsage('project', filter);
        this.announceFilterChange('project', filter);
    }

    handleCertificationFilter(button) {
        const filter = button.getAttribute('data-filter');
        
        if (filter === this.currentCertificationFilter) return;
        
        this.currentCertificationFilter = filter;
        this.updateActiveButton(button, this.certificationFilterButtons);
        this.filterCertifications(filter);
        this.trackFilterUsage('certification', filter);
        this.announceFilterChange('certification', filter);
    }

    updateActiveButton(activeButton, allButtons) {
        allButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }

    filterProjects(filter) {
        // Hide all cards first with stagger animation
        this.projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
            }, index * 50);
        });

        // Show filtered cards after hide animation
        setTimeout(() => {
            let visibleIndex = 0;
            
            this.projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, visibleIndex * 100);
                    visibleIndex++;
                } else {
                    card.classList.add('hide');
                }
            });

            this.updateProjectCount(filter);
        }, 300);
    }

    filterCertifications(filter) {
        // Hide all certification cards first
        this.certificationCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
            }, index * 30);
        });

        // Show filtered cards after hide animation
        setTimeout(() => {
            let visibleIndex = 0;
            
            this.certificationCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.classList.remove('hide');
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                        card.style.opacity = '1';
                    }, visibleIndex * 80);
                    visibleIndex++;
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            this.updateCertificationCount(filter);
        }, 200);
    }

    updateProjectCount(filter) {
        const visibleProjects = this.projectCards.length - document.querySelectorAll('.project-card.hide').length;
        const countElement = document.querySelector('.project-count');
        
        if (countElement) {
            countElement.textContent = `Showing ${visibleProjects} project${visibleProjects !== 1 ? 's' : ''}`;
        }
    }

    updateCertificationCount(filter) {
        const visibleCertifications = this.certificationCards.length - document.querySelectorAll('.certification-card.hide').length;
        const countElement = document.querySelector('.certification-count');
        
        if (countElement) {
            countElement.textContent = `Showing ${visibleCertifications} certification${visibleCertifications !== 1 ? 's' : ''}`;
        }
    }

    updateURL(filter) {
        const url = new URL(window.location);
        if (filter === 'all') {
            url.searchParams.delete('filter');
        } else {
            url.searchParams.set('filter', filter);
        }
        window.history.replaceState({}, '', url);
    }

    trackFilterUsage(type, filter) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'filter_usage', {
                event_category: type,
                event_label: filter,
                value: 1
            });
        }

        // Console log for debugging
        console.log(`Filter applied: ${type} - ${filter}`);
    }

    announceFilterChange(type, filter) {
        // Create announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Filtered ${type}s to show ${filter === 'all' ? 'all categories' : filter} items`;
        
        document.body.appendChild(announcement);
        
        // Remove announcement after it's been read
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all project and certification cards
        [...this.projectCards, ...this.certificationCards].forEach(card => {
            observer.observe(card);
        });
    }

    setupAPIEndpoints() {
        // Setup dynamic loading if needed
        this.loadProjectsFromAPI();
        this.loadCertificationsFromAPI();
    }

    async loadProjectsFromAPI() {
        try {
            const response = await fetch('/api/projects');
            if (response.ok) {
                const projects = await response.json();
                this.renderDynamicProjects(projects);
            }
        } catch (error) {
            console.log('Static project data being used (API not available)');
        }
    }

    async loadCertificationsFromAPI() {
        try {
            const response = await fetch('/api/certifications');
            if (response.ok) {
                const certifications = await response.json();
                this.updateCertificationData(certifications);
            }
        } catch (error) {
            console.log('Static certification data being used (API not available)');
        }
    }

    renderDynamicProjects(projects) {
        // This would handle dynamic project rendering if needed
        // For now, we're using static HTML, but this provides the infrastructure
        console.log('Dynamic projects loaded:', projects.length);
    }

    updateCertificationData(certifications) {
        // Update certification counts or data if needed
        console.log('Certifications loaded:', certifications.length);
    }

    // Public method to manually filter projects
    filterProjectsByCategory(category) {
        const button = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (button) {
            this.handleProjectFilter(button);
        }
    }

    // Public method to get current filter state
    getCurrentFilter() {
        return {
            projects: this.currentFilter,
            certifications: this.currentCertificationFilter
        };
    }

    // Initialize from URL parameters
    initializeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter');
        
        if (filter && filter !== 'all') {
            const button = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
            if (button) {
                this.handleProjectFilter(button);
            }
        }
    }
}

// Project Card Enhancements
class ProjectCardEnhancer {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.enhanceProjectCards();
        this.setupLazyLoading();
        this.setupPreviewGeneration();
    }

    enhanceProjectCards() {
        this.projectCards.forEach(card => {
            this.addHoverEffects(card);
            this.addClickTracking(card);
            this.addKeyboardSupport(card);
        });
    }

    addHoverEffects(card) {
        let timeoutId;

        card.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            card.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Enhance tech badges on hover
            const techBadges = card.querySelectorAll('.tech-badge');
            techBadges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.transform = 'scale(1.1)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
                
                const techBadges = card.querySelectorAll('.tech-badge');
                techBadges.forEach(badge => {
                    badge.style.transform = 'scale(1)';
                });
            }, 100);
        });
    }

    addClickTracking(card) {
        const links = card.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const projectTitle = card.querySelector('h3').textContent;
                const linkType = link.classList.contains('btn-github') ? 'github' : 'demo';
                
                // Track click
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'project_link_click', {
                        event_category: 'projects',
                        event_label: `${projectTitle} - ${linkType}`,
                        value: 1
                    });
                }
                
                console.log(`Project link clicked: ${projectTitle} - ${linkType}`);
            });
        });
    }

    addKeyboardSupport(card) {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                // Focus on the first link in the card
                const firstLink = card.querySelector('a');
                if (firstLink) {
                    firstLink.click();
                }
            }
        });

        card.addEventListener('focus', () => {
            card.style.outline = '3px solid var(--primary-color)';
            card.style.outlineOffset = '2px';
        });

        card.addEventListener('blur', () => {
            card.style.outline = 'none';
        });
    }

    setupLazyLoading() {
        // If we had images, we would implement lazy loading here
        const images = document.querySelectorAll('.project-card img[data-src]');
        
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupPreviewGeneration() {
        // Generate preview metadata for projects
        this.projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const tech = Array.from(card.querySelectorAll('.tech-badge')).map(badge => badge.textContent);
            
            // Store metadata for potential use
            card.dataset.projectData = JSON.stringify({
                title,
                description,
                technologies: tech
            });
        });
    }
}

// Search Functionality
class ProjectSearch {
    constructor() {
        this.searchInput = document.getElementById('project-search');
        this.projectCards = document.querySelectorAll('.project-card');
        this.certificationCards = document.querySelectorAll('.certification-card');
        this.init();
    }

    init() {
        if (this.searchInput) {
            this.setupSearch();
        } else {
            this.createSearchInput();
        }
    }

    createSearchInput() {
        // Create search input if it doesn't exist
        const projectsSection = document.getElementById('projects');
        const filtersContainer = projectsSection.querySelector('.project-filters');
        
        if (filtersContainer) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container mt-3';
            searchContainer.innerHTML = `
                <div class="input-group">
                    <input type="text" id="project-search" class="form-control" 
                           placeholder="Search projects and technologies..." 
                           aria-label="Search projects">
                    <button class="btn btn-outline-secondary" type="button" id="clear-search">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            
            filtersContainer.appendChild(searchContainer);
            this.searchInput = document.getElementById('project-search');
            this.setupSearch();
        }
    }

    setupSearch() {
        let searchTimeout;

        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300); // Debounce search
        });

        // Clear search functionality
        const clearButton = document.getElementById('clear-search');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.searchInput.value = '';
                this.performSearch('');
                this.searchInput.focus();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                this.searchInput.focus();
            }
        });
    }

    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all cards
            [...this.projectCards, ...this.certificationCards].forEach(card => {
                card.classList.remove('hide');
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
            return;
        }

        // Search through projects
        this.projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const techBadges = Array.from(card.querySelectorAll('.tech-badge'))
                .map(badge => badge.textContent.toLowerCase());
            
            const isMatch = title.includes(searchTerm) || 
                          description.includes(searchTerm) || 
                          techBadges.some(tech => tech.includes(searchTerm));
            
            this.toggleCardVisibility(card, isMatch);
        });

        // Search through certifications
        this.certificationCards.forEach(card => {
            const title = card.querySelector('h5').textContent.toLowerCase();
            const platform = card.querySelector('.certification-platform').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            
            const isMatch = title.includes(searchTerm) || 
                          platform.includes(searchTerm) || 
                          category.includes(searchTerm);
            
            this.toggleCardVisibility(card, isMatch);
        });

        // Track search
        if (typeof gtag !== 'undefined' && searchTerm) {
            gtag('event', 'search', {
                search_term: searchTerm
            });
        }
    }

    toggleCardVisibility(card, isVisible) {
        if (isVisible) {
            card.classList.remove('hide');
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.classList.add('hide');
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize project filtering and enhancements
    const projectFilterManager = new ProjectFilterManager();
    const projectCardEnhancer = new ProjectCardEnhancer();
    const projectSearch = new ProjectSearch();

    // Initialize from URL if filter parameter exists
    projectFilterManager.initializeFromURL();

    // Make filter manager globally available for external access
    window.projectFilterManager = projectFilterManager;

    console.log('Project filtering and enhancements initialized successfully!');
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProjectFilterManager,
        ProjectCardEnhancer,
        ProjectSearch
    };
}