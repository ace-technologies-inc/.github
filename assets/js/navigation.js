/**
 * ACE Technologies - Navigation Script
 *
 * Handles mobile menu toggle
 */

(function() {
    'use strict';

    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.main-navigation');

    // Mobile menu toggle
    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            navigation.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navigation && menuToggle && !navigation.contains(e.target) && !menuToggle.contains(e.target)) {
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle keyboard navigation - close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navigation) {
                navigation.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
})();
