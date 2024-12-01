// Scroll to Top Button
const scrollButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Skill Progress Animation
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(skill => {
        const progress = skill.getAttribute('data-progress');
        skill.style.width = progress + '%';
    });
};

// Typing Effect
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Start skill bar animation
    animateSkills();
    
    // Initialize typing effect
    const titleElement = document.querySelector('.typing-text');
    if (titleElement) {
        typeWriter(titleElement, "Computer Science Student & Aspiring Developer");
    }
    
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});
