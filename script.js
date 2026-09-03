document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.header__mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('header__mobile-menu--open');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('header__mobile-menu--open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('header__mobile-menu--open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav-link, .header__mobile-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('header__nav-link--active');
            link.classList.remove('header__mobile-link--active');
            if (link.getAttribute('href') === `#${current}`) {
                if(link.classList.contains('header__nav-link')) {
                    link.classList.add('header__nav-link--active');
                } else {
                    link.classList.add('header__mobile-link--active');
                }
            }
        });
    });

    // --- Contact Form to WhatsApp ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Target number: 9118918018
            const targetNumber = '919118918018'; 
            let whatsappText = `Hello, I would like to schedule a site visit or inquire about a plot.%0A%0A`;
            whatsappText += `*Name:* ${name}%0A`;
            whatsappText += `*Phone:* ${phone}%0A`;
            if (message) {
                whatsappText += `*Requirements:* ${message}`;
            }

            const whatsappUrl = `https://wa.me/${targetNumber}?text=${whatsappText}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});
