document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling and active dot highlight
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const target = document.querySelector(dot.dataset.target);
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (current) {
            const activeDot = document.querySelector(`.nav-dot[data-target="#${current}"]`);
            if(activeDot) activeDot.classList.add('active');
        }
    });

    // Rotating hero typing effect
    const heroRole = document.querySelector('.hero-role');
    const phrases = [
        "I build futuristic web experiences.",
        "I craft interactive React apps.",
        "I design cyberpunk-inspired interfaces."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            heroRole.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroRole.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    if (heroRole) {
        typeEffect();
    }

    // Form handling with visual feedback
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Show loading state
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            // For Formspree, the form will submit naturally
            // But we can add a toast notification before redirect
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = 'Sending your message...';
            document.body.appendChild(toast);
            
            // Let the form submit to Formspree
            // The page will redirect to Formspree's thank you page or your custom page
            
            // Optional: Prevent default and use fetch for AJAX submission (no redirect)
            /*
            e.preventDefault();
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    toast.textContent = 'Message sent successfully!';
                    toast.style.backgroundColor = '#10b981';
                    form.reset();
                } else {
                    toast.textContent = 'Oops! Something went wrong.';
                    toast.style.backgroundColor = '#ef4444';
                }
                setTimeout(() => toast.remove(), 3000);
                btn.innerHTML = originalText;
                btn.disabled = false;
            }).catch(error => {
                toast.textContent = 'Oops! Something went wrong.';
                toast.style.backgroundColor = '#ef4444';
                setTimeout(() => toast.remove(), 3000);
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
            */
        });
    }
});