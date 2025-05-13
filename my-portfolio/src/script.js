// This file contains JavaScript code for interactivity in the portfolio.

document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add any additional interactivity or animations here
});