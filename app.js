// Homodynamics - Dynamic Balance Website JavaScript

// Navigation scroll effect
function handleNavScroll() {
    const navigation = document.getElementById('navigation');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navigation.classList.add('scrolled');
    } else {
        navigation.classList.remove('scrolled');
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.getElementById('navigation').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Mobile navigation toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Wisdom quotes carousel
let currentWisdomIndex = 0;
let wisdomInterval;

const wisdomQuotes = [
    {
        text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
        source: "Marcus Aurelius"
    },
    {
        text: "When I let go of what I am, I become what I might be.",
        source: "Lao Tzu"
    },
    {
        text: "The mind is everything. What you think you become.",
        source: "Buddha"
    },
    {
        text: "He who knows others is wise; he who knows himself is enlightened.",
        source: "Lao Tzu"
    }
];

function showWisdomQuote(index) {
    const quotes = document.querySelectorAll('.wisdom-quote');
    const dots = document.querySelectorAll('.wisdom-dot');
    
    // Remove active class from all quotes and dots
    quotes.forEach(quote => quote.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current quote and dot
    if (quotes[index] && dots[index]) {
        quotes[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    currentWisdomIndex = index;
}

function nextWisdomQuote() {
    currentWisdomIndex = (currentWisdomIndex + 1) % wisdomQuotes.length;
    showWisdomQuote(currentWisdomIndex);
}

function initWisdomCarousel() {
    // Show first quote
    showWisdomQuote(0);
    
    // Auto-rotate quotes every 6 seconds
    wisdomInterval = setInterval(nextWisdomQuote, 6000);
    
    // Pause auto-rotation on hover
    const wisdomSection = document.querySelector('.wisdom-carousel');
    if (wisdomSection) {
        wisdomSection.addEventListener('mouseenter', () => {
            clearInterval(wisdomInterval);
        });
        
        wisdomSection.addEventListener('mouseleave', () => {
            wisdomInterval = setInterval(nextWisdomQuote, 6000);
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for animation
    const cards = document.querySelectorAll('.philosophy-card, .principle-card, .application-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Parallax effect for hero elements
function initParallaxEffects() {
    const flowingElements = document.querySelectorAll('.flowing-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        flowingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
        });
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Preload animations
function initPreloadAnimations() {
    // Add staggered animation delays to cards
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    const principleCards = document.querySelectorAll('.principle-card');
    const applicationCards = document.querySelectorAll('.application-card');
    
    philosophyCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    principleCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    applicationCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Keyboard navigation for wisdom carousel
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const wisdomSection = document.getElementById('wisdom');
        const rect = wisdomSection.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inViewport) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = currentWisdomIndex === 0 ? wisdomQuotes.length - 1 : currentWisdomIndex - 1;
                showWisdomQuote(prevIndex);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextWisdomQuote();
            }
        }
    });
}

// Scroll progress indicator (subtle)
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: var(--color-warm-gold, #d4af37);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

// Resize handler for responsive adjustments
function handleResize() {
    window.addEventListener('resize', () => {
        // Recalculate positions if needed
        closeMobileMenu();
    });
}

// Initialize all functionality when DOM is loaded
function init() {
    // Core navigation and scrolling
    initSmoothScrolling();
    initMobileNav();
    updateActiveNavLink();
    
    // Interactive elements
    initWisdomCarousel();
    initScrollAnimations();
    initPreloadAnimations();
    initKeyboardNavigation();
    
    // Visual effects
    initParallaxEffects();
    initScrollProgress();
    
    // Event listeners
    window.addEventListener('scroll', handleNavScroll);
    handleResize();
    
    console.log('Homodynamics website initialized successfully');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for use in HTML (wisdom quote navigation)
window.showWisdomQuote = showWisdomQuote;

// Optional: Add some meditative breathing guidance
function initBreathingGuide() {
    let breathingActive = false;
    
    // Add subtle breathing guide on hero section click
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('click', function() {
            if (!breathingActive) {
                breathingActive = true;
                showBreathingGuide();
            }
        });
    }
}

function showBreathingGuide() {
    const guide = document.createElement('div');
    guide.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        padding: 2rem;
        border-radius: 1rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        font-family: var(--font-serif, Georgia);
        max-width: 300px;
    `;
    
    guide.innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 1rem; color: var(--color-deep-blue, #1e3a5f);">
            Breathing Practice
        </div>
        <div id="breathingCircle" style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: var(--color-soft-green, #7a9a7d);
            margin: 1rem auto;
            transition: all 4s ease-in-out;
        "></div>
        <div id="breathingText" style="color: var(--color-text-secondary, #666);">
            Click to begin
        </div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1rem;
            background: none;
            border: 1px solid #ccc;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
        ">Close</button>
    `;
    
    document.body.appendChild(guide);
    
    // Simple breathing animation
    const circle = guide.querySelector('#breathingCircle');
    const text = guide.querySelector('#breathingText');
    
    let breathingCycle = 0;
    const breathingInterval = setInterval(() => {
        if (breathingCycle % 2 === 0) {
            circle.style.transform = 'scale(1.5)';
            text.textContent = 'Breathe in...';
        } else {
            circle.style.transform = 'scale(1)';
            text.textContent = 'Breathe out...';
        }
        breathingCycle++;
        
        if (breathingCycle > 10) {
            clearInterval(breathingInterval);
            guide.remove();
        }
    }, 4000);
}

// Initialize breathing guide
// initBreathingGuide();