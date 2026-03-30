// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(45deg) translateY(10px)' 
            : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') 
            ? 'rotate(-45deg) translateY(-10px)' 
            : 'none';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 15, 26, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(15, 15, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and command categories
document.querySelectorAll('.feature-card, .command-category, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            // You can customize these numbers based on your actual server stats
            const stats = {
                'Active Members': 1000,
                'Fun Activities': 50,
                '24/7 Moderation': 24
            };
            
            const statText = entry.target.textContent.trim();
            if (stats[statText]) {
                animateCounter(entry.target, stats[statText]);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// Parallax effect for hero section
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroImage && scrolled < 1000) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Gallery item click - expand image
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            createLightbox(img.src);
        }
    });
});

// Create lightbox for images
function createLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Expanded view">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: #ff6b6b;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(lightbox);
    
    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.remove();
        style.remove();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
            style.remove();
        }
    });
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        // Small delay before starting typing effect
        setTimeout(() => {
            // You can enable this if you want a typing effect on the title
            // typeWriter(heroTitle, heroTitle.textContent, 150);
        }, 1000);
    }
});

// Command search functionality
function createCommandSearch() {
    const commandsSection = document.querySelector('.commands');
    if (!commandsSection) return;
    
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" class="command-search" placeholder="🔍 Search commands...">
    `;
    
    const sectionHeader = commandsSection.querySelector('.section-header');
    sectionHeader.after(searchContainer);
    
    const searchInput = searchContainer.querySelector('.command-search');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const commandItems = document.querySelectorAll('.command-item');
        
        commandItems.forEach(item => {
            const command = item.querySelector('code').textContent.toLowerCase();
            const description = item.querySelector('span').textContent.toLowerCase();
            
            if (command.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Add search styles
function addSearchStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            max-width: 600px;
            margin: 30px auto;
            text-align: center;
        }
        
        .command-search {
            width: 100%;
            padding: 15px 25px;
            font-size: 1rem;
            background: rgba(30, 30, 60, 0.8);
            border: 2px solid rgba(88, 101, 242, 0.5);
            border-radius: 50px;
            color: white;
            outline: none;
            transition: all 0.3s ease;
        }
        
        .command-search:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
        }
        
        .command-search::placeholder {
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(style);
}

// Initialize search
createCommandSearch();
addSearchStyles();

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Feature cards tilt effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Console message for developers
console.log('%c🎮 Together Forever • T4E Website', 'color: #5865F2; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for our amazing Discord community', 'color: #00E5FF; font-size: 14px;');
console.log('%cDeveloped by T4E Team', 'color: #00FA9A; font-size: 14px;');

// Discord Invite Modal Functions
function showDiscordInvite(event) {
    event.preventDefault();
    const modal = document.getElementById('join-discord');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Simulate online members count (you can customize this)
        const onlineMembers = document.getElementById('online-members');
        if (onlineMembers) {
            // Random number between 50-500 for demo
            const randomOnline = Math.floor(Math.random() * 450) + 50;
            onlineMembers.textContent = randomOnline;
        }
    }
}

function closeModal() {
    const modal = document.getElementById('join-discord');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('join-discord');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
