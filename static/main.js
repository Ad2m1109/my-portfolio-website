// Performance and Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Loading Screen Management
class LoadingScreen {
    constructor() {
        this.loadingElement = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', () => {
            this.hide();
        });

        // Fallback: hide after 3 seconds maximum
        setTimeout(() => {
            this.hide();
        }, 3000);
    }

    hide() {
        if (this.loadingElement) {
            this.loadingElement.classList.add('fade-out');
            setTimeout(() => {
                this.loadingElement.style.display = 'none';
            }, 500);
        }
    }
}

// Dark Mode Toggle
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            // Keyboard support
            this.themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }

        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'light' ? '#2563eb' : '#1f2937');
        }
    }
}

// Scroll Management
class ScrollManager {
    constructor() {
        this.scrollButton = document.querySelector('.scroll-to-top');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Debounced scroll handler for performance
        const debouncedScrollHandler = debounce(() => {
            this.handleScroll();
        }, 16); // ~60fps

        window.addEventListener('scroll', debouncedScrollHandler);

        if (this.scrollButton) {
            this.scrollButton.addEventListener('click', () => {
                this.scrollToTop();
            });

            // Keyboard support
            this.scrollButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.scrollToTop();
                }
            });
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (this.scrollButton) {
            if (scrollTop > 300) {
                this.scrollButton.classList.add('show');
            } else {
                this.scrollButton.classList.remove('show');
            }
        }

        // Update navbar on scroll
        this.updateNavbar(scrollTop);
    }

    updateNavbar(scrollTop) {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollTop > 100) {
                navbar.style.backgroundColor = 'rgba(37, 99, 235, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--primary-color)';
                navbar.style.backdropFilter = 'none';
            }
        }
    }

    scrollToTop() {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Typing Effect
class TypingEffect {
    constructor(element, texts, speed = 100, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.pause = pause;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.element) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pause;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scrolling for Navigation Links
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        if (navbarToggler) {
                            navbarToggler.click();
                        }
                    }
                }
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.fetchStart;
            
            console.log(`Page loaded in ${loadTime}ms`);
            
            // Send analytics if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    value: Math.round(loadTime),
                    custom_parameter: 'load_time_ms'
                });
            }
        });

        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.warn(`Long task detected: ${entry.duration}ms`);
                }
            });
            observer.observe({ entryTypes: ['longtask'] });
        }
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        // Add keyboard support for filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    setupAriaLabels() {
        // Update ARIA pressed states for filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
                button.setAttribute('aria-pressed', 'true');
            });
        });
    }

    setupFocusManagement() {
        // Manage focus for dynamic content
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Focus management for dynamically added content
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const focusableElements = node.querySelectorAll('button, a, input, textarea, select');
                            if (focusableElements.length > 0) {
                                // Add focus indicators
                                focusableElements.forEach(el => {
                                    el.setAttribute('tabindex', '0');
                                });
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const loadingScreen = new LoadingScreen();
    const themeManager = new ThemeManager();
    const scrollManager = new ScrollManager();
    const animationManager = new AnimationManager();
    const smoothScrolling = new SmoothScrolling();
    const performanceMonitor = new PerformanceMonitor();
    const accessibilityManager = new AccessibilityManager();

    // Initialize typing effect
    const titleElement = document.querySelector('.typing-text');
    if (titleElement) {
        const typingTexts = [
            "Computer Science Student",
            "Machine Learning Enthusiast", 
            "Web Developer",
            "Mobile App Developer",
            "Python Developer",
            "Problem Solver"
        ];
        new TypingEffect(titleElement, typingTexts, 100, 2000);
    }

    // Add loading states to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = originalText + ' <i class="fas fa-spinner fa-spin ms-1"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Preload critical resources
    const preloadResources = [
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    preloadResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'style';
        document.head.appendChild(link);
    });

    console.log('Portfolio initialized successfully!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics here
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error reports to analytics here
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        ScrollManager,
        AnimationManager,
        TypingEffect
    };
}