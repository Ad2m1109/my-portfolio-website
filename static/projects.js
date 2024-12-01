document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('[data-category]');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hide');
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                }
            });
        });
    });

    // Initialize Intersection Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all project cards
    projectCards.forEach(card => {
        observer.observe(card);
    });
});
