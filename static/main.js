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
const skillsSection = document.querySelector('#skills');

const animateSkills = () => {
    skillBars.forEach(skill => {
        const progress = skill.getAttribute('data-progress');
        skill.style.width = progress + '%';
    });
};

// Use IntersectionObserver to trigger skill animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target); // Stop observing after animation
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of the section is visible
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Ensure skills section remains visible after animation
skillsSection.style.opacity = '1';
skillsSection.style.transition = 'opacity 0.3s ease-in-out';

// Debugging: Log skill bars and observer
console.log('Skill Bars:', skillBars);
console.log('Skills Section:', skillsSection);

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
