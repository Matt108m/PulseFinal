document.addEventListener('DOMContentLoaded', function() {
    // Burger menu functionality
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
    }

    // Smooth scroll and active state management
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    // Update active state on scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // offset for better accuracy

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href') === `#${sectionId}`) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    }

    // Add click event listeners to navigation links
    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active state
                navItems.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                if (burger && navLinks) {
                    burger.classList.remove('open');
                    navLinks.classList.remove('open');
                }
            }
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', function() {
        updateActiveLink();
        
        // Back to top button visibility
        const backToTopButton = document.getElementById('backToTop');
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Initial call to set active state
    updateActiveLink();

    // Back to top button click handler
    const backToTopButton = document.getElementById('backToTop');
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
