class PortfolioManager {
    constructor() {
        this.initLoadingScreen();
        this.initTheme();
        this.initScroll();
        this.initAnimations();
        this.initTypingEffect();
        this.initSmoothScrolling();
        this.initProjectFiltering();
        this.initAccessibility();
        this.initErrorHandling();
        console.log('Portfolio initialized successfully!');
    }

    initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            window.addEventListener('load', () => {
                loadingScreen.classList.add('fade-out');
            });
        }
    }

    initTheme() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme(this.currentTheme);

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
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
            if (icon) icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    initScroll() {
        this.scrollButton = document.querySelector('.scroll-to-top');
        window.addEventListener('scroll', () => this.handleScroll());
        if (this.scrollButton) {
            this.scrollButton.addEventListener('click', () => this.scrollToTop());
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (this.scrollButton) {
            this.scrollButton.classList.toggle('show', scrollTop > 300);
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    initAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(element => observer.observe(element));
    }

    initTypingEffect() {
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
    }

    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    initProjectFiltering() {
        this.projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');
        this.certificationFilterButtons = document.querySelectorAll('.certification-filters .filter-btn');
        this.projectCards = document.querySelectorAll('.project-card[data-category]');
        this.certificationCards = document.querySelectorAll('.certification-card[data-category]');

        this.projectFilterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e, this.projectFilterButtons, this.projectCards));
        });

        this.certificationFilterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e, this.certificationFilterButtons, this.certificationCards));
        });
    }

    handleFilter(event, buttons, cards) {
        const filter = event.target.getAttribute('data-filter');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            card.style.display = shouldShow ? '' : 'none';
        });
    }

    initAccessibility() {
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

    initErrorHandling() {
        window.addEventListener('error', (e) => console.error('JavaScript error:', e.error));
        window.addEventListener('unhandledrejection', (e) => console.error('Unhandled promise rejection:', e.reason));
    }
}

class TypingEffect {
    constructor(element, texts, speed = 100, pause = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.pause = pause;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
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

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["Computer Science Student", "Machine Learning Enthusiast", "Web & Mobile Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        function type() {
            if (charIndex < words[wordIndex].length) {
                typingText.textContent += words[wordIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        function erase() {
            if (charIndex > 0) {
                typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            }
        }
        type();
    }

    // Scroll Animations
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };
    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };
    const hideScrollElement = (element) => {
        element.classList.remove('animate');
    };
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    // Project Filtering
    const filterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Certification Filtering
    const certFilterButtons = document.querySelectorAll('.certification-filters .filter-btn');
    const certCards = document.querySelectorAll('.certification-card');
    certFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            certFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            certCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        loadingScreen.classList.add('fade-out');
    });

    // Project Carousel
    const projectGrid = document.querySelector('.project-grid');
    const scrollLeftBtn = document.querySelector('.scroll-btn.left');
    const scrollRightBtn = document.querySelector('.scroll-btn.right');

    if (projectGrid) {
        scrollLeftBtn.addEventListener('click', () => {
            projectGrid.scrollBy({ left: -projectGrid.offsetWidth, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            projectGrid.scrollBy({ left: projectGrid.offsetWidth, behavior: 'smooth' });
        });
    }
});