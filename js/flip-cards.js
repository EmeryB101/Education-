/**
 * Flip Cards - Simple click handler for debate cards
 */

// Initialize flip cards when page loads
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        // Add click event listener
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to flip card');

        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });

    console.log('✅ Flip cards initialized:', flipCards.length);
});
