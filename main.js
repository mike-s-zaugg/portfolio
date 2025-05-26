document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const darkModeIconMobile = document.getElementById('dark-mode-icon-mobile');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Function to set dark mode
    function setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            darkModeIcon.classList.replace('fa-moon', 'fa-sun');
            darkModeIconMobile.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            darkModeIcon.classList.replace('fa-sun', 'fa-moon');
            darkModeIconMobile.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    // Toggle dark mode on desktop button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            setDarkMode(!isDark);
        });
    }

    // Toggle dark mode on mobile button click
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            setDarkMode(!isDark);
        });
    }

    // Mobile menu toggle
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Add active class to nav links based on scroll position (optional but good for UX)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80; // Adjust for fixed nav height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-blue-500', 'dark:text-blue-500', 'font-semibold');
            link.classList.add('text-gray-700', 'dark:text-gray-300');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-blue-500', 'dark:text-blue-500', 'font-semibold');
                link.classList.remove('text-gray-700', 'dark:text-gray-300');
            }
        });
    });
});
