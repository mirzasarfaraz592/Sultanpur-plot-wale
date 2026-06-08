document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const htmlElement = document.documentElement;

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcons(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    });

    function updateIcons(theme) {
        if (theme === 'dark') {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        } else {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        }
    }

    // Search Functionality
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) {
        // Enable flex on location container to use the 'order' CSS property
        const firstLocation = document.querySelector('.location-item');
        if (firstLocation && firstLocation.parentElement) {
            firstLocation.parentElement.style.display = 'flex';
            firstLocation.parentElement.style.flexDirection = 'column';
        }

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            // Sections to hide/show during search
            const heroSection = document.getElementById('home');
            const gallerySection = document.getElementById('gallery');
            const visitingCardSection = document.getElementById('visiting-card');
            const contactSection = document.getElementById('contact');
            const footer = document.querySelector('.footer');
            
            if (searchTerm === '') {
                if (heroSection) heroSection.style.display = '';
                if (gallerySection) gallerySection.style.display = '';
                if (visitingCardSection) visitingCardSection.style.display = '';
                if (contactSection) contactSection.style.display = '';
                if (footer) footer.style.display = '';
            } else {
                if (heroSection) heroSection.style.display = 'none';
                if (gallerySection) gallerySection.style.display = 'none';
                if (visitingCardSection) visitingCardSection.style.display = 'none';
                if (contactSection) contactSection.style.display = 'none';
                if (footer) footer.style.display = 'none';
                
                // Scroll to top to see results if scrolled down
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Filter Locations
            const locationItems = document.querySelectorAll('.location-item');
            locationItems.forEach(item => {
                item.style.display = 'block';
                if (searchTerm === '') {
                    item.style.order = '0';
                    item.style.opacity = '1';
                } else {
                    const text = item.innerText.toLowerCase();
                    if (text.includes(searchTerm)) {
                        item.style.order = '-1';
                        item.style.opacity = '1';
                    } else {
                        item.style.order = '1';
                        item.style.opacity = '0.2'; // Dim non-matching items further
                    }
                }
            });
            
            // Filter Properties
            const propertyCards = document.querySelectorAll('.property-card');
            propertyCards.forEach(card => {
                card.style.display = '';
                if (searchTerm === '') {
                    card.style.order = '0';
                    card.style.opacity = '1';
                } else {
                    const text = card.innerText.toLowerCase();
                    if (text.includes(searchTerm)) {
                        card.style.order = '-1';
                        card.style.opacity = '1';
                    } else {
                        card.style.order = '1';
                        card.style.opacity = '0.2'; // Dim non-matching items further
                    }
                }
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
        
        // Close menu on link click
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
    }

    // Form submission -> WhatsApp redirect
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values securely
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        // Basic validation
        if (!name || !phone) {
            // Using DOM manipulation instead of alert() for security skills
            return;
        }

        // Construct WhatsApp Message
        const whatsappNumber = '919118918018'; // Primary contact number
        let text = `Hello Sultanpur Plot Wale,\n\nI have a new inquiry:\n*Name:* ${name}\n*Phone:* ${phone}`;
        
        if (message) {
            text += `\n*Requirements:* ${message}`;
        }

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // Show success UI (DOM modification safely via styles, avoiding innerHTML/alert)
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }, 1500);
    });
});
