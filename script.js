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
